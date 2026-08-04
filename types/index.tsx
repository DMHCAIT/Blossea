export type Category = 'shirts' | 'pants' | 't-shirts' | 'trousers';

export type Collection =
  | 'daily-wear'
  | 'party-wear'
  | 'luxury-collection'
  | 'summer-collection'
  | 'winter-collection'
  | 'festive-collection';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collections: Collection[];
  price: number;
  compareAt?: number;
  currency: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  fabricDetails: string;
  description: string;
  washInstructions: string;
  shippingInfo: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  bestSeller?: boolean;
  newArrival?: boolean;
  trending?: boolean;
  images: string[];
  hoverImage?: string;
}

export interface CategoryInfo {
  slug: Category;
  name: string;
  tagline: string;
  image: string;
}

export interface CollectionInfo {
  slug: Collection;
  name: string;
  tagline: string;
  description: string;
  image: string;
  season: 'summer' | 'winter' | 'festive' | 'all';
}
