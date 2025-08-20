import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { testSupabaseConnection, isSupabaseConfigured } from '../lib/supabase';

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected' | 'not-configured'>('checking');
  const [details, setDetails] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setStatus('checking');
    
    if (!isSupabaseConfigured()) {
      setStatus('not-configured');
      setDetails('يرجى إعداد متغيرات البيئة في Vercel');
      return;
    }

    try {
      const isConnected = await testSupabaseConnection();
      if (isConnected) {
        setStatus('connected');
        setDetails('الاتصال ناجح');
      } else {
        setStatus('disconnected');
        setDetails('فشل الاتصال - تحقق من الإعدادات');
      }
    } catch (error) {
      setStatus('disconnected');
      setDetails('خطأ في الاتصال');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'not-configured':
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'checking':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'connected':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'disconnected':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'not-configured':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed top-4 left-4 z-50 p-3 rounded-lg border ${getStatusColor()} shadow-lg max-w-sm`}>
      <div className="flex items-center space-x-2 space-x-reverse">
        {getStatusIcon()}
        <div>
          <div className="font-medium text-sm">
            حالة Supabase: {status === 'checking' ? 'جاري الفحص...' : 
                           status === 'connected' ? 'متصل' :
                           status === 'disconnected' ? 'غير متصل' : 'غير مُعد'}
          </div>
          <div className="text-xs opacity-75">{details}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <button 
            onClick={checkConnection}
            className="text-xs px-2 py-1 rounded bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors"
          >
            إعادة فحص
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-xs px-2 py-1 rounded bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors"
          >
            إخفاء
          </button>
        </div>
      </div>
      
      {status === 'not-configured' && (
        <div className="mt-2 text-xs">
          <div className="font-medium mb-1">خطوات الإعداد:</div>
          <ol className="list-decimal list-inside space-y-1 opacity-75 text-right">
            <li>أنشئ مشروع في supabase.com</li>
            <li>انسخ URL و Anon Key</li>
            <li>أضفهما كمتغيرات بيئة في Vercel</li>
            <li>أعد نشر التطبيق</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;