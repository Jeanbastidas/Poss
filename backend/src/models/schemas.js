import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});

export const saleItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  discount: z.number().nonnegative().default(0)
});

export const createSaleSchema = z.object({
  customerId: z.string().uuid().optional(),
  paymentMethod: z.enum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'MIXTO', 'CREDITO']),
  items: z.array(saleItemSchema).min(1),
  globalDiscount: z.number().nonnegative().default(0),
  taxRate: z.number().nonnegative().default(0.19),
  paidAmount: z.number().nonnegative().default(0)
});

export const customerSchema = z.object({
  fullName: z.string().min(3),
  documentId: z.string().min(4),
  phone: z.string().min(8),
  whatsapp: z.string().min(8),
  address: z.string().optional(),
  email: z.string().email().optional(),
  creditLimit: z.number().nonnegative().default(0),
  notes: z.string().optional()
});

export const creditSchema = z.object({
  customerId: z.string().uuid(),
  saleId: z.string().uuid(),
  downPayment: z.number().nonnegative().default(0),
  installments: z.number().int().positive(),
  frequency: z.enum(['SEMANAL', 'QUINCENAL', 'MENSUAL']),
  interestType: z.enum(['SIMPLE', 'COMPUESTO']),
  interestRate: z.number().nonnegative(),
  lateFeeDailyRate: z.number().nonnegative()
});

export const creditPaymentSchema = z.object({
  amount: z.number().positive(),
  method: z.enum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA']),
  note: z.string().max(250).optional()
});

export const productSchema = z.object({
  sku: z.string().min(3),
  barcode: z.string().optional(),
  name: z.string().min(2),
  category: z.string().min(2),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  minStock: z.number().int().nonnegative().default(0)
});

export const settingSchema = z.object({
  key: z.string().min(2).max(80),
  value: z.any()
});
