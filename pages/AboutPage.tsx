
import React from 'react';
import { ABOUT_US_STORY } from '../constants';

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-16">Our Story</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2 animate-fade-in-left">
          {/* Placeholder for personal photo */}
          <div className="aspect-w-1 aspect-h-1 md:aspect-w-4 md:aspect-h-5 bg-gray-200 rounded-lg shadow-xl overflow-hidden">
            <img 
              src="https://picsum.photos/seed/aboutus/600/750" 
              alt="Dopamine Threads Founder" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2 italic">A glimpse into the vibrant world of Dopamine Threads.</p>
        </div>
        <div className="md:col-span-3 animate-fade-in-right animation-delay-300">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-2xl font-semibold text-accent mb-4 font-raleway">
              More Than Just Threads, It's a Vibe.
            </p>
            {ABOUT_US_STORY.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left { animation: fade-in-left 0.6s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.6s ease-out forwards; }
        .animation-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};
    