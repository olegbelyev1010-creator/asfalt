import React, { useState } from 'react';
import { Phone, MessageCircle, Send, X } from 'lucide-react';
import { companyInfo } from '../data/mock';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      id: 'phone',
      icon: Phone,
      label: 'Позвонить',
      href: `tel:+${companyInfo.phoneRaw}`,
      bgColor: 'bg-orange-500 hover:bg-orange-600',
      delay: 'delay-75'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/${companyInfo.whatsapp}`,
      bgColor: 'bg-green-500 hover:bg-green-600',
      delay: 'delay-100'
    },
    {
      id: 'telegram',
      icon: Send,
      label: 'Telegram',
      href: `https://t.me/${companyInfo.telegram}`,
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      delay: 'delay-150'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Contact Buttons */}
      <div className={`flex flex-col items-end space-y-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <div
              key={contact.id}
              className={`flex items-center space-x-3 transition-all duration-300 ${contact.delay} ${isOpen ? 'translate-x-0' : 'translate-x-20'}`}
            >
              {/* Label */}
              <div className="bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {contact.label}
              </div>
              
              {/* Button */}
              <a
                href={contact.href}
                target={contact.id !== 'phone' ? '_blank' : undefined}
                rel={contact.id !== 'phone' ? 'noopener noreferrer' : undefined}
                className={`group relative w-14 h-14 ${contact.bgColor} rounded-full shadow-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
                
                {/* Ripple effect */}
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                
                {/* Tooltip */}
                <span className="absolute right-16 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {contact.label}
                </span>
              </a>
            </div>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 group relative"
        aria-label={isOpen ? 'Закрыть меню контактов' : 'Открыть меню контактов'}
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></span>
        
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-7 h-7 text-white transition-transform duration-300 rotate-90" />
          ) : (
            <Phone className="w-7 h-7 text-white transition-transform duration-300 animate-bounce" />
          )}
        </div>

        {/* Tooltip */}
        <span className="absolute right-20 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Связаться с нами
        </span>
      </button>

      {/* Badge with phone number */}
      {!isOpen && (
        <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
          Онлайн
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;
