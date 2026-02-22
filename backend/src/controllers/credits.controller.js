import { query } from '../config/db.js';
import { applyCreditPayment, calculateCreditPlan, classifyInstallmentStatus } from '../services/credit.service.js';

export async function createCredit(req, res, next) {
  try {
    const saleResult = await query('SELECT total FROM sales WHERE id = $1 LIMIT 1', [req.body.saleId]);
    if (!saleResult.rows.length) {
      return res.status(404).json({ message: 'Venta no encontrada para crédito' });
    }

    const principal = Number(saleResult.rows[0].total) - Number(req.body.downPayment || 0);
    const plan = calculateCreditPlan({ principal: Math.max(principal, 0), ...req.body });

    const { rows } = await query(
      `INSERT INTO credits (customer_id, sale_id, down_payment, installments, frequency, interest_type, interest_rate, late_fee_daily_rate, financed_total, total_interest, installment_value, schedule)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        req.body.customerId,
        req.body.saleId,
        req.body.downPayment,
        req.body.installments,
        req.body.frequency,
        req.body.interestType,
        req.body.interestRate,
        req.body.lateFeeDailyRate,
        plan.financedTotal,
        plan.totalInterest,
        plan.installmentValue,
        JSON.stringify(plan.schedule)
      ]
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    return next(error);
  }
}

export async function recordCreditPayment(req, res, next) {
  try {
    const creditId = req.params.id;
    const { rows } = await query('SELECT * FROM credits WHERE id = $1 LIMIT 1', [creditId]);
    if (!rows.length) return res.status(404).json({ message: 'Crédito no encontrado' });

    const credit = rows[0];
    const result = applyCreditPayment({ schedule: credit.schedule, amount: req.body.amount });

    await query('UPDATE credits SET schedule = $1 WHERE id = $2', [JSON.stringify(result.schedule), creditId]);
    await query(
      `INSERT INTO credit_payments (credit_id, amount, method, note)
       VALUES ($1,$2,$3,$4)`,
      [creditId, result.appliedAmount, req.body.method, req.body.note || null]
    );

    return res.json({
      message: 'Pago registrado',
      appliedAmount: result.appliedAmount,
      unappliedAmount: result.unappliedAmount,
      totalPending: result.totalPending,
      schedule: result.schedule
    });
  } catch (error) {
    return next(error);
  }
}

export async function listPortfolio(req, res, next) {
  try {
    const { rows } = await query(
      `SELECT c.id, c.financed_total, c.installment_value, cu.full_name, c.schedule
       FROM credits c
       JOIN customers cu ON cu.id = c.customer_id
       ORDER BY c.created_at DESC`
    );

    const mapped = rows.map((credit) => {
      const schedule = (credit.schedule || []).map((item) => ({
        ...item,
        status: classifyInstallmentStatus({ installment: item })
      }));
      return { ...credit, schedule };
    });

    return res.json(mapped);
  } catch (error) {
    return next(error);
  }
}
