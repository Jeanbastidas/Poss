export function calculateSaleTotals({ items, globalDiscount = 0, taxRate = 0.19, paidAmount = 0 }) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice - item.discount, 0);
  const taxable = Math.max(subtotal - globalDiscount, 0);
  const taxes = taxable * taxRate;
  const total = taxable + taxes;
  const change = Math.max(paidAmount - total, 0);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    taxes: Number(taxes.toFixed(2)),
    total: Number(total.toFixed(2)),
    change: Number(change.toFixed(2))
  };
}
