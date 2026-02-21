
import React from 'react';
import { RETURNS_POLICY_TEXT } from '../constants';

export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-8">Shipping & Returns</h1>
      <div className="prose prose-lg max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow">
         {RETURNS_POLICY_TEXT.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('Shipping') || paragraph.startsWith('Returns Policy') || paragraph.startsWith('Refunds') || paragraph.startsWith('Non-returnable items:') || paragraph.startsWith('Contact Us')) {
            return <h2 key={index} className="font-poppins text-xl font-semibold mt-6 mb-2">{paragraph.replace(':', '')}</h2>;
          }
           // Basic list item detection
          if (paragraph.trim().startsWith('- ')) {
             return <ul key={index} className="list-disc pl-5"><li className="mb-1">{paragraph.trim().substring(2)}</li></ul>
          }
          return <p key={index} className="mb-4">{paragraph}</p>;
        })}
      </div>
    </div>
  );
};
    