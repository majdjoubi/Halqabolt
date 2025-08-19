/*
  # Initial Schema for Halaqah Platform

  1. New Tables
    - `student_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `age` (integer, optional)
      - `level` (text, enum: beginner/intermediate/advanced)
      - `goals` (text array)
      - `preferred_schedule` (text, optional)
      - `profile_image_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `teacher_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `specialization` (text)
      - `experience_years` (integer)
      - `hourly_rate` (decimal)
      - `bio` (text)
      - `certificates` (text array)
      - `languages` (text array)
      - `is_verified` (boolean)
      - `rating` (decimal)
      - `students_count` (integer)
      - `profile_image_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `sessions`
      - `id` (uuid, primary key)
      - `teacher_id` (uuid, references teacher_profiles)
      - `title` (text)
      - `description` (text, optional)
      - `scheduled_at` (timestamp)
      - `duration_minutes` (integer)
      - `price` (decimal)
      - `max_students` (integer)
      - `session_type` (text, enum: individual/group)
      - `status` (text, enum: scheduled/completed/cancelled)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `bookings`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references student_profiles)
      - `session_id` (uuid, references sessions)
      - `status` (text, enum: pending/confirmed/cancelled/completed)
      - `payment_status` (text, enum: pending/paid/refunded)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for teachers to manage their sessions
    - Add policies for students to view available sessions and manage their bookings
*/

-- Create student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  age integer,
  level text NOT NULL DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  goals text[] DEFAULT '{}',
  preferred_schedule text DEFAULT '',
  profile_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create teacher profiles table
CREATE TABLE IF NOT EXISTS teacher_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  specialization text NOT NULL DEFAULT '',
  experience_years integer NOT NULL DEFAULT 0,
  hourly_rate decimal(10,2) NOT NULL DEFAULT 0,
  bio text NOT NULL DEFAULT '',
  certificates text[] DEFAULT '{}',
  languages text[] DEFAULT '{"العربية"}',
  is_verified boolean NOT NULL DEFAULT false,
  rating decimal(3,2) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  students_count integer NOT NULL DEFAULT 0,
  profile_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  price decimal(10,2) NOT NULL DEFAULT 0,
  max_students integer NOT NULL DEFAULT 1,
  session_type text NOT NULL DEFAULT 'individual' CHECK (session_type IN ('individual', 'group')),
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES student_profiles(id) ON DELETE CASCADE,
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, session_id)
);

-- Enable Row Level Security
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Student profiles policies
CREATE POLICY "Students can read own profile"
  ON student_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Students can update own profile"
  ON student_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own profile"
  ON student_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Teacher profiles policies
CREATE POLICY "Teachers can read own profile"
  ON teacher_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can update own profile"
  ON teacher_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can insert own profile"
  ON teacher_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can read verified teacher profiles"
  ON teacher_profiles
  FOR SELECT
  TO authenticated
  USING (is_verified = true);

-- Sessions policies
CREATE POLICY "Teachers can manage own sessions"
  ON sessions
  FOR ALL
  TO authenticated
  USING (teacher_id IN (
    SELECT id FROM teacher_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Everyone can read available sessions"
  ON sessions
  FOR SELECT
  TO authenticated
  USING (status = 'scheduled' AND scheduled_at > now());

-- Bookings policies
CREATE POLICY "Students can manage own bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (student_id IN (
    SELECT id FROM student_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Teachers can read bookings for their sessions"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (session_id IN (
    SELECT s.id FROM sessions s
    JOIN teacher_profiles tp ON s.teacher_id = tp.id
    WHERE tp.user_id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_profiles_user_id ON teacher_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_profiles_verified ON teacher_profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_sessions_teacher_id ON sessions(teacher_id);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled_at ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_bookings_student_id ON bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_session_id ON bookings(session_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_student_profiles_updated_at
    BEFORE UPDATE ON student_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teacher_profiles_updated_at
    BEFORE UPDATE ON teacher_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();