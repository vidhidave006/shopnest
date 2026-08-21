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

export type OrderStatus =
  | "confirmed"
  | "processing"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "shipped"
  | "pending"
  | "cancelled";

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  image: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Order {
  id: string;
  orderNumber?: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  customer?: OrderCustomer;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  shippingMethod?: string;
  paymentMethod: string;
  paymentStatus?: 'paid' | 'pending' | 'failed';
  trackingNumber: string;
  estimatedDelivery?: string;
  timeline?: TrackingStep[];
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  isActive: boolean;
  usageCount: number;
  minSpend?: number;
  description?: string;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
