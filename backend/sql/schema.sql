CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(80) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMINISTRADOR', 'CAJERO', 'SUPERVISOR')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(80) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  document_id VARCHAR(40) UNIQUE NOT NULL,
  phone VARCHAR(30) NOT NULL,
  whatsapp VARCHAR(30) NOT NULL,
  address TEXT,
  email VARCHAR(120),
  credit_limit NUMERIC(12,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(60) UNIQUE NOT NULL,
  barcode VARCHAR(80),
  name VARCHAR(200) NOT NULL,
  category VARCHAR(120) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  min_stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  payment_method VARCHAR(20) NOT NULL,
  payload JSONB NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  taxes NUMERIC(12,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  paid_amount NUMERIC(12,2) NOT NULL,
  change NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  sale_id UUID NOT NULL REFERENCES sales(id),
  down_payment NUMERIC(12,2) DEFAULT 0,
  installments INT NOT NULL,
  frequency VARCHAR(20) NOT NULL,
  interest_type VARCHAR(20) NOT NULL,
  interest_rate NUMERIC(10,4) NOT NULL,
  late_fee_daily_rate NUMERIC(10,4) NOT NULL,
  financed_total NUMERIC(12,2) NOT NULL,
  total_interest NUMERIC(12,2) NOT NULL,
  installment_value NUMERIC(12,2) NOT NULL,
  schedule JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS credit_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credit_id UUID NOT NULL REFERENCES credits(id),
  amount NUMERIC(12,2) NOT NULL,
  method VARCHAR(20) NOT NULL,
  note VARCHAR(250),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reminder_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credit_id UUID NOT NULL REFERENCES credits(id),
  installment_number INT NOT NULL,
  type VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  whatsapp_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
