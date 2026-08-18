export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  flashDiscountPercent?: number;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  tags: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
}

export interface CartItem {
  id: string; // Unique combination of product id + color + size
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
  productImage: string;
  helpfulCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
  tag: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
  image?: string;
}

export interface LookbookHotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  productId: string;
  title: string;
  price: number;
  image: string;
}
