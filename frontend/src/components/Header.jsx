import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { companyInfo } from '../data/mock';
import Logo from './Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Logo className="w-48 h-14" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-orange-500 transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-orange-500 transition-colors">
              Портфолио
            </button>
            <button onClick={() => scrollToSection('calculator')} className="text-gray-300 hover:text-orange-500 transition-colors">
              Калькулятор
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-orange-500 transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-gray-300 hover:text-orange-500 transition-colors">
              Контакты
            </button>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href={`tel:${companyInfo.phone}`} className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">{companyInfo.phone}</span>
            </a>
            <Button onClick={() => scrollToSection('contacts')} className="bg-orange-500 hover:bg-orange-600 text-white">
              Заказать звонок
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 py-4">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-orange-500 transition-colors text-left px-4">
                Услуги
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-orange-500 transition-colors text-left px-4">
                Портфолио
              </button>
              <button onClick={() => scrollToSection('calculator')} className="text-gray-300 hover:text-orange-500 transition-colors text-left px-4">
                Калькулятор
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-orange-500 transition-colors text-left px-4">
                Отзывы
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-gray-300 hover:text-orange-500 transition-colors text-left px-4">
                Контакты
              </button>
              <div className="px-4 pt-4 border-t border-slate-800">
                <a href={`tel:${companyInfo.phone}`} className="flex items-center space-x-2 text-white">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{companyInfo.phone}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
