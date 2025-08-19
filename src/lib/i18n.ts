import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      liveLessons: 'الدروس الحية',
      donate: 'تبرع الآن',
      startLearning: 'ابدأ التعلم الآن',
      appName: 'حلقة',
      
      // Hero Section
      heroTitle: 'تعلم القرآن الكريم عن بُعد',
      heroSubtitle: 'انضم إلى آلاف الطلاب الذين يتعلمون تلاوة وتجويد القرآن الكريم مع أفضل المعلمين المعتمدين في جلسات فردية وجماعية تفاعلية',
      startFirstLesson: 'ابدأ درسك الأول مجاناً',
      
      // Features
      whyChoose: 'لماذا تختار',
      featuresSubtitle: 'نقدم لك تجربة تعليمية فريدة تجمع بين التقنية الحديثة والمنهجية الأصيلة في تعليم القرآن الكريم',
      
      // Auth
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب جديد',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      accountType: 'نوع الحساب',
      student: 'طالب',
      teacher: 'معلم',
      
      // Common
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'تم بنجاح',
      cancel: 'إلغاء',
      save: 'حفظ',
      close: 'إغلاق',
      back: 'العودة'
    }
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      liveLessons: 'Live Lessons',
      donate: 'Donate Now',
      startLearning: 'Start Learning Now',
      appName: 'Halaqah',
      
      // Hero Section
      heroTitle: 'Learn Quran Online',
      heroSubtitle: 'Join thousands of students learning Quran recitation and Tajweed with certified teachers in interactive individual and group sessions',
      startFirstLesson: 'Start Your First Free Lesson',
      
      // Features
      whyChoose: 'Why Choose',
      featuresSubtitle: 'We provide you with a unique learning experience that combines modern technology with authentic methodology in Quran education',
      
      // Auth
      signIn: 'Sign In',
      signUp: 'Create New Account',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      accountType: 'Account Type',
      student: 'Student',
      teacher: 'Teacher',
      
      // Common
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
      back: 'Back'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;