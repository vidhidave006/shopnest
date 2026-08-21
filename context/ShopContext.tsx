"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  Product,
  CartItem,
  CustomerReview,
  Order,
  OrderStatus,
  PromoCode,
  ToastNotification,
  TrackingStep,
} from "@/types/shop";
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_PROMOS,
  REVIEWS as DEFAULT_REVIEWS,
} from "@/data/products";

export type Currency = "INR" | "USD" | "EUR" | "GBP";
export type Theme = "dark" | "light";

export const CURRENCY_RATES: Record<
  Currency,
  { symbol: string; rate: number; label: string }
> = {
  INR: { symbol: "₹", rate: 1.0, label: "INR (₹ - Indian Rupee - Base)" },
  USD: { symbol: "$", rate: 0.012, label: "USD ($ - US Dollar)" },
  EUR: { symbol: "€", rate: 0.011, label: "EUR (€ - Euro)" },
  GBP: { symbol: "£", rate: 0.0095, label: "GBP (£ - British Pound)" },
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
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 23999.00,
    discount: 0,
    shipping: 0,
    tax: 1679.93,
    total: 25678.93,
    timeline: [
      {
        status: "confirmed",
        label: "Order Confirmed & Payment Verified",
        date: "Today, 09:15 AM",
        completed: true,
        current: false,
      },
      {
        status: "processing",
        label: "Precision Inspection & White-Glove Packaging",
        date: "Today, 11:30 AM",
        completed: true,
        current: false,
      },
      {
        status: "in_transit",
        label: "BlueDart Air Cargo Dispatch (BLR Hub)",
        date: "Today, 02:45 PM",
        completed: true,
        current: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Courier Dispatch",
        date: "Tomorrow Morning",
        completed: false,
        current: false,
      },
      {
        status: "delivered",
        label: "Delivered to Customer Doorstep",
        date: "Tomorrow by 7 PM",
        completed: false,
        current: false,
      },
    ],
  };
}

interface ShopContextType {
  // Product Catalog
  products: Product[];
  addProduct: (product: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, count: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    arg2?: string | number,
    arg3?: string | number,
    arg4?: string | number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
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
  formatPrice: (amountInINR: number) => string;

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

  // Orders state
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Promo Codes state
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMOS);

  // Reviews state
  const [reviews, setReviews] = useState<CustomerReview[]>(DEFAULT_REVIEWS);

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast state
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Currency state: Default to Indian Rupee (INR ₹)
  const [currency, setCurrencyState] = useState<Currency>("INR");

  // Filtering / Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    isFreeShipping?: boolean;
  } | null>(null);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Order tracking state
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // Sync theme with document element
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("shopnest_theme") as Theme;
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        document.documentElement.classList.add("dark");
      }
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
      const savedCurrency = localStorage.getItem("shopnest_currency") as Currency;
      if (savedCurrency && CURRENCY_RATES[savedCurrency]) {
        setCurrencyState(savedCurrency);
      } else {
        setCurrencyState("INR");
      }

      const savedProducts = localStorage.getItem("shopnest_products");
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }

      const savedOrders = localStorage.getItem("shopnest_orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        setOrders(parsed);
        setPlacedOrders(parsed);
        if (parsed.length > 0) setActiveTrackingOrder(parsed[0]);
      } else {
        const demoOrder = createDefaultOrder();
        setPlacedOrders([demoOrder]);
        setActiveTrackingOrder(demoOrder);
      }

      const savedPromos = localStorage.getItem("shopnest_promos");
      if (savedPromos) {
        setPromoCodes(JSON.parse(savedPromos));
      }

      const savedReviews = localStorage.getItem("shopnest_reviews");
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
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem("shopnest_products", JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_promos", JSON.stringify(promoCodes));
    } catch {}
  }, [promoCodes]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_reviews", JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

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
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    addToast("Product Updated", "Catalog item changes saved successfully.", "success");
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    setWishlist((prev) => prev.filter((p) => p.id !== id));
    addToast("Product Deleted", "The product was removed from the store.", "info");
  };

  const updateStock = (id: string, count: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              stockCount: Math.max(0, count),
              inStock: count > 0,
            }
          : p
      )
    );
  };

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
    addToast("Status Updated", `Order #${id} marked as ${status.replace("_", " ").toUpperCase()}.`, "info");
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
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
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    addToast("Coupon Updated", "Promo code availability status updated.", "info");
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== id));
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
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    addToast("Review Removed", "Review record has been deleted.", "info");
  };

  const toggleReviewVerified = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verified: !r.verified } : r))
    );
  };

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
