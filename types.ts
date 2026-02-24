import React from 'react';

export enum ProductBrand {
  PRINTS = "Prints",
  DESIGNS = "PLM™ Designs",
  SECOND_HAND = "Second-Hand Gems",
}

export enum ProductCategory {
  UNDERWEAR = "Underwear",
  SWIMWEAR = "Swimwear",
  ACTIVEWEAR = "Activewear",
  HEADWEAR = "Headwear",
  ACCESSORIES = "Accessories",
  TOPS = "Tops",
  BOTTOMS = "Bottoms",
}

export interface Product {
  id: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  price: number;
  description: string;
  images: string[]; // URLs
  dimensions?: string; // For prints
  featured?: boolean;
  details?: string; // More detailed description for product page
  size?: string; // Informational size (e.g., "S")
  collection?: string; // Collection name (e.g., "To the peak, not the precinct.")
  type?: string; // e.g., "Overall", "Tracksuit", "Bikini"
  season?: string; // e.g., "Summer", "All Season", "Winter"
  availableSizes?: string[]; // Selectable sizes
  availableColors?: string[]; // Selectable colors
  modelInfo?: string; // Informational model details (e.g., "Model is 180cm / 55kg")
  relatedProductIds?: string[]; // IDs of products to show as related
}

export interface CartItem extends Product {
  cartItemId: string; // Unique ID for cart item with options
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  hiddenPocket?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  Icon: React.FC<{ className?: string }>;
}

export interface BrandLinkInfo {
  name: ProductBrand;
  path: string;
  imageUrl: string;
  description: string;
}
    