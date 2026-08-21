"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Order, OrderStatus } from "@/types/shop";
import { useShop } from "@/context/ShopContext";
import { CustomSelect, CustomSelectOption } from "@/components/ui/CustomSelect";
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertOctagon,
  Copy,
  MapPin,
  Mail,
  Phone,
  User,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (id: string, status: OrderStatus, trackingNumber?: string) => void;
}

export function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}: OrderDetailModalProps) {
  const { formatPrice, addToast } = useShop();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
    order?.status || "pending"
  );
  const [trackingNumber, setTrackingNumber] = useState(
    order?.trackingNumber || ""
  );
  const [courierService, setCourierService] = useState(
    "DHL Express Carbon-Neutral"
  );

  React.useEffect(() => {
    if (order) {
      setCurrentStatus(order.status);
      setTrackingNumber(order.trackingNumber || "");
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const statusOptions: CustomSelectOption[] = [
    { value: "pending", label: "Pending Dispatch", description: "Awaiting sorting & packing facility queue", icon: <Package className="w-4 h-4 text-zinc-400" /> },
    { value: "processing", label: "Processing in Warehouse", description: "Parcel packed, sealed & barcode assigned", icon: <Clock className="w-4 h-4 text-amber-500" /> },
    { value: "shipped", label: "In Transit (Express Courier)", description: "Dispatched with priority air flight carrier", icon: <Truck className="w-4 h-4 text-blue-500" /> },
    { value: "delivered", label: "Delivered to Client", description: "Successfully handed over & signed by recipient", icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
    { value: "cancelled", label: "Cancelled / Voided", description: "Order voided & payment reversed", icon: <AlertOctagon className="w-4 h-4 text-red-500" /> },
  ];

  const courierOptions: CustomSelectOption[] = [
    { value: "DHL Express Carbon-Neutral", label: "DHL Express Carbon-Neutral", description: "1-2 days priority international air", icon: <Truck className="w-4 h-4 text-zinc-400" />, badge: "Primary" },
    { value: "FedEx Priority Freight", label: "FedEx Priority Freight", description: "Direct intercontinental flight line" },
    { value: "UPS Global Secure", label: "UPS Global Secure", description: "High-value insured courier escort" },
    { value: "Royal Mail International", label: "Royal Mail International Tracked", description: "Standard secure tracked delivery" },
  ];

  const handleSaveStatus = () => {
    onUpdateStatus(order.id, currentStatus, trackingNumber.trim() || undefined);
    onClose();
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      addToast("Copied", `${label} copied to clipboard.`, "info");
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return {
          bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: "Delivered",
        };
      case "shipped":
        return {
          bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          icon: <Truck className="w-3.5 h-3.5" />,
          label: "In Transit / Shipped",
        };
      case "processing":
        return {
          bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          icon: <Clock className="w-3.5 h-3.5" />,
          label: "Processing",
        };
      case "cancelled":
        return {
          bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
          icon: <AlertOctagon className="w-3.5 h-3.5" />,
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
          icon: <Package className="w-3.5 h-3.5" />,
          label: "Pending",
        };
    }
  };

  const badge = getStatusBadge(order.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 font-mono text-xs">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
              #
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-black dark:text-white uppercase tracking-tight">
                  {order.orderNumber}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${badge.bg}`}
                >
                  {badge.icon} {badge.label}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Placed on {order.date} &bull; Payment: {order.paymentMethod} ({order.paymentStatus})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Status & Logistics Custom Dropdowns Bar */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-bold block">
              Fulfillment Status & Logistics Operations
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Custom Status Dropdown */}
              <div>
                <CustomSelect
                  label="Order Lifecycle Stage"
                  options={statusOptions}
                  value={currentStatus}
                  onChange={(val) => setCurrentStatus(val as OrderStatus)}
                />
              </div>

              {/* Custom Courier Carrier Dropdown */}
              <div>
                <CustomSelect
                  label="Logistics Carrier Partner"
                  options={courierOptions}
                  value={courierService}
                  onChange={(val) => setCourierService(val)}
                />
              </div>
            </div>

            {/* Tracking Number */}
            <div className="pt-2">
              <label className="text-[11px] text-zinc-600 dark:text-zinc-400 uppercase font-bold block mb-1.5">
                Consignment Tracking Number
              </label>
              <input
                type="text"
                placeholder="e.g. TRK-98320491"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:outline-none uppercase font-bold"
              />
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Info */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
              <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase text-[10px]">
                <User className="w-3.5 h-3.5" /> Customer Identity
              </div>
              <p className="font-bold text-black dark:text-white text-sm">{order.customerName}</p>
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-[11px]">
                <Mail className="w-3 h-3 text-zinc-400" />
                <span>{order.customerEmail}</span>
              </div>
              {order.customerPhone && (
                <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-[11px]">
                  <Phone className="w-3 h-3 text-zinc-400" />
                  <span>{order.customerPhone}</span>
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase text-[10px]">
                  <MapPin className="w-3.5 h-3.5" /> Shipping Destination
                </div>
                <button
                  onClick={() => copyToClipboard(order.shippingAddress || order.customer?.address || "", "Address")}
                  className="text-zinc-400 hover:text-black dark:hover:text-white"
                  title="Copy address"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed">
                {order.shippingAddress || order.customer?.address}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 pt-1">
                <ShieldCheck className="w-3 h-3 text-zinc-400" />
                <span>Express Courier: {courierService}</span>
              </div>
            </div>
          </div>

          {/* Ordered Line Items */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-bold block">
              Dispatched Line Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-900 overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-white dark:bg-zinc-950">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                      <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white text-xs leading-snug line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="text-[10px] text-zinc-400 flex items-center gap-2 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-black dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      {formatPrice(item.price)} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Calculation Breakdown */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-500">
              <span>Subtotal:</span>
              <span className="font-bold text-black dark:text-white">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Promotional Discount:</span>
                <span className="font-bold">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-500">
              <span>Estimated Tax (7%):</span>
              <span className="font-bold text-black dark:text-white">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Shipping Delivery:</span>
              <span className="font-bold text-black dark:text-white">
                {order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-sm font-black">
              <span className="uppercase text-black dark:text-white">Settled Total:</span>
              <span className="text-black dark:text-white text-base">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold uppercase text-xs transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSaveStatus}
            className="px-6 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold uppercase text-xs transition-colors shadow-md"
          >
            Update Order Status
          </button>
        </div>
      </div>
    </div>
  );
}
