import { query } from '../config/db.js';

const defaults = {
  taxes: { defaultRate: 0.19 },
  currency: { code: 'COP', symbol: '$' },
  notifications: { daysBeforeDue: 3 },
  whatsappTemplates: {
    dueSoon: 'Hola {{nombre_cliente}}, tu cuota vence el {{fecha_vencimiento}}.',
    dueToday: 'Hola {{nombre_cliente}}, hoy vence tu cuota de {{valor_cuota}}.',
    overdue: 'Hola {{nombre_cliente}}, tienes mora de {{interes_mora}}. Saldo: {{saldo_restante}}.'
  }
};

export async function getSettings(req, res, next) {
  try {
    const { rows } = await query('SELECT key, value FROM settings');
    const dbSettings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return res.json({ ...defaults, ...dbSettings });
  } catch (error) {
    return next(error);
  }
}

export async function upsertSetting(req, res, next) {
  try {
    const { key, value } = req.body;
    const { rows } = await query(
      `INSERT INTO settings (key, value, updated_at)
       VALUES ($1,$2,NOW())
       ON CONFLICT (key)
       DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
       RETURNING key, value, updated_at`,
      [key, JSON.stringify(value)]
    );

    return res.json(rows[0]);
  } catch (error) {
    return next(error);
  }
}
