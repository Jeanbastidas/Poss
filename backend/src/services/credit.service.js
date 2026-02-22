const frequencyDays = {
  SEMANAL: 7,
  QUINCENAL: 15,
  MENSUAL: 30
};

function round(value) {
  return Number(Number(value).toFixed(2));
}

export function calculateCreditPlan({ principal, installments, frequency, interestType, interestRate }) {
  const normalizedPrincipal = Math.max(Number(principal || 0), 0);
  const normalizedRate = Math.max(Number(interestRate || 0), 0);

  const totalInterest =
    interestType === 'SIMPLE'
      ? normalizedPrincipal * normalizedRate * installments
      : normalizedPrincipal * ((1 + normalizedRate) ** installments - 1);

  const financedTotal = normalizedPrincipal + totalInterest;
  const installmentValue = financedTotal / installments;

  const schedule = Array.from({ length: installments }).map((_, index) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + frequencyDays[frequency] * (index + 1));

    return {
      installmentNumber: index + 1,
      dueDate: dueDate.toISOString(),
      value: round(installmentValue),
      paid: 0,
      pending: round(installmentValue),
      status: 'PENDIENTE'
    };
  });

  return {
    financedTotal: round(financedTotal),
    totalInterest: round(totalInterest),
    installmentValue: round(installmentValue),
    schedule
  };
}

export function applyCreditPayment({ schedule, amount, paymentDate = new Date().toISOString() }) {
  let remaining = round(amount);
  const updated = schedule.map((i) => ({ ...i }));

  for (const installment of updated) {
    if (remaining <= 0) break;
    if (installment.pending <= 0) continue;

    const covered = Math.min(remaining, installment.pending);
    installment.paid = round(installment.paid + covered);
    installment.pending = round(installment.value - installment.paid);
    installment.status = installment.pending <= 0 ? 'PAGADA' : 'PARCIAL';
    installment.lastPaymentDate = paymentDate;

    remaining = round(remaining - covered);
  }

  const totalPending = round(updated.reduce((acc, i) => acc + i.pending, 0));

  return {
    schedule: updated,
    appliedAmount: round(amount - remaining),
    unappliedAmount: remaining,
    totalPending
  };
}

export function classifyInstallmentStatus({ installment, now = new Date() }) {
  if (installment.pending <= 0) return 'PAGADA';
  const due = new Date(installment.dueDate);
  const current = new Date(now);
  due.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  if (due < current) return installment.status === 'PARCIAL' ? 'PARCIAL' : 'VENCIDA';
  return installment.status === 'PARCIAL' ? 'PARCIAL' : 'PENDIENTE';
}
