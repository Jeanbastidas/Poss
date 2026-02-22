import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { env } from '../config/env.js';

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const { rows } = await query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);

    if (!rows.length) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValid = await bcrypt.compare(password, rows[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ sub: rows[0].id, role: rows[0].role }, env.jwtSecret, { expiresIn: '10h' });
    return res.json({ token, role: rows[0].role });
  } catch (error) {
    return next(error);
  }
}
