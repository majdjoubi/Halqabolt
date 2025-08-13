/*
  # إدراج بيانات تجريبية لمنصة حلقة

  1. بيانات المعلمين التجريبية
  2. بيانات الدروس التجريبية
  3. بيانات التقييمات التجريبية
*/

-- إدراج معلمين تجريبيين
INSERT INTO teachers (
  name, 
  specialization, 
  experience_years, 
  rating, 
  students_count, 
  hourly_rate, 
  bio, 
  certificates, 
  languages, 
  availability_status,
  profile_image_url,
  is_verified
) VALUES 
(
  'الشيخ أحمد محمود',
  'متخصص في التجويد والقراءات',
  15,
  4.9,
  450,
  25.00,
  'معلم قرآن كريم بخبرة 15 سنة، حاصل على إجازات في القراءات العشر، متخصص في تعليم التجويد وأحكام التلاوة',
  ARRAY['إجازة في رواية حفص', 'شهادة التجويد المتقدم', 'إجازة في القراءات العشر'],
  ARRAY['العربية', 'الإنجليزية'],
  'متاح اليوم',
  'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=400',
  true
),
(
  'الأستاذة فاطمة السيد',
  'تحفيظ القرآن للأطفال',
  10,
  4.8,
  320,
  20.00,
  'متخصصة في تعليم الأطفال وتحفيظهم القرآن الكريم بطرق تفاعلية ومبتكرة، خبرة 10 سنوات في التعليم',
  ARRAY['إجازة في القرآن الكريم', 'دبلوم تعليم الأطفال', 'شهادة في علم النفس التربوي'],
  ARRAY['العربية', 'الفرنسية'],
  'متاحة غداً',
  'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=400',
  true
),
(
  'الشيخ عمر حسان',
  'التفسير وعلوم القرآن',
  20,
  5.0,
  680,
  30.00,
  'دكتور في علوم القرآن والتفسير، خبرة 20 سنة في التدريس الجامعي والتعليم الإلكتروني',
  ARRAY['دكتوراه في علوم القرآن', 'إجازة في عدة قراءات', 'شهادة في التفسير'],
  ARRAY['العربية', 'الإنجليزية', 'الأردية'],
  'متاح الآن',
  'https://images.pexels.com/photos/8923903/pexels-photo-8923903.jpeg?auto=compress&cs=tinysrgb&w=400',
  true
),
(
  'الأستاذة عائشة المصري',
  'التلاوة والتجويد للمبتدئين',
  8,
  4.7,
  280,
  18.00,
  'معلمة متخصصة في تعليم المبتدئين أساسيات التلاوة والتجويد بطريقة مبسطة وواضحة',
  ARRAY['إجازة في التجويد', 'شهادة تعليم المبتدئين'],
  ARRAY['العربية', 'الإنجليزية'],
  'متاحة بعد ساعتين',
  'https://images.pexels.com/photos/8923904/pexels-photo-8923904.jpeg?auto=compress&cs=tinysrgb&w=400',
  true
);

-- إدراج دروس تجريبية
INSERT INTO lessons (teacher_id, title, description, type, duration_minutes, price, max_students)
SELECT 
  t.id,
  CASE 
    WHEN t.specialization LIKE '%التجويد%' THEN 'دورة التجويد المتقدم'
    WHEN t.specialization LIKE '%الأطفال%' THEN 'حلقة تحفيظ للأطفال'
    WHEN t.specialization LIKE '%التفسير%' THEN 'دروس التفسير'
    ELSE 'دروس التلاوة الأساسية'
  END,
  CASE 
    WHEN t.specialization LIKE '%التجويد%' THEN 'تعلم أحكام التجويد وتطبيقها عملياً'
    WHEN t.specialization LIKE '%الأطفال%' THEN 'حفظ القرآن للأطفال بطرق تفاعلية'
    WHEN t.specialization LIKE '%التفسير%' THEN 'فهم معاني القرآن وتفسيره'
    ELSE 'تعلم أساسيات التلاوة الصحيحة'
  END,
  CASE 
    WHEN t.specialization LIKE '%الأطفال%' THEN 'group'
    WHEN t.specialization LIKE '%التفسير%' THEN 'group'
    ELSE 'individual'
  END,
  CASE 
    WHEN t.specialization LIKE '%الأطفال%' THEN 45
    WHEN t.specialization LIKE '%التفسير%' THEN 75
    ELSE 60
  END,
  t.hourly_rate,
  CASE 
    WHEN t.specialization LIKE '%الأطفال%' THEN 8
    WHEN t.specialization LIKE '%التفسير%' THEN 12
    ELSE 1
  END
FROM teachers t;

-- إدراج تقييمات تجريبية
INSERT INTO reviews (teacher_id, rating, comment)
SELECT 
  t.id,
  CASE 
    WHEN t.rating >= 4.9 THEN 5
    WHEN t.rating >= 4.5 THEN FLOOR(RANDOM() * 2 + 4)::integer
    ELSE FLOOR(RANDOM() * 3 + 3)::integer
  END,
  CASE 
    WHEN t.name LIKE '%أحمد%' THEN 'تجربة رائعة مع الشيخ أحمد! تحسن مستواي في التجويد بشكل ملحوظ'
    WHEN t.name LIKE '%فاطمة%' THEN 'معلمة ممتازة للأطفال، ابنتي تحب دروسها كثيراً'
    WHEN t.name LIKE '%عمر%' THEN 'شرح واضح ومفصل للتفسير، استفدت كثيراً من دروسه'
    ELSE 'معلمة صبورة ومتميزة في التعليم'
  END
FROM teachers t;