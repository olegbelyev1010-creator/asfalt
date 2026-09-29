import React from 'react';
import { ClipboardList, MapPin, FileCheck2, Construction } from 'lucide-react';
import { Badge } from './ui/badge';

const steps = [
  {
    icon: ClipboardList,
    title: 'Заявка',
    description: 'Вы оставляете телефон или пишете нам удобным способом.'
  },
  {
    icon: MapPin,
    title: 'Выезд на объект',
    description: 'Специалист уточняет объём работ, площадь и состояние основания.'
  },
  {
    icon: FileCheck2,
    title: 'Расчёт и смета',
    description: 'Согласовываем состав работ, материалы, сроки и стоимость.'
  },
  {
    icon: Construction,
    title: 'Выполнение работ',
    description: 'Бригада выполняет работы и передаёт готовый объект с гарантией.'
  }
];

const Process = () => (
  <section className="py-12 sm:py-16 md:py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8 sm:mb-12">
        <Badge className="bg-orange-100 text-orange-700 mb-4">Как работаем</Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Понятный процесс от заявки до готового объекта
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Берём на себя расчёт, организацию работ и контроль результата.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <div key={title} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-orange-600">0{index + 1}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
