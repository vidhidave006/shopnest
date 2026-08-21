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
  Currency,
} from "@/types/shop";
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_PROMOS,
  REVIEWS as DEFAULT_REVIEWS,
} from "@/data/products";

export type { Currency };
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
    date: new Date().toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: "in_transit",
    trackingNumber: "BD-IN-9842019",
    estimatedDelivery: "Tomorrow, by 7:00 PM",
    customer: {
      fullName: "Ananya Deshmukh",
      email: "ananya.d@concierge.in",
      phone: "+91 98201 44521",
      address: "Penthouse 14, Prestige Ocean Heights, Worli",
      city: "Mumbai",
      postalCode: "400018",
      country: "India",
    },
    shippingMethod: "BlueDart Priority Carbon-Neutral Express",
    paymentMethod: "Razorpay (Credit Card Ending 4022)",
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        name: "Aura Studio Pro Wireless ANC Headphones",
        price: 289,
        quantity: 1,
        selectedColor: "Matte Black",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 289,
    discount: 0,
    shipping: 0,
    tax: 26.01,
    total: 315.01,
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
        label: "Out for Local Hand-Delivery",
        date: "Tomorrow Morning",
        completed: false,
        current: false,
      },
      {
        status: "delivered",
        label: "Delivered to Customer Doorstep",
        date: "Tomorrow, 7:00 PM",
        completed: false,
        current: false,
      },
    ],
  };
}

interface ShopContextType {
  // Store Products
  products: Product[];
  addProduct: (newProduct: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, count: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedColor?: string,
    selectedSize?: string
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

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Orders
  orders: Order[];
  addOrder: (
    order: Omit<Order, "id" | "orderNumber" | "date"> & {
      id?: string;
      orderNumber?: string;
      date?: string;
    }
  ) => Order;
  updateOrderStatus: (
    id: string,
    status: OrderStatus,
    trackingNumber?: string
  ) => void;
  deleteOrder: (id: string) => void;

  // Promo codes
  promoCodes: PromoCode[];
  addPromoCode: (promo: Omit<PromoCode, "id" | "usageCount">) => void;
  togglePromoCode: (id: string) => void;
  deletePromoCode: (id: string) => void;
  appliedCoupon: { code: string; discountPercent: number; isFreeShipping?: boolean } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Customer Reviews
  reviews: CustomerReview[];
  deleteReview: (id: string) => void;
  toggleReviewVerified: (id: string) => void;

  // General & Utility
  toasts: ToastNotification[];
  addToast: (
    title: string,
    message: string,
    type?: "success" | "info" | "error",
    image?: string
  ) => void;
  removeToast: (id: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInINR: number) => string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
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
  placeOrder: (orderData: Omit<Order, "id" | "date" | "status" | "trackingNumber" | "estimatedDelivery" | "timeline">) => Order;
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
    } catch { }
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
      } catch { }
      return nextTheme;
    });
  };

  // Set Currency wrapper with localStorage persistence
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem("shopnest_currency", newCurrency);
    } catch { }
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
    } catch { }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem("shopnest_products", JSON.stringify(products));
    } catch { }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_orders", JSON.stringify(orders));
    } catch { }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_promos", JSON.stringify(promoCodes));
    } catch { }
  }, [promoCodes]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_reviews", JSON.stringify(reviews));
    } catch { }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_cart", JSON.stringify(cart));
    } catch { }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("shopnest_wishlist", JSON.stringify(wishlist));
    } catch { }
  }, [wishlist]);

  // Product Management Actions
  const addProduct = (newProductData: Omit<Product, "id"> & { id?: string }): Product => {
    const id = newProductData.id || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProductData,
      id,
      slug:
        newProductData.slug ||
        newProductData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      rating: newProductData.rating || 5.0,
      reviewsCount: newProductData.reviewsCount || 0,
      inStock: newProductData.inStock !== false,
      stockCount: newProductData.stockCount ?? 15,
      images:
        newProductData.images && newProductData.images.length > 0
          ? newProductData.images
          : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"],
      colors: newProductData.colors && newProductData.colors.length > 0 ? newProductData.colors : [{ name: "Standard", hex: "#000000" }],
      tags: newProductData.tags || ["minimal", "luxury"],
      features: newProductData.features || ["Crafted with high-precision aerospace standards"],
      specs: newProductData.specs || {
        Material: "Anodized Aerospace Titanium",
        Origin: "Crafted in India",
      },
    };

    setProducts((prev) => [newProduct, ...prev]);
    addToast("Product Added", `${newProduct.name} is now live in store.`, "success");
    return newProduct;
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedProduct = { ...p, ...updated };
          if (updated.stockCount !== undefined) {
            updatedProduct.inStock = updated.stockCount > 0;
          }
          return updatedProduct;
        }
        return p;
      })
    );
    addToast("Product Updated", "Inventory item updated successfully.", "success");
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    setWishlist((prev) => prev.filter((p) => p.id !== id));
    addToast("Product Deleted", `${target?.name || "Product"} was removed.`, "info");
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

  // Order Management Actions
  const addOrder = (
    orderData: Omit<Order, "id" | "orderNumber" | "date"> & {
      id?: string;
      orderNumber?: string;
      date?: string;
    }
  ): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(
      2,
      "0"
    )}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newOrder: Order = {
      ...orderData,
      id: orderData.id || `ord-${Date.now()}`,
      orderNumber: orderData.orderNumber || `SN-${randomNum}`,
      date: orderData.date || formattedDate,
      status: orderData.status || "processing",
      paymentStatus: orderData.paymentStatus || "paid",
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (
    id: string,
    status: OrderStatus,
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === id) {
          return {
            ...ord,
            status,
            trackingNumber:
              trackingNumber !== undefined
                ? trackingNumber
                : ord.trackingNumber,
          };
        }
        return ord;
      })
    );
    addToast("Order Updated", `Order #${id} status changed to ${status}.`, "success");
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    addToast("Order Deleted", `Order #${id} removed from registry.`, "info");
  };

  // Promo Code Actions
  const addPromoCode = (promo: Omit<PromoCode, "id" | "usageCount">) => {
    const newPromo: PromoCode = {
      ...promo,
      id: `promo-${Date.now()}`,
      code: promo.code.toUpperCase().trim(),
      usageCount: 0,
    };
    setPromoCodes((prev) => [newPromo, ...prev]);
    addToast("Promo Created", `Code ${newPromo.code} created (${newPromo.discountPercent}% off).`, "success");
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== id));
    addToast("Promo Deleted", "Discount code removed.", "info");
  };

  // Review Moderation Actions
  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    addToast("Review Deleted", "Customer testimonial removed.", "info");
  };

  const toggleReviewVerified = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verified: !r.verified } : r))
    );
  };

  // Reset to default demo data
  const resetToDefaultData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setPromoCodes(INITIAL_PROMOS);
    setReviews(DEFAULT_REVIEWS);
    setCurrencyState("INR");
    localStorage.removeItem("shopnest_products");
    localStorage.removeItem("shopnest_orders");
    localStorage.removeItem("shopnest_promos");
    localStorage.removeItem("shopnest_reviews");
    localStorage.setItem("shopnest_currency", "INR");
    addToast("Data Reset", "Store demo data restored to factory defaults in INR (₹).", "info");
  };

  // Toast notifications
  const addToast = (
    title: string,
    message: string,
    type: "success" | "info" | "error" = "success",
    image?: string
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type, image }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const color = selectedColor || product.colors[0]?.name || "Standard";
    const size = selectedSize || product.sizes?.[0] || "";
    const itemId = `${product.id}-${color}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedColor: color,
          selectedSize: size,
        },
      ];
    });

    setIsCartOpen(true);
    addToast(
      "Item Added to Bag",
      `${product.name} (x${quantity}) added to bag.`,
      "success",
      product.images[0]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
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

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      addToast("Removed from Wishlist", `${product.name} was removed.`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(
        "Saved to Wishlist",
        `${product.name} saved to wishlist.`,
        "success",
        product.images[0]
      );
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Indian Rupee & Multi-currency formatted prices
  const formatPrice = (amountInINR: number) => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    const converted = (amountInINR || 0) * rateInfo.rate;
    if (currency === "INR") {
      return `₹${converted.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
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
        `Code ${cleanCode} applied: ${found.discountPercent}% off.`,
        "success"
      );
      return { success: true, message: `${found.discountPercent}% discount applied.` };
    }

    if (cleanCode === "WELCOME10") {
      setAppliedCoupon({ code: cleanCode, discountPercent: 10 });
      addToast("Code Applied", "Code WELCOME10 applied: 10% off.", "success");
      return { success: true, message: "10% discount applied." };
    }
    if (cleanCode === "FREESHIP") {
      setAppliedCoupon({ code: cleanCode, discountPercent: 0, isFreeShipping: true });
      addToast("Code Applied", "Free Express Delivery unlocked.", "success");
      return { success: true, message: "Free Express Delivery unlocked." };
    }

    return { success: false, message: "Invalid promo code. Try 'NEST20' or 'VIP20'" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast("Code Removed", "Discount removed.", "info");
  };

  const placeOrder = (orderData: Omit<Order, "id" | "date" | "status" | "trackingNumber" | "estimatedDelivery" | "timeline">): Order => {
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
      date: today,
      status: "confirmed",
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
