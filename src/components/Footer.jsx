import React from 'react';
import { Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-sm p-4 mt-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center text-inherit/80 text-sm">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
          <p>
            جميع الحقوق محفوظة للأستاذ علاء فريد © 2025
          </p>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href="tel:01009209003" className="hover:text-cyan-400 transition-colors" dir="ltr">
              للتواصل: 01009209003
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
