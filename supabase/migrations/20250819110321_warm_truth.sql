/*
  # Sample Data for Halaqah Platform

  1. Sample Teacher Profiles
    - Creates verified teacher profiles with realistic data
    - Includes specializations, ratings, and experience

  2. Sample Sessions
    - Creates upcoming sessions for the sample teachers
    - Various types: individual and group sessions
    - Different times and prices

  Note: This is sample data for development and testing purposes
*/

-- Insert sample teacher profiles
-- Note: These will need real user_ids from auth.users after actual users sign up
-- For now, we'll create placeholder UUIDs that can be updated later

INSERT INTO teacher_profiles (
  id,
  user_id,
  name,
  specialization,
  experience_years,
  hourly_rate,
  bio,
  certificates,
  languages,
  is_verified,
  rating,
  students_count,
  profile_image_url
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111', -- This should be updated with real user_id
  'الشيخ أحمد محمود',
  'متخصص في التجويد والقراءات',
  15,
  25.00,
  'معلم قرآن كريم بخبرة 15 سنة، حاصل على إجازات في القراءات العشر. أسلوبي في التدريس يركز على التطبيق العملي والتدرج في التعلم.',
  ARRAY['إجازة في رواية حفص عن عاصم', 'شهادة التجويد المتقدم', 'إجازة في القراءات العشر'],
  ARRAY['العربية', 'الإنجليزية'],
  true,
  4.9,
  450,
  'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=400'
),
(
  '22222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222', -- This should be updated with real user_id
  'الأستاذة فاطمة السيد',
  'تحفيظ القرآن للأطفال',
  10,
  20.00,
  'متخصصة في تعليم الأطفال وتحفيظهم القرآن الكريم بطرق تفاعلية ومبتكرة. خبرة واسعة في التعامل مع الأطفال من مختلف الأعمار.',
  ARRAY['إجازة في القرآن الكريم', 'دبلوم تعليم الأطفال', 'شهادة في علم النفس التربوي'],
  ARRAY['العربية', 'الفرنسية'],
  true,
  4.8,
  320,
  'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=400'
),
(
  '33333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333', -- This should be updated with real user_id
  'الشيخ عمر حسان',
  'التفسير وعلوم القرآن',
  20,
  30.00,
  'دكتور في التفسير وعلوم القرآن، خبرة 20 سنة في التدريس الجامعي والتعليم عن بُعد. متخصص في تبسيط المفاهيم المعقدة.',
  ARRAY['دكتوراه في التفسير وعلوم القرآن', 'إجازة في القراءات السبع', 'شهادة تدريس اللغة العربية'],
  ARRAY['العربية', 'الإنجليزية', 'الفرنسية'],
  true,
  5.0,
  680,
  'https://images.pexels.com/photos/8923903/pexels-photo-8923903.jpeg?auto=compress&cs=tinysrgb&w=400'
);

-- Insert sample sessions
INSERT INTO sessions (
  id,
  teacher_id,
  title,
  description,
  scheduled_at,
  duration_minutes,
  price,
  max_students,
  session_type,
  status
) VALUES 
-- Sessions for الشيخ أحمد محمود
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '11111111-1111-1111-1111-111111111111',
  'درس التجويد المتقدم',
  'درس متقدم في أحكام التجويد مع التطبيق العملي على آيات مختارة من القرآن الكريم',
  '2025-01-20 10:00:00+00',
  60,
  25.00,
  1,
  'individual',
  'scheduled'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '11111111-1111-1111-1111-111111111111',
  'حلقة تجويد جماعية',
  'حلقة جماعية لتعلم أساسيات التجويد مع التطبيق والتصحيح',
  '2025-01-21 16:00:00+00',
  90,
  15.00,
  8,
  'group',
  'scheduled'
),
-- Sessions for الأستاذة فاطمة السيد
(
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '22222222-2222-2222-2222-222222222222',
  'حفظ سورة البقرة - الجزء الأول',
  'بداية حفظ سورة البقرة مع شرح معاني الآيات بطريقة مبسطة للأطفال',
  '2025-01-22 14:00:00+00',
  45,
  20.00,
  1,
  'individual',
  'scheduled'
),
(
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '22222222-2222-2222-2222-222222222222',
  'مراجعة الحفظ للأطفال',
  'جلسة مراجعة جماعية للأطفال مع أنشطة تفاعلية وألعاب تعليمية',
  '2025-01-23 15:30:00+00',
  60,
  12.00,
  6,
  'group',
  'scheduled'
),
-- Sessions for الشيخ عمر حسان
(
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  '33333333-3333-3333-3333-333333333333',
  'تفسير سورة الفاتحة',
  'شرح مفصل لسورة الفاتحة مع بيان المعاني والحكم والفوائد',
  '2025-01-24 19:00:00+00',
  75,
  30.00,
  1,
  'individual',
  'scheduled'
),
(
  'ffffffff-ffff-ffff-ffff-ffffffffffff',
  '33333333-3333-3333-3333-333333333333',
  'دورة علوم القرآن',
  'دورة شاملة في علوم القرآن تشمل أسباب النزول والناسخ والمنسوخ',
  '2025-01-25 20:00:00+00',
  120,
  25.00,
  12,
  'group',
  'scheduled'
);

-- Note: To use this data properly, you'll need to:
-- 1. Create actual user accounts through Supabase Auth
-- 2. Update the user_id fields in teacher_profiles with real auth.users IDs
-- 3. Update the teacher_id fields in sessions to match the actual teacher profile IDs