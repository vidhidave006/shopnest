"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Product,
  CartItem,
  CustomerReview,
  Order,
  PromoCode,
  ToastNotification,
  Currency,
  OrderStatus,
} from "@/types/shop";
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  REVIEWS as DEFAULT_REVIEWS,
  ORDERS as DEFAULT_ORDERS,
  PROMO_CODES as DEFAULT_PROMOS,
} from "@/data/products";

type Theme = "dark" | "light";

export const CURRENCY_RATES: Record<
  Currency,
  { symbol: string; rate: number; label: string }
> = {
  INR: { symbol: "₹", rate: 83.2, label: "INR (₹ - Indian Rupee)" },
  USD: { symbol: "$", rate: 1.0, label: "USD ($ - US Dollar)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€ - Euro)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£ - British Pound)" },
};

function createDefaultOrder(): Order {
  return {
    id: "SN-982410",
    orderNumber: "SN-982410",
    customerName: "Aarav Sharma",
    customerEmail: "patron@cherry.in",
    customerPhone: "+91 98201 44821",
    shippingAddress: "42 Altamount Road, Cumballa Hill, Mumbai, Maharashtra 400026",
    date: new Date(Date.now() - 3600 * 1000 * 24).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: "in_transit",
    trackingNumber: "BD-IN-9842019",
    estimatedDelivery: "Tomorrow, by 7:00 PM",
    customer: {
      fullName: "Aarav Sharma",
      email: "patron@cherry.in",
      phone: "+91 98201 44821",
      address: "42 Altamount Road, Cumballa Hill",
      city: "Mumbai",
      postalCode: "400026",
      country: "India",
    },
    shippingMethod: "BlueDart Priority Carbon-Neutral Express",
    paymentMethod: "Razorpay / UPI Platinum",
    paymentStatus: "paid",
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        name: "Aura Studio Pro Wireless ANC Headphones",
        price: 23999.00,
        quantity: 1,
        selectedColor: "Matte Black",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "item-2",
        productId: "prod-2",
        name: "Lumina Apex Smartwatch Ultra (Titanium Edition)",
        price: 399,
        quantity: 1,
        selectedColor: "Titanium Silver",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      },
    ],
<<<<<<< HEAD
    subtotal: 23999.00,
    discount: 0,
    shipping: 0,
    tax: 1679.93,
    total: 25678.93,
=======
    subtotal: 688,
    discount: 137.6,
    shipping: 0,
    tax: 99.07,
    total: 649.47,
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
    timeline: [
      {
        status: "confirmed",
        label: "Acquisition Verified & Encrypted Settlement",
        date: "Today, 09:14 AM",
        completed: true,
        current: false,
      },
      {
        status: "processing",
        label: "Bespoke Cleanroom Inspection & Sugarcane Packaging",
        date: "Today, 11:30 AM",
        completed: true,
        current: false,
      },
      {
        status: "in_transit",
        label: "Priority BlueDart Air Transit // Bengaluru Hub",
        date: "Today, 02:45 PM",
        completed: true,
        current: true,
      },
      {
        status: "out_for_delivery",
<<<<<<< HEAD
        label: "Out for Courier Dispatch",
        date: "Tomorrow Morning",
=======
        label: "Dispatched with Priority White-Glove Courier",
        date: "Pending Dispatch",
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
        completed: false,
        current: false,
      },
      {
        status: "delivered",
<<<<<<< HEAD
        label: "Delivered to Customer Doorstep",
        date: "Tomorrow by 7 PM",
=======
        label: "Hand-Delivered to Patron",
        date: "Est. Tomorrow",
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
        completed: false,
        current: false,
      },
    ],
  };
}

interface ShopContextType {
<<<<<<< HEAD
  // Product Catalog
  products: Product[];
  addProduct: (product: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
=======
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;

  // Cart
  cart: CartItem[];
<<<<<<< HEAD
  addToCart: (
    product: Product,
    arg2?: string | number,
    arg3?: string | number,
    arg4?: string | number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
=======
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus, trackingNumber?: string) => void;
  deleteOrder: (id: string) => void;

  // Promo Codes
  promoCodes: PromoCode[];
  addPromoCode: (promo: Omit<PromoCode, "id" | "usageCount">) => PromoCode;
  togglePromoCode: (id: string) => void;
  deletePromoCode: (id: string) => void;
  appliedCoupon: { code: string; discountPercent: number; isFreeShipping?: boolean } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Reviews
  reviews: CustomerReview[];
  addReview?: (review: Omit<CustomerReview, "id" | "date" | "helpfulCount">) => void;
  deleteReview: (id: string) => void;
  toggleReviewVerified: (id: string) => void;

  // Toast Notifications
  toasts: ToastNotification[];
  addToast: (
    title: string,
    message: string,
    type?: "success" | "info" | "error",
    image?: string
  ) => void;
  removeToast: (id: string) => void;

  // Currency & Formatter
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;

  // Search & Categories
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Theme
  theme: Theme;
  toggleTheme: () => void;
  resetToDefaultData: () => void;

  // Checkout & Tracking
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  placedOrders: Order[];
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  placeOrder: (
    orderData: Omit<
      Order,
      "id" | "date" | "status" | "trackingNumber" | "estimatedDelivery" | "timeline"
    >
  ) => Order;
  trackOrderByNumber: (trackingOrId: string) => Order | null;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // Theme state: default dark luxury black & white
  const [theme, setTheme] = useState<Theme>("dark");

  // Products state (synchronized with localStorage)
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Quick View state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Admin / Store state
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(DEFAULT_PROMOS);
  const [reviews, setReviews] = useState<CustomerReview[]>(DEFAULT_REVIEWS);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    isFreeShipping?: boolean;
  } | null>(null);

  // Modals & Tracking state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

<<<<<<< HEAD
  // Sync theme with document element
=======
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Currency
  const [currency, setCurrencyState] = useState<Currency>("INR");

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Hydrate state from localStorage
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("shopnest_theme") as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } else {
        document.documentElement.classList.add("dark");
      }
<<<<<<< HEAD
    } catch {}
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      try {
        localStorage.setItem("shopnest_theme", nextTheme);
      } catch {}
      return nextTheme;
    });
  };

  // Set Currency wrapper with localStorage persistence
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem("shopnest_currency", newCurrency);
    } catch {}
  };

  // Load initial data from localStorage on client mount
  useEffect(() => {
    try {
=======

>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
      const savedCurrency = localStorage.getItem("shopnest_currency") as Currency;
      if (savedCurrency && CURRENCY_RATES[savedCurrency]) {
        setCurrencyState(savedCurrency);
      }

      const savedCart = localStorage.getItem("shopnest_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("shopnest_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedProducts = localStorage.getItem("shopnest_products");
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedOrders = localStorage.getItem("shopnest_orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        setOrders(parsed);
        setPlacedOrders(parsed);
      } else {
        const demoOrder = createDefaultOrder();
        setPlacedOrders([demoOrder]);
        setOrders([demoOrder, ...DEFAULT_ORDERS]);
      }

      const savedPromos = localStorage.getItem("shopnest_promos");
      if (savedPromos) setPromoCodes(JSON.parse(savedPromos));

      const savedReviews = localStorage.getItem("shopnest_reviews");
<<<<<<< HEAD
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }

      const savedCart = localStorage.getItem("shopnest_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist = localStorage.getItem("shopnest_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {}
=======
      if (savedReviews) setReviews(JSON.parse(savedReviews));
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  }, []);

  // Sync back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("shopnest_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

<<<<<<< HEAD
  // Product CRUD actions (Admin)
  const addProduct = (newProductData: Omit<Product, "id"> & { id?: string }): Product => {
    const id = newProductData.id || `prod-${Date.now()}`;
    const product: Product = {
      ...newProductData,
      id,
    };
    setProducts((prev) => [product, ...prev]);
    addToast("Product Created", `${product.name} has been added to the catalog.`, "success");
    return product;
=======
  useEffect(() => {
    try {
      localStorage.setItem("shopnest_products", JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_orders", JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_promos", JSON.stringify(promoCodes));
    } catch (e) {}
  }, [promoCodes]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_reviews", JSON.stringify(reviews));
    } catch (e) {}
  }, [reviews]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("shopnest_currency", c);
    } catch (e) {}
    addToast("Currency Changed", `Displaying prices in ${c}`, "info");
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("shopnest_theme", next);
    } catch (e) {}
  };

  const resetToDefaultData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setOrders(DEFAULT_ORDERS);
    setPromoCodes(DEFAULT_PROMOS);
    setReviews(DEFAULT_REVIEWS);
    const demo = createDefaultOrder();
    setPlacedOrders([demo]);
    try {
      localStorage.removeItem("shopnest_products");
      localStorage.removeItem("shopnest_orders");
      localStorage.removeItem("shopnest_promos");
      localStorage.removeItem("shopnest_reviews");
    } catch (e) {}
    addToast("Catalog Restored", "All products and records have been reset.", "info");
  };

  const addToast = (
    title: string,
    message: string,
    type: "success" | "info" | "error" = "info",
    image?: string
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastNotification = { id, title, message, type, image };
    setToasts((prev) => [newToast, ...prev].slice(0, 4));
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const color = selectedColor || product.colors?.[0]?.name || "Standard";
    const size = selectedSize || product.sizes?.[0] || "";
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          selectedColor: color,
          selectedSize: size,
        },
      ];
    });

    addToast(
      "Added to Cart",
      `${quantity}x ${product.name} added.`,
      "success",
      product.images[0]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast("Object Removed", "Item removed from cart.", "info");
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast("Wishlist Updated", `${product.name} removed.`, "info");
        return prev.filter((p) => p.id !== product.id);
      } else {
        addToast(
          "Saved to Wishlist",
          `${product.name} saved.`,
          "success",
          product.images[0]
        );
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Quick View
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Product Admin Operations
  const addProduct = (productData: Omit<Product, "id">): Product => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = { ...productData, id: newId };
    setProducts((prev) => [newProduct, ...prev]);
    addToast("Product Created", `${newProduct.name} added to catalog.`, "success");
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast("Product Updated", "Catalog updated successfully.", "success");
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast("Product Deleted", "Item removed from catalog.", "info");
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stockCount: Math.max(0, newStock), inStock: newStock > 0 }
          : p
      )
    );
  };

<<<<<<< HEAD
  // Cart actions
  const addToCart = (
    product: Product,
    arg2?: string | number,
    arg3?: string | number,
    arg4?: string | number
  ) => {
    let qty = 1;
    let selectedColor = product.colors[0]?.name;
    let selectedSize = product.sizes ? product.sizes[0] : undefined;

    if (typeof arg2 === "number") {
      qty = arg2;
      if (typeof arg3 === "string") selectedColor = arg3;
      if (typeof arg4 === "string") selectedSize = arg4;
    } else if (typeof arg2 === "string") {
      selectedColor = arg2;
      if (typeof arg3 === "string") selectedSize = arg3;
      if (typeof arg3 === "number") qty = arg3;
      if (typeof arg4 === "number") qty = arg4;
    }

    const cartItemId = `${product.id}-${selectedColor || "default"}-${selectedSize || "default"}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity: qty,
          selectedColor,
          selectedSize,
        },
      ];
    });

    addToast(
      "Item Added to Cart",
      `${product.name} (${selectedColor || "Standard"}${selectedSize ? ` - ${selectedSize}` : ""})`,
      "success",
      product.images[0]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === itemId);
      if (item) {
        addToast("Item Removed", `${item.product.name} removed from your cart.`, "info");
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Wishlist actions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast("Removed from Wishlist", product.name, "info", product.images[0]);
        return prev.filter((p) => p.id !== product.id);
      } else {
        addToast("Saved to Wishlist", product.name, "success", product.images[0]);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Quick View actions
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Order actions (Admin)
  const addOrder = (newOrderData: Omit<Order, "id" | "date">): Order => {
    const id = `SN-${Math.floor(10000 + Math.random() * 90000)}`;
    const date = new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const order: Order = {
      ...newOrderData,
      id,
      date,
    };
    setOrders((prev) => [order, ...prev]);
    addToast("Order Logged", `Order #${id} added to the system.`, "success");
    return order;
=======
  // Order Admin Operations
  const addOrder = (orderData: Omit<Order, "id" | "date">): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: `SN-${randomNum}`,
      orderNumber: `SN-${randomNum}`,
      date: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: orderData.status || "confirmed",
      trackingNumber: orderData.trackingNumber || `BD-IN-${randomNum + 420}`,
      estimatedDelivery: orderData.estimatedDelivery || "Within 2-3 Business Days",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setPlacedOrders((prev) => [newOrder, ...prev]);
    return newOrder;
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  };

  const updateOrderStatus = (
    id: string,
    status: OrderStatus,
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status,
              ...(trackingNumber ? { trackingNumber } : {}),
            }
          : o
      )
    );
    setPlacedOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status,
              ...(trackingNumber ? { trackingNumber } : {}),
            }
          : o
      )
    );
<<<<<<< HEAD
    addToast("Status Updated", `Order #${id} marked as ${status.replace("_", " ").toUpperCase()}.`, "info");
=======
    addToast("Order Updated", `Order ${id} marked as ${status}.`, "success");
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
<<<<<<< HEAD
    addToast("Order Removed", `Order record #${id} has been removed.`, "info");
  };

  // Promo Code actions (Admin)
  const addPromoCode = (
    newPromoData: Omit<PromoCode, "id" | "usageCount">
  ): PromoCode => {
    const id = `promo-${Date.now()}`;
    const promo: PromoCode = {
      ...newPromoData,
      id,
      code: newPromoData.code.toUpperCase().trim(),
      usageCount: 0,
    };
    setPromoCodes((prev) => [promo, ...prev]);
    addToast("Coupon Created", `Coupon "${promo.code}" created successfully.`, "success");
    return promo;
=======
    setPlacedOrders((prev) => prev.filter((o) => o.id !== id));
    addToast("Order Deleted", `Order ${id} removed.`, "info");
  };

  // Promo Code Operations
  const addPromoCode = (promoData: Omit<PromoCode, "id" | "usageCount">): PromoCode => {
    const newPromo: PromoCode = {
      ...promoData,
      id: `promo-${Date.now()}`,
      usageCount: 0,
    };
    setPromoCodes((prev) => [newPromo, ...prev]);
    addToast("Promo Created", `Code ${newPromo.code} created.`, "success");
    return newPromo;
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    addToast("Coupon Updated", "Promo code availability status updated.", "info");
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== id));
<<<<<<< HEAD
    addToast("Coupon Deleted", "Promo code removed from the database.", "info");
  };

  // Review actions (Admin & Frontend)
  const addReview = (
    newReviewData: Omit<CustomerReview, "id" | "date" | "helpfulCount">
  ) => {
    const id = `rev-${Date.now()}`;
    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const review: CustomerReview = {
      ...newReviewData,
      id,
      date,
      helpfulCount: 0,
    };
    setReviews((prev) => [review, ...prev]);
    addToast("Review Submitted", "Thank you for sharing your experience.", "success");
=======
    addToast("Promo Removed", "Code removed.", "info");
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  };

  // Reviews Operations
  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
<<<<<<< HEAD
    addToast("Review Removed", "Review record has been deleted.", "info");
=======
    addToast("Review Deleted", "Review removed.", "info");
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
  };

  const toggleReviewVerified = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verified: !r.verified } : r))
    );
  };

<<<<<<< HEAD
  // Toast actions
  const addToast = (
    title: string,
    message: string,
    type: "success" | "info" | "error" = "success",
    image?: string
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastNotification = { id, title, message, type, image };

    setToasts((prev) => [...prev.slice(-4), newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency Converter & Formatter
  const formatPrice = (amountInINR: number): string => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    const converted = amountInINR * rateInfo.rate;

    if (currency === "INR") {
      return `₹${Math.round(converted).toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
=======
  const addReview = (reviewData: Omit<CustomerReview, "id" | "date" | "helpfulCount">) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: "Just now",
      helpfulCount: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
    addToast("Review Submitted", "Thank you for your review.", "success");
  };

  // Price Formatter based on USD catalog price
  const formatPrice = (amountInUSD: number): string => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    const converted = amountInUSD * rateInfo.rate;

    if (currency === "INR") {
      return `${rateInfo.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
    }
    return `${rateInfo.symbol}${converted.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = promoCodes.find((p) => p.code === cleanCode);

    if (found) {
      if (!found.isActive) {
        return { success: false, message: `Promo code ${cleanCode} is expired or inactive.` };
      }
      if (found.minSpend && cartSubtotal < found.minSpend) {
        return {
          success: false,
          message: `Minimum order of ${formatPrice(found.minSpend)} required for code ${cleanCode}.`,
        };
      }
      setAppliedCoupon({ code: cleanCode, discountPercent: found.discountPercent });
      setPromoCodes((prev) =>
        prev.map((p) => (p.id === found.id ? { ...p, usageCount: p.usageCount + 1 } : p))
      );
      addToast(
        "Code Applied",
        `Code ${cleanCode} applied: ${found.discountPercent}% discount.`,
        "success"
      );
      return { success: true, message: `${found.discountPercent}% discount applied.` };
    }

<<<<<<< HEAD
=======
    if (cleanCode === "NEST20" || cleanCode === "VIP20") {
      setAppliedCoupon({ code: cleanCode, discountPercent: 20 });
      addToast("Code Applied", `Code ${cleanCode} applied: 20% discount.`, "success");
      return { success: true, message: "20% discount applied." };
    }

    if (cleanCode === "WELCOME10") {
      setAppliedCoupon({ code: cleanCode, discountPercent: 10 });
      addToast("Code Applied", "Code WELCOME10 applied: 10% discount.", "success");
      return { success: true, message: "10% discount applied." };
    }

>>>>>>> d1542023a8da1c7514cd484d5d4c3bcaf108c8b7
    if (cleanCode === "FREESHIP") {
      setAppliedCoupon({ code: cleanCode, discountPercent: 0, isFreeShipping: true });
      addToast("Code Applied", "Free Express Delivery unlocked.", "success");
      return { success: true, message: "Free Express Delivery unlocked." };
    }

    return { success: false, message: "Invalid promo code. Try 'NEST20' or 'WELCOME10'" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast("Code Removed", "Discount removed.", "info");
  };

  const placeOrder = (
    orderData: Omit<
      Order,
      "id" | "date" | "status" | "trackingNumber" | "estimatedDelivery" | "timeline"
    >
  ): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `SN-${randomNum}`;
    const trackingNumber = `BD-IN-${randomNum + 420}`;
    const today = new Date().toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber: orderId,
      customerName: orderData.customer?.fullName || orderData.customerName || "Customer",
      customerEmail: orderData.customer?.email || orderData.customerEmail || "",
      customerPhone: orderData.customer?.phone || orderData.customerPhone || "",
      shippingAddress: orderData.customer?.address || orderData.shippingAddress || "",
      date: today,
      status: "confirmed",
      paymentStatus: "paid",
      trackingNumber,
      estimatedDelivery: "Within 2-3 Business Days",
      timeline: [
        {
          status: "confirmed",
          label: "Order Confirmed & Payment Verified",
          date: "Just now",
          completed: true,
          current: true,
        },
        {
          status: "processing",
          label: "Precision Inspection & White-Glove Packaging",
          date: "Scheduled Today",
          completed: false,
          current: false,
        },
        {
          status: "in_transit",
          label: "BlueDart Air Cargo Dispatch",
          date: "Tomorrow",
          completed: false,
          current: false,
        },
        {
          status: "out_for_delivery",
          label: "Out for Local Hand-Delivery",
          date: "Estimated 2 Days",
          completed: false,
          current: false,
        },
        {
          status: "delivered",
          label: "Delivered to Customer Doorstep",
          date: "Estimated 3 Days",
          completed: false,
          current: false,
        },
      ],
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);

    return newOrder;
  };

  const trackOrderByNumber = (trackingOrId: string): Order | null => {
    const clean = trackingOrId.trim().toUpperCase();
    if (!clean) return null;

    const found = placedOrders.find(
      (o) =>
        o.id.toUpperCase() === clean ||
        (o.orderNumber && o.orderNumber.toUpperCase() === clean) ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === clean) ||
        o.id.toUpperCase().includes(clean)
    );

    if (found) {
      setActiveTrackingOrder(found);
      return found;
    }

    if (clean === "SN-982410" || clean === "BD-IN-9842019" || clean === "DEMO") {
      const demo = createDefaultOrder();
      setActiveTrackingOrder(demo);
      return demo;
    }

    return null;
  };

  const resetToDefaultData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setPromoCodes(INITIAL_PROMOS);
    setReviews(DEFAULT_REVIEWS);
    setCart([]);
    setWishlist([]);
    try {
      localStorage.removeItem("shopnest_products");
      localStorage.removeItem("shopnest_orders");
      localStorage.removeItem("shopnest_promos");
      localStorage.removeItem("shopnest_reviews");
      localStorage.removeItem("shopnest_cart");
      localStorage.removeItem("shopnest_wishlist");
    } catch {}
    addToast("Store Reset", "Demo data restored to initial atelier defaults.", "info");
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        promoCodes,
        addPromoCode,
        togglePromoCode,
        deletePromoCode,
        reviews,
        addReview,
        deleteReview,
        toggleReviewVerified,
        toasts,
        addToast,
        removeToast,
        currency,
        setCurrency,
        formatPrice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        theme,
        toggleTheme,
        resetToDefaultData,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        placedOrders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        placeOrder,
        trackOrderByNumber,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
