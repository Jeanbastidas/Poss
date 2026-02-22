import { query } from '../config/db.js';

export async function createCustomer(req, res, next) {
  try {
    const { rows } = await query(
      `INSERT INTO customers (full_name, document_id, phone, whatsapp, address, email, credit_limit, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        req.body.fullName,
        req.body.documentId,
        req.body.phone,
        req.body.whatsapp,
        req.body.address || null,
        req.body.email || null,
        req.body.creditLimit,
        req.body.notes || null
      ]
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    return next(error);
  }
}

export async function listCustomers(req, res, next) {
  try {
    const { rows } = await query('SELECT * FROM customers ORDER BY created_at DESC LIMIT 200');
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
}
