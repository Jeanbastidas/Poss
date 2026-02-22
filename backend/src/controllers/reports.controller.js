import { query } from '../config/db.js';

export async function salesSummary(req, res, next) {
  try {
    const { rows } = await query(
      `SELECT
        COALESCE(SUM(total),0) AS total_sales,
        COALESCE(SUM(taxes),0) AS total_taxes,
        COUNT(*) AS transactions
       FROM sales
       WHERE created_at::date = CURRENT_DATE`
    );

    return res.json(rows[0]);
  } catch (error) {
    return next(error);
  }
}

export async function topProducts(req, res, next) {
  try {
    const { rows } = await query(
      `SELECT p.name, SUM((item->>'quantity')::int) AS qty
       FROM sales s,
       LATERAL jsonb_array_elements(s.payload) item
       JOIN products p ON p.id::text = item->>'productId'
       GROUP BY p.name
       ORDER BY qty DESC
       LIMIT 10`
    );

    return res.json(rows);
  } catch (error) {
    return next(error);
  }
}
