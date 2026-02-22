import cron from 'node-cron';
import { query } from '../config/db.js';
import { buildWhatsAppLink, compileTemplate, reminderTemplates } from '../services/whatsapp.service.js';

function classifyDueDate(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const diffDays = Math.ceil((due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
  if (diffDays === 3) return 'dueSoon';
  if (diffDays === 0) return 'dueToday';
  if (diffDays < 0) return 'overdue';
  return null;
}

export function startNotificationCron() {
  cron.schedule('0 6 * * *', async () => {
    const { rows } = await query(
      `SELECT cr.id as credit_id, cu.full_name, cu.whatsapp, cr.schedule, cr.late_fee_daily_rate, cr.financed_total
       FROM credits cr JOIN customers cu ON cu.id = cr.customer_id`
    );

    for (const row of rows) {
      const schedule = row.schedule || [];
      for (const installment of schedule) {
        const type = classifyDueDate(installment.dueDate);
        if (!type || installment.status === 'PAGADA') continue;

        const message = compileTemplate(reminderTemplates[type], {
          nombre_cliente: row.full_name,
          valor_cuota: installment.value,
          fecha_vencimiento: installment.dueDate,
          interes_mora: row.late_fee_daily_rate,
          total_actualizado: row.financed_total,
          saldo_restante: row.financed_total
        });

        const url = buildWhatsAppLink(row.whatsapp, message);

        await query(
          'INSERT INTO reminder_logs (credit_id, installment_number, type, message, whatsapp_url) VALUES ($1,$2,$3,$4,$5)',
          [row.credit_id, installment.installmentNumber, type, message, url]
        );
      }
    }
  });
}
