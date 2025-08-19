import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const UpdateBanner = () => {
  const lastUpdate = new Date().toLocaleDateString('ar-SA');
  
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <CheckCircle className="h-5 w-5 text-emerald-600 ml-2" />
        <div>
          <p className="text-emerald-800 font-medium">
            ✨ تم تحديث التطبيق - {lastUpdate}
          </p>
          <p className="text-emerald-700 text-sm">
            تم حذف البيانات القديمة وتحسين الأداء العام للمنصة
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanner;