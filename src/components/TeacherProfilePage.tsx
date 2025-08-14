```diff
--- /dev/null
+++ b/src/components/TeacherProfilePage.tsx
@@ -0,0 +1,129 @@
+import React, { useState, useEffect } from 'react';
+import { X, Star, Users, BookOpen, DollarSign, Award, Globe, Clock } from 'lucide-react';
+import { supabase } from '../lib/supabase';
+
+interface TeacherProfilePageProps {
+  teacherId: string;
+  onClose: () => void;
+}
+
+interface Teacher {
+  id: string;
+  name: string;
+  specialization: string;
+  experience_years: number;
+  rating: number;
+  students_count: number;
+  hourly_rate: number;
+  bio: string;
+  certificates: string[];
+  languages: string[];
+  profile_image_url: string;
+  is_verified: boolean;
+}
+
+const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({ teacherId, onClose }) => {
+  const [teacher, setTeacher] = useState<Teacher | null>(null);
+  const [loading, setLoading] = useState(true);
+  const [error, setError] = useState<string | null>(null);
+
+  useEffect(() => {
+    const fetchTeacher = async () => {
+      setLoading(true);
+      const { data, error } = await supabase
+        .from('teachers')
+        .select('*')
+        .eq('id', teacherId)
+        .single();
+
+      if (error) {
+        setError(error.message);
+        setTeacher(null);
+      } else {
+        setTeacher(data);
+        setError(null);
+      }
+      setLoading(false);
+    };
+
+    fetchTeacher();
+  }, [teacherId]);
+
+  if (loading) {
+    return (
+      <div className="min-h-screen flex items-center justify-center bg-gray-50">
+        <p className="text-gray-600">جاري تحميل بيانات المعلم...</p>
+      </div>
+    );
+  }
+
+  if (error) {
+    return (
+      <div className="min-h-screen flex items-center justify-center bg-gray-50">
+        <p className="text-red-600">خطأ: {error}</p>
+        <button onClick={onClose} className="ml-4 px-4 py-2 bg-emerald-600 text-white rounded-lg">
+          العودة
+        </button>
+      </div>
+    );
+  }
+
+  if (!teacher) {
+    return (
+      <div className="min-h-screen flex items-center justify-center bg-gray-50">
+        <p className="text-gray-600">لم يتم العثور على المعلم.</p>
+        <button onClick={onClose} className="ml-4 px-4 py-2 bg-emerald-600 text-white rounded-lg">
+          العودة
+        </button>
+      </div>
+    );
+  }
+
+  return (
+    <div className="min-h-screen bg-gray-50">
+      {/* Header */}
+      <div className="bg-white shadow-sm border-b">
+        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
+          <div className="flex items-center justify-between">
+            <h1 className="text-2xl font-bold text-gray-900">ملف المعلم</h1>
+            <button
+              onClick={onClose}
+              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
+            >
+              <X className="h-6 w-6" />
+            </button>
+          </div>
+        </div>
+      </div>
+
+      {/* Teacher Profile Content */}
+      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
+        <div className="bg-white rounded-2xl shadow-lg p-8">
+          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse mb-8">
+            <img
+              src={teacher.profile_image_url || 'https://via.placeholder.com/150'}
+              alt={teacher.name}
+              className="w-32 h-32 rounded-full object-cover shadow-md"
+            />
+            <div className="text-center md:text-right">
+              <h2 className="text-3xl font-bold text-gray-900 mb-2">{teacher.name}</h2>
+              <p className="text-emerald-600 text-lg font-medium mb-2">{teacher.specialization}</p>
+              <div className="flex items-center justify-center md:justify-end space-x-4 space-x-reverse text-gray-600">
+                <span className="flex items-center"><Star className="h-5 w-5 text-yellow-400 fill-current ml-1" /> {teacher.rating.toFixed(1)}</span>
+                <span className="flex items-center"><Users className="h-5 w-5 ml-1" /> {teacher.students_count} طالب</span>
+                <span className="flex items-center"><Clock className="h-5 w-5 ml-1" /> {teacher.experience_years} سنوات خبرة</span>
+              </div>
+            </div>
+          </div>
+
+          <p className="text-gray-700 leading-relaxed mb-6">{teacher.bio}</p>
+
+          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
+            <div>
+              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center"><Award className="h-6 w-6 text-emerald-600 ml-2" /> الشهادات</h3>
+              <ul className="list-disc list-inside text-gray-700 space-y-1 pr-4">
+                {teacher.certificates.map((cert, index) => <li key={index}>{cert}</li>)}
+              </ul>
+            </div>
+            <div>
+              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center"><Globe className="h-6 w-6 text-emerald-600 ml-2" /> اللغات</h3>
+              <ul className="list-disc list-inside text-gray-700 space-y-1 pr-4">
+                {teacher.languages.map((lang, index) => <li key={index}>{lang}</li>)}
+              </ul>
+            </div>
+          </div>
+
+          <div className="text-center bg-emerald-50 p-6 rounded-xl mb-8">
+            <p className="text-2xl font-bold text-emerald-800 flex items-center justify-center">
+              <DollarSign className="h-7 w-7 ml-2" />
+              {teacher.hourly_rate} ريال / ساعة
+            </p>
+          </div>
+
+          <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 text-lg font-semibold flex items-center justify-center">
+            <BookOpen className="h-6 w-6 ml-2" />
+            احجز درسك الأول الآن
+          </button>
+        </div>
+      </div>
+    </div>
+  );
+};
+
+export default TeacherProfilePage;
```