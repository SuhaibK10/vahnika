import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SpinToWin } from "@/components/SpinToWin";

// Self-hosted (Google Fonts' latin variable files) so the type never depends on reaching fonts.googleapis.com
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic-latin.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const jost = localFont({
  src: "./fonts/jost-latin.woff2",
  weight: "100 900",
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vahnika · Pure Cotton Bed Linen, Designed in India",
    template: "%s · Vahnika",
  },
  description: SITE.description,
  // Pitch preview: keep it out of search indexes until launch.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Vahnika · Home & Apparel",
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
          <WishlistProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-forest-950">
              Skip to content
            </a>
            <ScrollProgress />
            <AnnouncementBar />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppButton />
            <MobileNav />
            <CartDrawer />
            <SpinToWin />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
