import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { calculatorPrices } from '../data/mock';

const Calculator = () => {
  const [serviceType, setServiceType] = useState('courtyard');
  const [area, setArea] = useState('');
  const [totalCost, setTotalCost] = useState(null);

  const serviceOptions = [
    { value: 'courtyard', label: 'Асфальтирование дворов', price: calculatorPrices.courtyard },
    { value: 'road', label: 'Асфальтирование дорог', price: calculatorPrices.road },
    { value: 'territory', label: 'Асфальтирование территорий', price: calculatorPrices.territory },
    { value: 'repair', label: 'Ямочный ремонт', price: calculatorPrices.repair },
    { value: 'tiles', label: 'Укладка тротуарной плитки', price: calculatorPrices.tiles }
  ];

  const calculateCost = () => {
    if (!area || area <= 0) {
      alert('Пожалуйста, введите площадь');
      return;
    }

    const selectedService = serviceOptions.find(s => s.value === serviceType);
    const cost = parseFloat(area) * selectedService.price;
    setTotalCost(cost);
  };

  const resetCalculator = () => {
    setServiceType('courtyard');
    setArea('');
    setTotalCost(null);
  };

  return (
    <section id="calculator" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-700 mb-4">Калькулятор стоимости</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Рассчитайте стоимость работ
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Получите предварительную оценку стоимости за 30 секунд
            </p>
          </div>

          {/* Calculator Card */}
          <Card className="shadow-2xl border-slate-200">
            <CardHeader className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <CalcIcon className="w-6 h-6 text-orange-500" />
                <span>Калькулятор стоимости</span>
              </CardTitle>
              <CardDescription>
                Выберите тип работ и укажите площадь для расчета
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Service Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service-type" className="text-base font-semibold">
                    Тип работ
                  </Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger id="service-type" className="h-12">
                      <SelectValue placeholder="Выберите тип работ" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} - от {option.price} руб/м²
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Area Input */}
                <div className="space-y-2">
                  <Label htmlFor="area" className="text-base font-semibold">
                    Площадь (м²)
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Введите площадь в м²"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="h-12 text-lg"
                    min="1"
                  />
                </div>

                {/* Calculate Button */}
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    onClick={calculateCost}
                    className="w-full md:flex-1 min-w-0 h-12 bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg font-semibold"
                  >
                    <CalcIcon className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  {totalCost !== null && (
                    <Button
                      onClick={resetCalculator}
                      variant="outline"
                      className="w-full md:w-auto h-12 md:px-8"
                    >
                      Сбросить
                    </Button>
                  )}
                </div>

                {/* Result Display */}
                {totalCost !== null && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-orange-700 font-medium mb-1">
                          Предварительная стоимость:
                        </div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 flex items-center">
                          {totalCost.toLocaleString('ru-RU')} ₽
                        </div>
                        <div className="text-sm text-orange-700 mt-2">
                          Площадь: {area} м² × {serviceOptions.find(s => s.value === serviceType)?.price} руб/м²
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-gray-600">
                    <strong>Обратите внимание:</strong> Это предварительный расчет. Точная стоимость определяется после выезда специалиста на объект и зависит от состояния основания, удаленности объекта и других факторов.
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">Хотите получить точный расчет?</p>
                  <Button
                    onClick={() => {
                      const element = document.getElementById('contacts');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    size="lg"
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    Вызвать специалиста для замера
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
