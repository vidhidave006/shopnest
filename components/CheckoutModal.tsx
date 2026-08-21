"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Printer,
  PackageCheck,
  Check,
  Zap,
} from "lucide-react";
import { Order } from "@/types/shop";

export function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    appliedCoupon,
    formatPrice,
    placeOrder,
    setIsOrderTrackerOpen,
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    shippingMethod: "BlueDart Aviation Priority Express",
    shippingPrice: cartSubtotal >= 60 ? 0 : 5.88,
    paymentMethod: "upi_card",
    cardNumber: "6071 •••• •••• 8421",
    cardExp: "12/29",
    cardCvc: "842",
  });

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 60;
  const freeShippingUnlocked =
    cartSubtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.isFreeShipping;
  const discountAmount = appliedCoupon
    ? (cartSubtotal * appliedCoupon.discountPercent) / 100
    : 0;
  const shippingCost = freeShippingUnlocked ? 0 : formData.shippingPrice;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.18;
  const finalTotal = cartSubtotal - discountAmount + shippingCost + estimatedTax;

  const handleFillDemoData = () => {
    setFormData({
      fullName: "Aarav Sharma",
      email: "aarav.sharma@atelier.in",
      phone: "+91 98201 44821",
      address: "42 Altamount Road, Cumballa Hill",
      city: "Mumbai, Maharashtra",
      postalCode: "400026",
      country: "India",
      shippingMethod: "BlueDart Aviation Priority Express",
      shippingPrice: 0,
      paymentMethod: "upi_card",
      cardNumber: "6071 •••• •••• 8421",
      cardExp: "12/29",
      cardCvc: "749",
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else if (step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        const orderItems = cart.map((item) => ({
          id: item.id,
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          image: item.product.images[0],
        }));

        const newOrder = placeOrder({
          items: orderItems,
          subtotal: cartSubtotal,
          discount: discountAmount,
          shipping: shippingCost,
          tax: estimatedTax,
          total: finalTotal,
          customer: {
            fullName: formData.fullName || "Aarav Sharma",
            email: formData.email || "patron@shopnest.in",
            phone: formData.phone || "+91 98201 44821",
            address: formData.address || "42 Altamount Road",
            city: formData.city || "Mumbai",
            postalCode: formData.postalCode || "400026",
            country: "India",
          },
          shippingMethod: formData.shippingMethod,
          paymentMethod: `UPI / RuPay Platinum (•••• ${formData.cardNumber.slice(-4)})`,
        });

        setConfirmedOrder(newOrder);
        setIsProcessing(false);
        setStep(4);
      }, 1100);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (!isProcessing) setIsCheckoutOpen(false);
        }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-zinc-950 text-black dark:text-white rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-4xl w-full overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="px-7 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xs font-mono shadow-sm">
              SN
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em]">
                {step === 4 ? "Acquisition Confirmed" : "Secure Checkout"}
              </h2>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                256-BIT ENCRYPTED UPI &amp; CARD GATEWAY
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Progress Bar */}
        {step < 4 && (
          <div className="px-7 py-3.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4 sm:gap-8">
              {[
                { s: 1, label: "Destination" },
                { s: 2, label: "Dispatch" },
                { s: 3, label: "UPI & Cards" },
              ].map((st) => (
                <div
                  key={st.s}
                  className={`flex items-center gap-2 ${
                    step >= st.s
                      ? "text-black dark:text-white font-bold"
                      : "text-zinc-500"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${
                      step > st.s
                        ? "bg-black dark:bg-white text-white dark:text-black font-bold"
                        : step === st.s
                        ? "bg-black dark:bg-white text-white dark:text-black font-bold"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {step > st.s ? <Check className="w-3 h-3 stroke-[3]" /> : st.s}
                  </span>
                  <span className="hidden sm:inline uppercase tracking-wider">{st.label}</span>
                </div>
              ))}
            </div>

            {/* Quick Demo Fill */}
            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-[10.5px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer border border-zinc-300 dark:border-zinc-700"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fill Demo Data</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        {step < 4 ? (
          <form onSubmit={handleNextStep}>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Form Input Columns */}
              <div className="lg:col-span-7 p-7 space-y-6">
                {/* Step 1: Shipping Address */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-black dark:text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-zinc-400" /> 1. Dispatch Destination
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aarav Sharma"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          Email Dispatch Notice *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="aarav@atelier.in"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          Phone (Carrier SMS Updates) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98201 44821"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          Street Address / Landmark *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="42 Altamount Road, Cumballa Hill"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          City &amp; State *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mumbai, Maharashtra"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="400026"
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              postalCode: e.target.value,
                            })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Speed */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-black dark:text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-zinc-400" /> 2. Dispatch Carrier Tier
                    </h3>

                    <div className="space-y-3.5">
                      <label
                        onClick={() =>
                          setFormData({
                            ...formData,
                            shippingMethod: "BlueDart Aviation Priority Express (2-3 Days)",
                            shippingPrice: cartSubtotal >= 60 ? 0 : 5.88,
                          })
                        }
                        className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          formData.shippingMethod.includes("BlueDart")
                            ? "border-black dark:border-white bg-zinc-100 dark:bg-zinc-900"
                            : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              formData.shippingMethod.includes("BlueDart")
                                ? "border-black dark:border-white"
                                : "border-zinc-400"
                            }`}
                          >
                            {formData.shippingMethod.includes("BlueDart") && (
                              <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-black dark:text-white text-sm">
                              BlueDart Aviation Priority Cargo
                            </p>
                            <span className="text-[10px] text-zinc-400">
                              Direct Air Cargo Transit across Indian Metros
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-black dark:text-white font-mono">
                          {cartSubtotal >= 60 || appliedCoupon?.isFreeShipping
                            ? "COMPLIMENTARY"
                            : formatPrice(5.88)}
                        </span>
                      </label>

                      <label
                        onClick={() =>
                          setFormData({
                            ...formData,
                            shippingMethod: "VIP Same-Day Concierge Air (Metro Express)",
                            shippingPrice: 11.75,
                          })
                        }
                        className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          formData.shippingMethod.includes("VIP")
                            ? "border-black dark:border-white bg-zinc-100 dark:bg-zinc-900"
                            : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              formData.shippingMethod.includes("VIP")
                                ? "border-black dark:border-white"
                                : "border-zinc-400"
                            }`}
                          >
                            {formData.shippingMethod.includes("VIP") && (
                              <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-black dark:text-white text-sm">
                              VIP Same-Day Concierge Dispatch
                            </p>
                            <span className="text-[10px] text-zinc-400">
                              Guaranteed same-day flight dispatch for Mumbai, Delhi, BLR
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-black dark:text-white font-mono">
                          {formatPrice(11.75)}
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <div className="space-y-5 animate-in fade-in duration-200 font-mono text-xs">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-black dark:text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-zinc-400" /> 3. Settlement (UPI / RuPay / Cards)
                    </h3>

                    {/* Clean Monochrome Card Preview */}
                    <div className="p-6 rounded-3xl bg-zinc-900 text-white border border-zinc-700 shadow-xl space-y-4 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="tracking-[0.2em] uppercase text-zinc-300 text-[10px] font-bold">
                          SHOPNEST ATELIER
                        </span>
                        <span className="font-black text-white text-sm">RUPAY PLATINUM</span>
                      </div>
                      
                      <div className="text-lg sm:text-xl font-mono tracking-[0.24em] text-white py-2">
                        {formData.cardNumber}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800 pt-3">
                        <div>
                          <span className="uppercase text-[8.5px] block text-zinc-500">
                            CARDHOLDER / UPI VPA
                          </span>
                          <span className="font-bold text-white uppercase tracking-wider">
                            {formData.fullName || "AARAV SHARMA"}
                          </span>
                        </div>
                        <div>
                          <span className="uppercase text-[8.5px] block text-zinc-500">
                            VALID THRU
                          </span>
                          <span className="font-bold text-white">
                            {formData.cardExp}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          Card Number or UPI ID (e.g. username@okhdfcbank)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, cardNumber: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardExp}
                          onChange={(e) =>
                            setFormData({ ...formData, cardExp: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-zinc-400 mb-1">
                          Security CVV
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardCvc}
                          onChange={(e) =>
                            setFormData({ ...formData, cardCvc: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10.5px] text-zinc-500 pt-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>
                        Protected by 256-bit bank encryption (RuPay, UPI 2.0, Visa, Mastercard).
                      </span>
                    </div>
                  </div>
                )}

                {/* Form Action Buttons */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 font-mono">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => (prev - 1) as any)}
                      className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Return</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-7 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-black uppercase tracking-[0.14em] flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Authorizing UPI Gateway...</span>
                    ) : step === 3 ? (
                      <>
                        <span>Pay {formatPrice(finalTotal)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Proceed</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Order Summary Side Panel */}
              <div className="lg:col-span-5 p-7 bg-zinc-50 dark:bg-black border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-zinc-400 mb-4">
                    Acquisition Summary ({cart.length} items)
                  </h3>

                  {/* Cart Items List */}
                  <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0 font-mono text-xs">
                          <p className="font-bold text-black dark:text-white truncate">
                            {item.product.name}
                          </p>
                          <span className="text-[10px] text-zinc-400">
                            Qty: {item.quantity} &bull; {item.selectedColor}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-xs text-black dark:text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-zinc-500">
                      <span>Subtotal</span>
                      <span className="text-black dark:text-white font-bold">
                        {formatPrice(cartSubtotal)}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-black dark:text-white font-bold">
                        <span>Privilege ({appliedCoupon?.code})</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-zinc-500">
                      <span>Air Dispatch</span>
                      <span className="text-black dark:text-white font-bold">
                        {shippingCost === 0 ? "COMPLIMENTARY" : formatPrice(shippingCost)}
                      </span>
                    </div>

                    <div className="flex justify-between text-zinc-500">
                      <span>GST (18% Included)</span>
                      <span className="text-black dark:text-white font-bold">
                        {formatPrice(estimatedTax)}
                      </span>
                    </div>

                    <div className="pt-3.5 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-base font-bold text-black dark:text-white">
                      <span>Total Due</span>
                      <span className="font-black">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Guarantee */}
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2.5 text-[10px] font-mono text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>
                    Backed by 30-Day Sanctuary In-Home Trial and 2-Year Atelier Warranty.
                  </span>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Step 4: Confirmed Order Screen */
          <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-3xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] border border-zinc-200 dark:border-zinc-800">
                <Zap className="w-3 h-3" /> Acquisition Confirmed &bull; Vault Locked
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase">
                Acquisition Authorized
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Thank you for your patronage. An official GST invoice and dossier has been dispatched to{" "}
                <strong className="text-black dark:text-white">{confirmedOrder?.customer.email}</strong>.
              </p>
            </div>

            {/* Order Card Receipt */}
            {confirmedOrder && (
              <div className="max-w-lg mx-auto bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 text-left font-mono space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200 dark:border-zinc-800 text-xs">
                  <div>
                    <span className="text-[9.5px] text-zinc-400 block uppercase tracking-wider">
                      ACQUISITION ID
                    </span>
                    <strong className="text-sm font-black text-black dark:text-white">
                      {confirmedOrder.id}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] text-zinc-400 block uppercase tracking-wider">
                      AIR CARGO TRACKING
                    </span>
                    <span className="text-xs font-bold text-black dark:text-white">
                      {confirmedOrder.trackingNumber}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-500">
                    <span>Estimated Delivery:</span>
                    <span className="text-black dark:text-white font-bold">
                      {confirmedOrder.estimatedDelivery}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Dispatch Address:</span>
                    <span className="text-black dark:text-white truncate max-w-[240px]">
                      {confirmedOrder.customer.address},{" "}
                      {confirmedOrder.customer.city}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Total Amount Paid:</span>
                    <span className="font-black text-sm text-black dark:text-white">
                      {formatPrice(confirmedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4 font-mono">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsOrderTrackerOpen(true);
                }}
                className="px-7 py-3.5 rounded-2xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-black uppercase tracking-[0.14em] flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Track Air Telemetry</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-6 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print GST Dossier</span>
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="px-5 py-3.5 rounded-2xl text-zinc-500 hover:text-black dark:hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Return to Atelier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
