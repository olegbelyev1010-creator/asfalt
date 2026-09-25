import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <Badge className="bg-orange-100 text-orange-700 mb-4">Отзывы клиентов</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Что говорят о нас наши клиенты
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Более 450 довольных клиентов доверили нам свои проекты
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-orange-500 bg-white relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-0 right-0 text-orange-500/10 text-9xl font-serif leading-none select-none">
                "
              </div>
              
              <CardContent className="p-8 relative">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600">
                    <AvatarFallback className="text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                    <div className="text-xs text-gray-500 mt-1">{testimonial.date}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-8 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl p-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-slate-900">4.9/5.0</div>
                <div className="text-sm text-gray-600">Средняя оценка</div>
              </div>
            </div>
            <div className="w-px h-12 bg-slate-300 hidden md:block"></div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-slate-900">450+</div>
              <div className="text-sm text-gray-600">Довольных клиентов</div>
            </div>
            <div className="w-px h-12 bg-slate-300 hidden md:block"></div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-slate-900">98%</div>
              <div className="text-sm text-gray-600">Рекомендуют нас</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
