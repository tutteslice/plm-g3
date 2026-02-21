
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { FilterSortControls } from '../components/FilterSortControls';
import { sampleProducts } from '../data/products';
import { Product, ProductCategory } from '../types';

const getCategories = (products: Product[]): ProductCategory[] => {
  const uniqueCategories = new Set<ProductCategory>();
  products.forEach(product => uniqueCategories.add(product.category));
  return Array.from(uniqueCategories);
};

export const ShopPage: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params for sort
  const queryParams = new URLSearchParams(location.search);
  const initialSortOption = queryParams.get('sort') || 'featured';
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(
    urlCategory ? decodeURIComponent(urlCategory) as ProductCategory : 'All'
  );
  const [sortOption, setSortOption] = useState<string>(initialSortOption);

  const availableCategories = useMemo(() => getCategories(sampleProducts), []);

  useEffect(() => {
    const newCategory = urlCategory ? decodeURIComponent(urlCategory) as ProductCategory : 'All';
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategory]);


  const handleCategoryChange = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
    if (category === 'All') {
      navigate(`/shop${sortOption !== 'featured' ? `?sort=${sortOption}` : ''}`);
    } else {
      navigate(`/shop/${encodeURIComponent(category)}${sortOption !== 'featured' ? `?sort=${sortOption}` : ''}`);
    }
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    const path = selectedCategory === 'All' ? '/shop' : `/shop/${encodeURIComponent(selectedCategory)}`;
    if (newSortOption !== 'featured') {
      navigate(`${path}?sort=${newSortOption}`);
    } else {
      navigate(path);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? sampleProducts
      : sampleProducts.filter(p => p.category === selectedCategory);

    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        // Show featured items first, then by some default (e.g., name)
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name); // Default fallback sort
        });
        break;
    }
    return filtered;
  }, [selectedCategory, sortOption]);

  return (
    <div className="container mx-auto">
      <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-8">
        {selectedCategory === 'All' ? 'All Products' : selectedCategory}
      </h1>

      <FilterSortControls
        categories={availableCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">No products found matching your criteria.</p>
          <img src="https://picsum.photos/seed/noproducts/300/200" alt="No products found" className="mx-auto opacity-70 rounded-lg" />
        </div>
      )}
    </div>
  );
};
    