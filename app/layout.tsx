import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vahnika — Pure Cotton Bed Linen, Designed in India",
    template: "%s · Vahnika",
  },
  description: SITE.description,
  // Pitch preview: keep it out of search indexes until launch.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Vahnika — Home & Apparel",
    description: SITE.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2e25",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-forest-950">
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
