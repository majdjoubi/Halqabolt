# منصة حلقة - تعليم القرآن الكريم عن بُعد

منصة إلكترونية متطورة لتعليم القرآن الكريم عن بُعد، تجمع بين المعلمين المؤهلين والطلاب في بيئة تعليمية تفاعلية.

## المميزات الرئيسية

- 🕌 **واجهة عربية أصيلة**: تصميم يحترم الهوية الإسلامية والعربية
- 👨‍🏫 **معلمون معتمدون**: مدرسون مؤهلون وحاصلون على إجازات في القرآن الكريم
- 📚 **أنواع دروس متنوعة**: دروس فردية، جماعية، تحفيظ، وتجويد
- 💳 **نظام دفع متكامل**: باقات اشتراك مرنة تناسب جميع الاحتياجات
- 📱 **تصميم متجاوب**: يعمل بسلاسة على جميع الأجهزة
- 🔐 **نظام مصادقة آمن**: حماية كاملة لبيانات المستخدمين

## التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **UI Components**: Lucide React Icons
- **Build Tool**: Vite
- **Deployment**: Supabase Hosting

## إعداد المشروع محلياً

### المتطلبات الأساسية
- Node.js 18+ 
- npm أو yarn
- حساب Supabase
- حساب Vercel (للنشر)

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd halaqah-platform
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env
```

4. **تحديث متغيرات Supabase في ملف `.env`**
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. **تشغيل المشروع**
```bash
npm run dev
```

## ربط Supabase بـ Vercel

### الحصول على بيانات اعتماد Supabase

1. **انتقل إلى لوحة تحكم Supabase**:
   - اذهب إلى [supabase.com](https://supabase.com) وسجل الدخول
   - اختر مشروعك

2. **احصل على Project URL و API Key**:
   - في الشريط الجانبي، انقر على "Project Settings"
   - اختر "API" من القائمة
   - انسخ "Project URL" (مثال: `https://abc123.supabase.co`)
   - انسخ "anon public" key (يبدأ بـ `eyJ...`)

### إضافة متغيرات البيئة في Vercel

1. **انتقل إلى لوحة تحكم Vercel**:
   - اذهب إلى [vercel.com](https://vercel.com) وسجل الدخول
   - اختر مشروعك

2. **أضف متغيرات البيئة**:
   - انتقل إلى "Settings" > "Environment Variables"
   - أضف المتغيرات التالية:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production, Preview, Development |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |

3. **إعادة النشر**:
   - بعد إضافة المتغيرات، قم بإعادة نشر المشروع
   - يمكنك القيام بذلك عن طريق الذهاب إلى "Deployments" والنقر على "Redeploy"

### التحقق من الاتصال

بعد النشر، يمكنك التحقق من حالة الاتصال:
- افتح تطبيقك المنشور على Vercel
- ستظهر رسالة في أعلى الصفحة تُظهر حالة اتصال Supabase
- إذا كان الاتصال ناجحاً، ستختفي الرسالة تلقائياً

## إعداد قاعدة البيانات

### إنشاء مشروع Supabase جديد

1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ مشروعاً جديداً
3. انسخ URL المشروع و Anon Key

### تطبيق المايجريشن

1. في لوحة تحكم Supabase، اذهب إلى SQL Editor
2. انسخ محتوى ملف `supabase/migrations/create_initial_schema.sql`
3. شغل الاستعلام لإنشاء الجداول
4. انسخ محتوى ملف `supabase/migrations/insert_sample_data.sql`
5. شغل الاستعلام لإدراج البيانات التجريبية

## هيكل المشروع

```
src/
├── components/          # مكونات React
│   ├── Header.tsx      # شريط التنقل العلوي
│   ├── Hero.tsx        # القسم الرئيسي
│   ├── Teachers.tsx    # قائمة المعلمين
│   ├── Features.tsx    # المميزات
│   ├── Pricing.tsx     # الأسعار والباقات
│   ├── Testimonials.tsx # آراء الطلاب
│   ├── Footer.tsx      # التذييل
│   └── AuthModal.tsx   # نافذة تسجيل الدخول
├── hooks/              # React Hooks مخصصة
│   ├── useAuth.ts      # إدارة المصادقة
│   └── useTeachers.ts  # جلب بيانات المعلمين
├── lib/                # المكتبات والإعدادات
│   └── supabase.ts     # إعداد Supabase
└── App.tsx             # المكون الرئيسي
```

## النشر على Supabase

### النشر على Vercel

1. بناء المشروع للإنتاج
```bash
npm run build
```

2. رفع ملفات `dist/` إلى Vercel أو أي خدمة استضافة أخرى

3. تأكد من إعداد متغيرات البيئة في منصة الاستضافة:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## المساهمة في المشروع

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم والتواصل

- 📧 البريد الإلكتروني: info@halaqah.com
- 🌐 الموقع الإلكتروني: [halaqah.com](https://halaqah.com)
- 📱 تويتر: [@halaqah_app](https://twitter.com/halaqah_app)

---

**بارك الله فيكم وجعل هذا العمل في ميزان حسناتكم** 🤲