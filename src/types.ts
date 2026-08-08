export type Category = 'All' | 'Jackets' | 'Shoes' | 'Briefcases' | 'Wallets' | 'Bags' | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  details: string[];
  images: string[];
  colors: ProductColor[];
  boutiques: string[]; // e.g. ['paris', 'milan', 'london']
  isFeatured?: boolean;
}

export interface MonogramConfig {
  initials: string;
  finish?: 'blind' | 'gold' | 'silver' | 'debossed';
  placement: string;
  logoFileName?: string;
  customNotes?: string;
  canvasSnapshot?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
  monogram?: MonogramConfig;
}

export interface Boutique {
  id: string;
  name: string;
  city: string;
  address: string;
  district: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  mapImage: string;
  coordinates: { lat: number; lng: number };
}

export interface Review {
  id: string;
  clientName: string;
  location: string;
  rating: number;
  quote: string;
  productName: string;
  verified: boolean;
}

export type ActiveTab = 'home' | 'shop' | 'about' | 'contact';
