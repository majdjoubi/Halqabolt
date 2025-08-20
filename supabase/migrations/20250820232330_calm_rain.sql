/*
  # إضافة جداول الدفع والاشتراكات

  1. جداول جديدة
    - `payments` - سجل المدفوعات
    - `stripe_customers` - عملاء Stripe
    - تحديث جدول `subscriptions` لدعم Stripe

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات الوصول المناسبة
*/

-- جدول المدفوعات
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id text UNIQUE,
  amount decimal(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'SAR',
  status text NOT NULL DEFAULT 'pending',
  description text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول عملاء Stripe
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id text UNIQUE NOT NULL,
  email text,
  name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تحديث جدول الاشتراكات لدعم Stripe
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id text UNIQUE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_customer_id text;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS current_period_start timestamptz;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS current_period_end timestamptz;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS cancelled_at timestamptz;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS last_payment_date timestamptz;

-- فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);

-- تفعيل RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

-- سياسات الوصول للمدفوعات
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- سياسات الوصول لعملاء Stripe
CREATE POLICY "Users can view own stripe customer"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stripe customer"
  ON stripe_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stripe customer"
  ON stripe_customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- تحديث سياسات الاشتراكات الموجودة
DROP POLICY IF EXISTS "Students can create subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Students can read own subscriptions" ON subscriptions;

CREATE POLICY "Users can create subscriptions"
  ON subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM students WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM students WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions
  FOR UPDATE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM students WHERE user_id = auth.uid()
    )
  );