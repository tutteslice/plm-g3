
export enum ProductCategory {
  PRINTS = "Prints",
  DESIGNS = "Dopamine Designs",
  SECOND_HAND = "Second-Hand Gems",
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  images: string[]; // URLs
  sizes?: string[]; // For clothing
  dimensions?: string; // For prints
  featured?: boolean;
  details?: string; // More detailed description for product page
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string; 
}

export interface SocialLink {
  name: string;
  url: string;
  Icon: React.FC<{ className?: string }>;
}

export interface CategoryLinkInfo {
  name: ProductCategory;
  path: string;
  imageUrl: string;
  description: string;
}
    