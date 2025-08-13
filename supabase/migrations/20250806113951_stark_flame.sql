/*
  # إنشاء قاعدة البيانات الأساسية لمنصة حلقة

  1. الجداول الجديدة
    - `teachers` - معلومات المعلمين
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `specialization` (text)
      - `experience_years` (integer)
      - `rating` (decimal)
      - `students_count` (integer)
      - `hourly_rate` (decimal)
      - `bio` (text)
      - `certificates` (text array)
      - `languages` (text array)
      - `availability_status` (text)
      - `profile_image_url` (text)
      - `is_verified` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `students` - معلومات الطلاب
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `age` (integer)
      - `level` (text)
      - `goals` (text array)
      - `preferred_schedule` (text)
      - `profile_image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `lessons` - الدروس المتاحة
      - `id` (uuid, primary key)
      - `teacher_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `type` (text) -- 'individual', 'group', 'memorization', 'tajweed'
      - `duration_minutes` (integer)
      - `price` (decimal)
      - `max_students` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamp)

    - `bookings` - حجوزات الدروس
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `lesson_id` (uuid, foreign key)
      - `teacher_id` (uuid, foreign key)
      - `scheduled_at` (timestamp)
      - `status` (text) -- 'pending', 'confirmed', 'completed', 'cancelled'
      - `meeting_url` (text)
      - `notes` (text)
      - `created_at` (timestamp)

    - `reviews` - تقييمات الطلاب
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `teacher_id` (uuid, foreign key)
      - `booking_id` (uuid, foreign key)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)

    - `subscriptions` - اشتراكات الطلاب
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `plan_name` (text)
      - `price` (decimal)
      - `billing_cycle` (text) -- 'monthly', 'yearly'
      - `status` (text) -- 'active', 'cancelled', 'expired'
      - `starts_at` (timestamp)
      - `ends_at` (timestamp)
      - `created_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات الأمان للعمليات المختلفة
*/

-- إنشاء جدول المعلمين
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  specialization text NOT NULL,
  experience_years integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0.0,
  students_count integer DEFAULT 0,
  hourly_rate decimal(10,2) NOT NULL,
  bio text,
  certificates text[] DEFAULT '{}',
  languages text[] DEFAULT '{"العربية"}',
  availability_status text DEFAULT 'available',
  profile_image_url text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول الطلاب
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  age integer,
  level text DEFAULT 'beginner',
  goals text[] DEFAULT '{}',
  preferred_schedule text,
  profile_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول الدروس
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('individual', 'group', 'memorization', 'tajweed')),
  duration_minutes integer DEFAULT 60,
  price decimal(10,2) NOT NULL,
  max_students integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول الحجوزات
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  scheduled_at timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  meeting_url text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول التقييمات
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول الاشتراكات
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  plan_name text NOT NULL,
  price decimal(10,2) NOT NULL,
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  starts_at timestamptz DEFAULT now(),
  ends_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمعلمين
CREATE POLICY "Teachers can read all profiles"
  ON teachers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can update own profile"
  ON teachers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can insert own profile"
  ON teachers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- سياسات الأمان للطلاب
CREATE POLICY "Students can read own profile"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Students can update own profile"
  ON students
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own profile"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- سياسات الأمان للدروس
CREATE POLICY "Anyone can read active lessons"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Teachers can manage own lessons"
  ON lessons
  FOR ALL
  TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

-- سياسات الأمان للحجوزات
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid()) OR
    teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid())
  );

CREATE POLICY "Students can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Teachers and students can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid()) OR
    teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid())
  );

-- سياسات الأمان للتقييمات
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- سياسات الأمان للاشتراكات
CREATE POLICY "Students can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can create subscriptions"
  ON subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_teachers_rating ON teachers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_teachers_specialization ON teachers(specialization);
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_teacher_id ON lessons(teacher_id);
CREATE INDEX IF NOT EXISTS idx_lessons_type ON lessons(type);
CREATE INDEX IF NOT EXISTS idx_bookings_student_id ON bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_teacher_id ON bookings(teacher_id);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_at ON bookings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_reviews_teacher_id ON reviews(teacher_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_student_id ON subscriptions(student_id);