"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Product, Order, OrderStatus } from "@/types/shop";
import { CATEGORIES } from "@/data/products";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminAddProductForm } from "@/components/admin/AdminAddProductForm";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminCoupons } from "@/components/admin/AdminCoupons";
import { AdminReviews } from "@/components/admin/AdminReviews";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminAnimatedBackground } from "@/components/admin/AdminAnimatedBackground";
import { OrderDetailModal } from "@/components/admin/OrderDetailModal";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Store,
  ShieldAlert,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const {
    products,
    addProduct,
    updateProduct,
    orders,
    updateOrderStatus,
    promoCodes,
    reviews,
    currency,
    addToast,
  } = useShop();

  const [currentTab, setCurrentTab] = useState<
    | "dashboard"
    | "products"
    | "add-product"
    | "orders"
    | "categories"
    | "coupons"
    | "reviews"
    | "settings"
  >("dashboard");

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Editing & Selection State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setCurrentTab("add-product");
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setCurrentTab("add-product");
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      addToast("Product Updated", `"${productData.name}" has been updated.`, "success");
    } else {
      addProduct(productData as any);
      addToast("Product Created", `"${productData.name}" is now live in catalog.`, "success");
    }
    setEditingProduct(null);
    setCurrentTab("products");
  };

  const handleCancelAddProduct = () => {
    setEditingProduct(null);
    setCurrentTab("products");
  };

  const handleOpenLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    addToast("Session Terminated", "Logged out from Admin Console.", "info");
    router.push("/");
  };

  const pendingOrdersCount = orders.filter((o) => o.status === "pending").length;
  const lowStockCount = products.filter((p) => (p.stockCount ?? 0) <= 5).length;

  const mainTabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: "products",
      label: "Products",
      count: products.length,
      alert: lowStockCount > 0 ? `${lowStockCount} low` : undefined,
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "orders",
      label: "Orders",
      count: orders.length,
      alert: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : undefined,
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: "categories",
      label: "Categories",
      count: CATEGORIES.length,
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: "coupons",
      label: "Coupons",
      count: promoCodes.length,
      icon: <Tag className="w-4 h-4" />,
    },
    {
      id: "reviews",
      label: "Reviews",
      count: reviews.length,
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  const getTabTitle = () => {
    if (currentTab === "add-product") return editingProduct ? "Edit Item" : "Add New Item";
    if (currentTab === "settings") return "Settings";
    return mainTabs.find((t) => t.id === currentTab)?.label || "Admin Console";
  };

  return (
    <div className="min-h-screen flex bg-white text-black selection:bg-black selection:text-white transition-colors duration-200 font-sans relative">
      {/* Moving Grain Texture Background on White */}
      <AdminAnimatedBackground />

      {/* Desktop Left Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white/85 backdrop-blur-xl border-r border-zinc-200 sticky top-0 h-screen text-xs z-30 font-sans shadow-xs">
        {/* Brand Header */}
        <div className="p-5 border-b border-zinc-200">
          <button
            onClick={() => setCurrentTab("dashboard")}
            className="flex items-center gap-3 text-left w-full group"
          >
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-105 shadow-xs font-mono">
              CH
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-black">
                  CHERRY
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black text-white font-mono font-bold text-[9px] uppercase tracking-wider">
                  ADMIN
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Online ({currency})</span>
              </div>
            </div>
          </button>
        </div>

        {/* Top & Middle: Main Management Modules List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          <div className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 py-1 font-bold">
            STORE MANAGEMENT
          </div>

          {mainTabs.map((tab) => {
            const isActive =
              currentTab === tab.id ||
              (tab.id === "products" && currentTab === "add-product");
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold uppercase text-xs transition-all ${
                  isActive
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-700 hover:text-black hover:bg-zinc-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.alert ? (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-amber-500 text-black font-mono">
                    {tab.alert}
                  </span>
                ) : tab.count !== undefined ? (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? "bg-zinc-800 text-white"
                        : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                    }`}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Drawer Bottom Footer: SETTINGS & LOG OUT */}
        <div className="p-4 border-t border-zinc-200 space-y-1.5">
          {/* Settings at the bottom */}
          <button
            onClick={() => setCurrentTab("settings")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold uppercase text-xs transition-all ${
              currentTab === "settings"
                ? "bg-black text-white shadow-xs"
                : "text-zinc-700 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              <span>SETTINGS</span>
            </div>
          </button>

          {/* Log Out directly below Settings */}
          <button
            onClick={handleOpenLogout}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold uppercase text-xs transition-all text-red-600 hover:bg-red-50 hover:text-red-700"
            title="Sign out of Admin Panel"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4" />
              <span>LOG OUT</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Body Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Navbar: Clean Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-200 transition-colors shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 gap-3">
              {/* Left: Mobile Drawer Toggle & Current Section Title */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  className="lg:hidden p-2 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                  aria-label="Toggle mobile admin menu"
                >
                  {isMobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>

                {/* Mobile Brand Logo (Clicking takes back to Dashboard) */}
                <button
                  onClick={() => setCurrentTab("dashboard")}
                  className="lg:hidden flex items-center gap-2 group text-left"
                  title="Go to Admin Dashboard"
                >
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs font-mono transition-transform group-hover:scale-105">
                    CH
                  </div>
                  <span className="font-bold text-sm text-black">
                    ADMIN
                  </span>
                </button>

                {/* Breadcrumb / Current Active View on Desktop */}
                <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium">
                  <button
                    onClick={() => setCurrentTab("dashboard")}
                    className="text-zinc-500 hover:text-black uppercase tracking-wider font-semibold transition-colors py-1 px-1.5 rounded-lg hover:bg-zinc-100"
                    title="Return to Admin Dashboard"
                  >
                    ADMIN
                  </button>
                  <span className="text-zinc-400">/</span>
                  {currentTab === "add-product" ? (
                    <>
                      <button
                        onClick={() => setCurrentTab("products")}
                        className="text-zinc-500 hover:text-black uppercase tracking-wider font-semibold transition-colors py-1 px-1.5 rounded-lg hover:bg-zinc-100"
                      >
                        PRODUCTS
                      </button>
                      <span className="text-zinc-400">/</span>
                      <span className="font-bold text-black uppercase tracking-wider px-1.5 py-1">
                        {editingProduct ? "EDIT ITEM" : "ADD NEW ITEM"}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-black uppercase tracking-wider px-1.5 py-1">
                      {getTabTitle()}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Clean Storefront Preview */}
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 inline-flex items-center gap-1.5 px-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
                  title="Open Live Storefront Preview in New Tab"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Store</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </Link>
              </div>
            </div>

            {/* Mobile Navigation Drawer for Left Sidebar Items */}
            {isMobileNavOpen && (
              <div className="lg:hidden py-4 border-t border-zinc-200 space-y-1 text-xs animate-in fade-in duration-150 bg-white/95 backdrop-blur-xl">
                <div className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 py-1 font-bold">
                  STORE MANAGEMENT
                </div>
                {mainTabs.map((tab) => {
                  const isActive =
                    currentTab === tab.id ||
                    (tab.id === "products" && currentTab === "add-product");
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setCurrentTab(tab.id as any);
                        setIsMobileNavOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold uppercase transition-colors ${
                        isActive
                          ? "bg-black text-white"
                          : "text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tab.icon}
                        <span>{tab.label}</span>
                      </div>
                      {tab.alert ? (
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-500 text-black font-mono">
                          {tab.alert}
                        </span>
                      ) : tab.count !== undefined ? (
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                          {tab.count}
                        </span>
                      ) : null}
                    </button>
                  );
                })}

                {/* Mobile Drawer Bottom: Settings & Log Out */}
                <div className="pt-3 border-t border-zinc-200 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentTab("settings");
                      setIsMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold uppercase transition-colors ${
                      currentTab === "settings"
                        ? "bg-black text-white"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>SETTINGS</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      handleOpenLogout();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold uppercase transition-colors text-red-600 hover:bg-red-50"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      <span>LOG OUT</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Workspace Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
          {currentTab === "dashboard" && (
            <AdminDashboard
              onNavigateTab={(tab: string) => setCurrentTab(tab as any)}
              onOpenAddProduct={handleOpenAddProduct}
              onSelectOrder={(order: Order) => setSelectedOrder(order)}
            />
          )}

          {currentTab === "products" && (
            <AdminProducts
              onAddProduct={handleOpenAddProduct}
              onEditProduct={handleOpenEditProduct}
            />
          )}

          {currentTab === "add-product" && (
            <AdminAddProductForm
              initialProduct={editingProduct}
              onSave={handleSaveProduct}
              onCancel={handleCancelAddProduct}
            />
          )}

          {currentTab === "orders" && (
            <AdminOrders
              onSelectOrder={(order: Order) => setSelectedOrder(order)}
            />
          )}

          {currentTab === "categories" && (
            <AdminCategories
              onSelectCategory={() => setCurrentTab("products")}
            />
          )}

          {currentTab === "coupons" && <AdminCoupons />}

          {currentTab === "reviews" && <AdminReviews />}

          {currentTab === "settings" && <AdminSettings />}
        </main>
      </div>

      {/* Order Inspection Modal */}
      <OrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={(id: string, status: OrderStatus, tracking?: string) => {
          updateOrderStatus(id, status, tracking);
          setSelectedOrder((prev) =>
            prev ? { ...prev, status, trackingNumber: tracking ?? prev.trackingNumber } : null
          );
        }}
      />

      {/* Bespoke Luxury Log Out Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 font-sans">
          <div className="relative bg-white border border-zinc-200 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Top Close Bar */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-black shadow-xs">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-3">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 text-[10px] font-mono font-bold uppercase tracking-wider border border-red-500/20">
                  <ShieldAlert className="w-3 h-3" /> Security Protocol
                </div>
                <h3 className="text-xl font-bold text-black tracking-tight">
                  Sign out from Admin?
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  You are about to terminate your administrative control session. You will be safely returned to the live storefront catalog.
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-5 pt-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 font-bold uppercase text-xs tracking-wider transition-colors"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-zinc-800 font-bold uppercase text-xs tracking-wider transition-colors flex items-center gap-2 shadow-md"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>CONFIRM LOG OUT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
