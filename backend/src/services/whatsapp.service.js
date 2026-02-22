export const reminderTemplates = {
  dueSoon: 'Hola {{nombre_cliente}}, te recordamos que tu cuota de {{valor_cuota}} vence el {{fecha_vencimiento}}.',
  dueToday: 'Hola {{nombre_cliente}}, hoy vence tu cuota de {{valor_cuota}}. Total actual: {{total_actualizado}}.',
  overdue: 'Hola {{nombre_cliente}}, tu cuota venció. Mora acumulada: {{interes_mora}}. Saldo: {{saldo_restante}}.',
  confirmPayment: 'Gracias {{nombre_cliente}}. Confirmamos tu pago, saldo restante: {{saldo_restante}}.'
};

export function compileTemplate(template, variables) {
  return Object.entries(variables).reduce((message, [key, value]) => {
    return message.replaceAll(`{{${key}}}`, String(value ?? ''));
  }, template);
}

export function buildWhatsAppLink(phone, message) {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
