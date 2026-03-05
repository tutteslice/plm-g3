
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { APP_NAME } from '../constants';
import { CartIcon, MenuIcon, XIcon } from './Icons'; // Assuming XIcon for close

const Logo: React.FC = () => (
  <Link to="/" className="text-2xl md:text-3xl font-poppins font-bold tracking-tight text-accent">
    {APP_NAME}
  </Link>
);

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `font-raleway font-semibold px-3 py-2 rounded-md text-sm hover:text-accent transition-colors duration-200 ${
        isActive ? 'text-accent' : 'text-primary-text'
      }`
    }
  >
    {children}
  </NavLink>
);

export const Header: React.FC = () => {
  const { itemCount, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/media', label: 'Media' },
    { path: '/tools', label: 'Tools' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary/80 backdrop-blur-md shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <nav className="hidden md:flex space-x-4">
            {navLinks.map(link => (
              <NavItem key={link.path} to={link.path}>{link.label}</NavItem>
            ))}
          </nav>
          <div className="flex items-center">
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full text-primary-text hover:text-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
              aria-label="Open cart"
            >
              <CartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary-accent text-primary-text text-xs flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-primary-text hover:text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary shadow-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
               <NavItem key={link.path} to={link.path} onClick={closeMobileMenu}>{link.label}</NavItem>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
    