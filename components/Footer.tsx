
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, TAGLINE, SOCIAL_LINKS } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-primary-text border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-poppins text-lg font-bold text-accent">{APP_NAME}</h5>
            <p className="mt-2 text-sm text-gray-600">{TAGLINE}</p>
          </div>
          <div>
            <h5 className="font-poppins text-md font-semibold text-gray-700 tracking-wider uppercase">Quick Links</h5>
            <ul className="mt-4 space-y-2">
              <li><Link to="/shop" className="text-sm text-gray-600 hover:text-accent transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-poppins text-md font-semibold text-gray-700 tracking-wider uppercase">Legal</h5>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/returns-policy" className="text-sm text-gray-600 hover:text-accent transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {SOCIAL_LINKS.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors">
                <span className="sr-only">{social.name}</span>
                <social.Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
    