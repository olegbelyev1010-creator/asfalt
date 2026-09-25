import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, Calendar, Ruler } from 'lucide-react';
import { portfolio } from '../data/mock';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <Badge className="bg-orange-500/20 text-orange-400 mb-4">Наши работы</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Реализованные проекты
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Более 500 успешно завершенных объектов в Москве и Московской области
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.map((project) => (
            <Card
              key={project.id}
              className="group bg-slate-800 border-slate-700 overflow-hidden hover:border-orange-500 transition-all duration-300"
            >
              {/* Before/After Images */}
              <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
                <Tabs defaultValue="before" className="w-full h-full">
                  <TabsList className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-sm">
                    <TabsTrigger value="before" className="data-[state=active]:bg-orange-500">
                      До
                    </TabsTrigger>
                    <TabsTrigger value="after" className="data-[state=active]:bg-orange-500">
                      После
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="before" className="h-full m-0">
                    <img
                      src={project.beforeImage}
                      alt={`${project.title} - до`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </TabsContent>
                  
                  <TabsContent value="after" className="h-full m-0">
                    <img
                      src={project.afterImage}
                      alt={`${project.title} - после`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </TabsContent>
                </Tabs>
                
                {/* Year Badge */}
                <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                  {project.year}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Ruler className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Площадь: {project.area}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Calendar className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Срок выполнения: {project.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2">500+</div>
            <div className="text-gray-400">Проектов реализовано</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2">250 000+</div>
            <div className="text-gray-400">м² асфальта уложено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2">15</div>
            <div className="text-gray-400">единиц спецтехники</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2">100%</div>
            <div className="text-gray-400">гарантия качества</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
