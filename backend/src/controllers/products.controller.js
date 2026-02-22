import { query } from '../config/db.js';

export async function createProduct(req, res, next) {
  try {
    const { rows } = await query(
      `INSERT INTO products (sku, barcode, name, category, price, stock, min_stock)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [req.body.sku, req.body.barcode || null, req.body.name, req.body.category, req.body.price, req.body.stock, req.body.minStock]
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    return next(error);
  }
}

export async function listProducts(req, res, next) {
  try {
    const search = req.query.search || '';
    const { rows } = await query(
      `SELECT * FROM products
       WHERE name ILIKE $1 OR sku ILIKE $1 OR barcode ILIKE $1
       ORDER BY name ASC LIMIT 200`,
      [`%${search}%`]
    );
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
}
