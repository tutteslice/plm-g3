import React from 'react';
import { Product, ProductBrand, ProductCategory } from '../types';
import { ChevronDownIcon } from './Icons';

interface FilterSortControlsProps {
  products: Product[];
  brands: ProductBrand[];
  selectedBrand: ProductBrand | 'All';
  onBrandChange: (brand: ProductBrand | 'All') => void;
  categories: ProductCategory[];
  selectedCategory: ProductCategory | 'All';
  onCategoryChange: (category: ProductCategory | 'All') => void;
  collections: string[];
  selectedCollection: string;
  onCollectionChange: (collection: string) => void;
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  seasons: string[];
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  sortOption: string;
  onSortChange: (sortOption: string) => void;
}

export const FilterSortControls: React.FC<FilterSortControlsProps> = ({
  products,
  brands,
  selectedBrand,
  onBrandChange,
  categories,
  selectedCategory,
  onCategoryChange,
  collections,
  selectedCollection,
  onCollectionChange,
  types,
  selectedType,
  onTypeChange,
  seasons,
  selectedSeason,
  onSeasonChange,
  sortOption,
  onSortChange,
}) => {
  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'featured', label: 'Featured' },
  ];

  const getBrandCount = (brand: string) => {
    return products.filter(p => 
      p.brand === brand &&
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (selectedCollection === 'All' || p.collection === selectedCollection) &&
      (selectedType === 'All' || p.type === selectedType) &&
      (selectedSeason === 'All' || p.season === selectedSeason)
    ).length;
  };

  const getCategoryCount = (category: string) => {
    return products.filter(p => 
      (selectedBrand === 'All' || p.brand === selectedBrand) &&
      p.category === category &&
      (selectedCollection === 'All' || p.collection === selectedCollection) &&
      (selectedType === 'All' || p.type === selectedType) &&
      (selectedSeason === 'All' || p.season === selectedSeason)
    ).length;
  };

  const getCollectionCount = (collection: string) => {
    return products.filter(p => 
      (selectedBrand === 'All' || p.brand === selectedBrand) &&
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      p.collection === collection &&
      (selectedType === 'All' || p.type === selectedType) &&
      (selectedSeason === 'All' || p.season === selectedSeason)
    ).length;
  };

  const getTypeCount = (type: string) => {
    return products.filter(p => 
      (selectedBrand === 'All' || p.brand === selectedBrand) &&
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (selectedCollection === 'All' || p.collection === selectedCollection) &&
      p.type === type &&
      (selectedSeason === 'All' || p.season === selectedSeason)
    ).length;
  };

  const getSeasonCount = (season: string) => {
    return products.filter(p => 
      (selectedBrand === 'All' || p.brand === selectedBrand) &&
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (selectedCollection === 'All' || p.collection === selectedCollection) &&
      (selectedType === 'All' || p.type === selectedType) &&
      p.season === season
    ).length;
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Brand
          </label>
          <div className="relative">
            <select
              id="brand-filter"
              value={selectedBrand}
              onChange={(e) => onBrandChange(e.target.value as ProductBrand | 'All')}
              className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md appearance-none"
            >
              <option value="All">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand} ({getBrandCount(brand)})
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <div className="relative">
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as ProductCategory | 'All')}
              className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md appearance-none"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({getCategoryCount(cat)})
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        {collections.length > 0 && (
          <div>
            <label htmlFor="collection-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Collection
            </label>
            <div className="relative">
              <select
                id="collection-filter"
                value={selectedCollection}
                onChange={(e) => onCollectionChange(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md appearance-none"
              >
                <option value="All">All Collections</option>
                {collections.map((col) => (
                  <option key={col} value={col}>
                    {col} ({getCollectionCount(col)})
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {types.length > 0 && (
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Type
            </label>
            <div className="relative">
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md appearance-none"
              >
                <option value="All">All Types</option>
                {types.map((typ) => (
                  <option key={typ} value={typ}>
                    {typ} ({getTypeCount(typ)})
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {seasons.length > 0 && (
          <div>
            <label htmlFor="season-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Season
            </label>
            <div className="relative">
              <select
                id="season-filter"
                value={selectedSeason}
                onChange={(e) => onSeasonChange(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md appearance-none"
              >
                <option value="All">All Seasons</option>
                {seasons.map((sea) => (
                  <option key={sea} value={sea}>
                    {sea} ({getSeasonCount(sea)})
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="sort-options" className="block text-sm font-medium text-gray-700 mb-1">
            Sort by
          </label>
          <div className="relative">
            <select
              id="sort-options"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md appearance-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
             <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};