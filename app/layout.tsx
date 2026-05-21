import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ersbeauty | Premium Authentic Skincare & Cosmetics",
  description: "Explore and shop premium, 100% authentic international beauty and skincare products at ersbeauty. Genuine products guaranteed.",
  keywords: "ersbeauty, skincare, cosmetics, beauty bangladesh, collagen cream, anti-wrinkle cream, recombinant collagen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full scroll-smooth`}>
      <body className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
