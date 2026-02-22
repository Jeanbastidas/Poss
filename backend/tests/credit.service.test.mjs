import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCreditPayment, calculateCreditPlan, classifyInstallmentStatus } from '../src/services/credit.service.js';

test('calculateCreditPlan returns expected schedule length', () => {
  const plan = calculateCreditPlan({
    principal: 1000,
    installments: 4,
    frequency: 'MENSUAL',
    interestType: 'SIMPLE',
    interestRate: 0.05
  });

  assert.equal(plan.schedule.length, 4);
  assert.equal(plan.financedTotal, 1200);
  assert.equal(plan.installmentValue, 300);
});

test('applyCreditPayment distributes payment across installments', () => {
  const base = calculateCreditPlan({
    principal: 1000,
    installments: 2,
    frequency: 'MENSUAL',
    interestType: 'SIMPLE',
    interestRate: 0
  });

  const result = applyCreditPayment({ schedule: base.schedule, amount: 700 });

  assert.equal(result.appliedAmount, 700);
  assert.equal(result.unappliedAmount, 0);
  assert.equal(result.totalPending, 300);
  assert.equal(result.schedule[0].status, 'PAGADA');
  assert.equal(result.schedule[1].status, 'PARCIAL');
});


test('classifyInstallmentStatus marks overdue installments', () => {
  const status = classifyInstallmentStatus({
    installment: { dueDate: '2020-01-01T00:00:00.000Z', pending: 100, status: 'PENDIENTE' },
    now: new Date('2020-01-10T00:00:00.000Z')
  });

  assert.equal(status, 'VENCIDA');
});
