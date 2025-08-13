import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد السيد',
      role: 'طالب - مصر',
      content: 'تجربة رائعة مع منصة حلقة! المعلمون متميزون وصبورون، وتحسن مستواي في التجويد بشكل ملحوظ خلال شهرين فقط.',
      rating: 5,
      image: 'https://images.pexels.com/photos/8923905/pexels-photo-8923905.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 2,
      name: 'فاطمة عبد الرحمن',
      role: 'أم وطالبة - الإمارات',
      content: 'منصة ممتازة للتعلم مع الأطفال. ابنتي تعلمت حفظ 3 سور في شهر واحد، والمعلمة صبورة جداً معها.',
      rating: 5,
      image: 'https://images.pexels.com/photos/8923906/pexels-photo-8923906.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 3,
      name: 'يوسف الأحمدي',
      role: 'مهندس - السعودية',
      content: 'المرونة في المواعيد ممتازة، أستطيع أن أتعلم بعد العمل. الدروس الجماعية ممتعة والتفاعل مع الطلاب الآخرين محفز.',
      rating: 4,
      image: 'https://images.pexels.com/photos/8923907/pexels-photo-8923907.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 4,
      name: 'خديجة المغربي',
      role: 'معلمة - المغرب',
      content: 'كمعلمة، أعجبتني جودة المنصة وسهولة استخدامها. الطلاب متفاعلون والإدارة متعاونة جداً.',
      rating: 5,
      image: 'https://images.pexels.com/photos/8923908/pexels-photo-8923908.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 5,
      name: 'عبد الله الخالدي',
      role: 'طالب جامعي - الكويت',
      content: 'تعلمت أحكام التجويد من الصفر، والآن أستطيع أن أقرأ بطريقة صحيحة. شكراً لفريق حلقة على هذه المنصة الرائعة.',
      rating: 5,
      image: 'https://images.pexels.com/photos/8923909/pexels-photo-8923909.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 6,
      name: 'مريم التونسي',
      role: 'ربة منزل - تونس',
      content: 'أحببت الدروس الجماعية، أشعر وكأنني في حلقة حقيقية. المعلمة تشرح بوضوح وتجيب على جميع الأسئلة.',
      rating: 4,
      image: 'https://images.pexels.com/photos/8923910/pexels-photo-8923910.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ماذا يقول{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              طلابنا؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            آراء حقيقية من طلابنا الذين حققوا تقدماً ملحوظاً في رحلة تعلم القرآن الكريم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-emerald-600 opacity-50" />
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.content}</p>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < testimonial.rating
                        ? 'text-amber-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ml-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-emerald-100">طالب سعيد</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-emerald-100">معلم معتمد</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-emerald-100 flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-300 fill-current ml-1" />
                تقييم المنصة
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-emerald-100">نسبة الرضا</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;