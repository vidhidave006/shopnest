import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { ToastContainer } from "@/components/ToastContainer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderTrackerModal } from "@/components/OrderTrackerModal";
import { SnowfallBackground } from "@/components/SnowfallBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cherry — Monochrome Lifestyle & Curated Essentials",
  description:
    "Discover high-fidelity spatial audio, titanium smartwatches, and minimalist apparel at Cherry.",
  keywords: [
    "e-commerce",
    "monochrome",
    "black and white",
    "minimalist",
    "cherry",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-black dark:text-white selection:bg-white selection:text-black dark:selection:bg-white dark:selection:text-black transition-colors duration-200 font-sans relative">
        <ShopProvider>
          <SnowfallBackground />
          {children}
          <CartDrawer />
          <QuickViewModal />
          <WishlistDrawer />
          <CheckoutModal />
          <OrderTrackerModal />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
