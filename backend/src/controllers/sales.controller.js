import { calculateSaleTotals } from '../services/sales.service.js';
import { query, withTransaction } from '../config/db.js';

export async function createSale(req, res, next) {
  try {
    const totals = calculateSaleTotals(req.body);

    const sale = await withTransaction(async (client) => {
      for (const item of req.body.items) {
        const product = await client.query('SELECT id, stock, name FROM products WHERE id = $1 FOR UPDATE', [item.productId]);
        if (!product.rows.length) {
          const err = new Error(`Producto no encontrado: ${item.productId}`);
          err.status = 404;
          throw err;
        }

        if (product.rows[0].stock < item.quantity) {
          const err = new Error(`Stock insuficiente para ${product.rows[0].name}`);
          err.status = 409;
          throw err;
        }

        await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.productId]);
      }

      const inserted = await client.query(
        `INSERT INTO sales (customer_id, payment_method, payload, subtotal, taxes, total, paid_amount, change)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING id, created_at`,
        [
          req.body.customerId || null,
          req.body.paymentMethod,
          JSON.stringify(req.body.items),
          totals.subtotal,
          totals.taxes,
          totals.total,
          req.body.paidAmount,
          totals.change
        ]
      );

      return inserted.rows[0];
    });

    return res.status(201).json({
      saleId: sale.id,
      totals,
      createdAt: sale.created_at
    });
  } catch (error) {
    return next(error);
  }
}

export async function listSales(req, res, next) {
  try {
    const { rows } = await query('SELECT * FROM sales ORDER BY created_at DESC LIMIT 100');
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
}
