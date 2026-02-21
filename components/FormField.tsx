import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  isTextArea?: boolean;
  error?: string;
  className?: string; // Added for the wrapper div
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  isTextArea = false,
  error,
  className = '', // Added, with default
}) => {
  const commonInputClassName = `mt-1 block w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm transition-colors`;

  const inputProps = {
    id,
    value,
    onChange,
    placeholder,
    required,
    className: commonInputClassName,
  };

  return (
    <div className={className}> {/* Use the passed className here */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {isTextArea ? (
        <textarea {...inputProps} rows={4} />
      ) : (
        <input type={type} {...inputProps} />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};