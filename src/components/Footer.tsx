import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <img 
                src="/حلقة 2.png" 
                alt="شعار حلقة" 
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-3 rounded-xl hidden">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">حلقة</h3>
                <p className="text-gray-400 text-sm">منصة تعليم القرآن الكريم</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              منصة رائدة في تعليم القرآن الكريم عن بُعد، تجمع بين أفضل المعلمين والطلاب في بيئة تعليمية تفاعلية ومميزة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">الرئيسية</a></li>
              <li><a href="#teachers" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">المعلمون</a></li>
              <li><a href="#lessons" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">الدروس</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">خدماتنا</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">دروس فردية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">دروس جماعية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">دورات التجويد</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">info@halaqah.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400" dir="ltr">+966 50 123 4567</span>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-emerald-400 mt-1" />
                <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>

            <div className="mt-8">
              <h5 className="text-lg font-semibold mb-4">اشترك في النشرة الإخبارية</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="bg-gray-800 text-white px-4 py-2 rounded-r-lg flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-l-lg transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 حلقة - منصة تعليم القرآن الكريم. جميع الحقوق محفوظة.
            </div>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;