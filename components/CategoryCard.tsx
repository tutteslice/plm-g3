
import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLinkInfo } from '../types';

interface CategoryCardProps {
  categoryInfo: BrandLinkInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ categoryInfo }) => {
  return (
    <Link to={categoryInfo.path} className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out aspect-video md:aspect-[4/3]">
      <img
        src={categoryInfo.imageUrl}
        alt={categoryInfo.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
        <h3 className="font-poppins text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
          {categoryInfo.name}
        </h3>
        <p className="mt-2 text-sm text-gray-200 drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {categoryInfo.description}
        </p>
        <span className="mt-4 inline-block px-5 py-2 text-xs font-semibold text-primary-text bg-secondary-accent rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out delay-150">
          Shop Now
        </span>
      </div>
    </Link>
  );
};
    