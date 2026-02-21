
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string; // For Link behavior
  className?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  className = '',
  isLoading = false,
  ...props
}) => {
  const baseStyle = "font-poppins font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-accent text-white hover:bg-accent-dark focus:ring-accent';
      break;
    case 'secondary':
      variantStyle = 'bg-secondary-accent text-primary-text hover:bg-yellow-300 focus:ring-secondary-accent';
      break;
    case 'outline':
      variantStyle = 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent';
      break;
    case 'ghost':
      variantStyle = 'text-accent hover:bg-accent/10 focus:ring-accent';
      break;
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-3 py-1.5 text-xs';
      break;
    case 'md':
      sizeStyle = 'px-5 py-2.5 text-sm';
      break;
    case 'lg':
      sizeStyle = 'px-7 py-3 text-base';
      break;
  }

  const combinedClassName = `${baseStyle} ${variantStyle} ${sizeStyle} ${className}`;

  const content = isLoading ? (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ) : (
    children
  );

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClassName} disabled={isLoading || props.disabled} {...props}>
      {content}
    </button>
  );
};
    