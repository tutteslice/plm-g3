import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { FilterSortControls } from '../components/FilterSortControls';
import { useProducts } from '../hooks/useProducts';
import { Product, ProductBrand, ProductCategory } from '../types';

const getBrands = (products: Product[]): ProductBrand[] => {
  const uniqueBrands = new Set<ProductBrand>();
  products.forEach(product => uniqueBrands.add(product.brand));
  return Array.from(uniqueBrands);
};

const getCategories = (products: Product[]): ProductCategory[] => {
  const uniqueCategories = new Set<ProductCategory>();
  products.forEach(product => uniqueCategories.add(product.category));
  return Array.from(uniqueCategories);
};

const getCollections = (products: Product[]): string[] => {
  const uniqueCollections = new Set<string>();
  products.forEach(product => {
    if (product.collection) uniqueCollections.add(product.collection);
  });
  return Array.from(uniqueCollections);
};

const getTypes = (products: Product[]): string[] => {
  const uniqueTypes = new Set<string>();
  products.forEach(product => {
    if (product.type) uniqueTypes.add(product.type);
  });
  return Array.from(uniqueTypes).sort();
};

const getSeasons = (products: Product[]): string[] => {
  const uniqueSeasons = new Set<string>();
  products.forEach(product => {
    if (product.season) uniqueSeasons.add(product.season);
  });
  return Array.from(uniqueSeasons).sort();
};

export const ShopPage: React.FC = () => {
  const { brand: urlBrand } = useParams<{ brand?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = useProducts();

  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const initialSortOption = queryParams.get('sort') || 'featured';
  const initialCategoryOption = queryParams.get('category') || 'All';
  const initialCollectionOption = queryParams.get('collection') || 'All';
  const initialTypeOption = queryParams.get('type') || 'All';
  const initialSeasonOption = queryParams.get('season') || 'All';
  
  const [selectedBrand, setSelectedBrand] = useState<ProductBrand | 'All'>(
    urlBrand ? decodeURIComponent(urlBrand) as ProductBrand : 'All'
  );
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(
    initialCategoryOption as ProductCategory | 'All'
  );
  const [sortOption, setSortOption] = useState<string>(initialSortOption);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollectionOption);
  const [selectedType, setSelectedType] = useState<string>(initialTypeOption);
  const [selectedSeason, setSelectedSeason] = useState<string>(initialSeasonOption);

  const availableBrands = useMemo(() => getBrands(products), [products]);
  const availableCategories = useMemo(() => getCategories(products), [products]);
  const availableCollections = useMemo(() => getCollections(products), [products]);
  const availableTypes = useMemo(() => getTypes(products), [products]);
  const availableSeasons = useMemo(() => getSeasons(products), [products]);

  useEffect(() => {
    const newBrand = urlBrand ? decodeURIComponent(urlBrand) as ProductBrand : 'All';
    if (newBrand !== selectedBrand) {
      setSelectedBrand(newBrand);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlBrand]);

  // SEO: Dynamically update page title based on filters
  useEffect(() => {
    let titleParts = ['Shop'];
    if (selectedBrand !== 'All') titleParts.push(selectedBrand);
    if (selectedCategory !== 'All') titleParts.push(selectedCategory);
    if (selectedCollection !== 'All') titleParts.push(`"${selectedCollection}"`);
    
    document.title = `${titleParts.join(' - ')} | Private Lives Matter`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", `Shop ${selectedBrand !== 'All' ? selectedBrand : 'our'} festival and rave wear collection. Find the perfect ${selectedCategory !== 'All' ? selectedCategory.toLowerCase() : 'gear'} with discreet hidden pockets.`);
    }
  }, [selectedBrand, selectedCategory, selectedCollection]);

  const updateUrl = (brnd: ProductBrand | 'All', cat: ProductCategory | 'All', sort: string, col: string, typ: string, sea: string) => {
    const path = brnd === 'All' ? '/shop' : `/shop/${encodeURIComponent(brnd)}`;
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    if (sort !== 'featured') params.set('sort', sort);
    if (col !== 'All') params.set('collection', col);
    if (typ !== 'All') params.set('type', typ);
    if (sea !== 'All') params.set('season', sea);
    const search = params.toString();
    navigate(`${path}${search ? `?${search}` : ''}`);
  };

  const handleBrandChange = (brand: ProductBrand | 'All') => {
    setSelectedBrand(brand);
    updateUrl(brand, selectedCategory, sortOption, selectedCollection, selectedType, selectedSeason);
  };

  const handleCategoryChange = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
    updateUrl(selectedBrand, category, sortOption, selectedCollection, selectedType, selectedSeason);
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    updateUrl(selectedBrand, selectedCategory, newSortOption, selectedCollection, selectedType, selectedSeason);
  };

  const handleCollectionChange = (newCollection: string) => {
    setSelectedCollection(newCollection);
    updateUrl(selectedBrand, selectedCategory, sortOption, newCollection, selectedType, selectedSeason);
  };

  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    updateUrl(selectedBrand, selectedCategory, sortOption, selectedCollection, newType, selectedSeason);
  };

  const handleSeasonChange = (newSeason: string) => {
    setSelectedSeason(newSeason);
    updateUrl(selectedBrand, selectedCategory, sortOption, selectedCollection, selectedType, newSeason);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedCollection !== 'All') {
      filtered = filtered.filter(p => p.collection === selectedCollection);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedSeason !== 'All') {
      filtered = filtered.filter(p => p.season === selectedSeason);
    }

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
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }
    return filtered;
  }, [selectedBrand, selectedCategory, sortOption, selectedCollection, selectedType, selectedSeason, products]);

  return (
    <div className="container mx-auto">
      <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-8">
        {selectedBrand === 'All' ? 'All Products' : selectedBrand}
      </h1>

      <FilterSortControls
        products={products}
        brands={availableBrands}
        selectedBrand={selectedBrand}
        onBrandChange={handleBrandChange}
        categories={availableCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        collections={availableCollections}
        selectedCollection={selectedCollection}
        onCollectionChange={handleCollectionChange}
        types={availableTypes}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        seasons={availableSeasons}
        selectedSeason={selectedSeason}
        onSeasonChange={handleSeasonChange}
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