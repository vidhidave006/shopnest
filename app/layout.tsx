import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { ToastContainer } from "@/components/ToastContainer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopNest — Monochrome Lifestyle & Curated Essentials",
  description:
    "Discover high-fidelity spatial audio, titanium smartwatches, and minimalist apparel at ShopNest.",
  keywords: [
    "e-commerce",
    "monochrome",
    "black and white",
    "minimalist",
    "shopnest",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-black dark:text-white selection:bg-white selection:text-black dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
        <ShopProvider>
          {children}
          <CartDrawer />
          <QuickViewModal />
          <WishlistDrawer />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
