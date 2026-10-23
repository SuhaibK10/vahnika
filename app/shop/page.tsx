import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Bed Linen",
  description: "Pure cotton bedsheet sets and quilts in named Jaipuri prints. Complimentary shipping and cash on delivery across India.",
};

type SearchParams = Promise<{ palette?: string; category?: string; family?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <>
      {/* Kept short so the prints start near the top of the screen */}
      <section className="border-b border-sand bg-paper">
        <div className="container-x flex flex-col gap-2 pb-6 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:pb-8 lg:pt-10">
          {/* Above the fold: CSS-only entrance so it paints before hydration */}
          <div className="animate-fade-up">
            <p className="eyebrow text-gold-deep">Bed linen · {PRODUCTS.length} prints</p>
            <h1 className="display-md mt-2 font-light">
              The <em className="text-forest-700">Collection</em>
            </h1>
          </div>
          <p className="animate-fade-up text-[0.95rem] text-ink/65 sm:max-w-sm sm:text-right [animation-delay:120ms]">
            Every set comes with matching pillow covers and ships free across India.
          </p>
        </div>
      </section>
      <ShopGrid
        key={`${params.palette}-${params.category}-${params.family}`}
        initialPalette={params.palette}
        initialCategory={params.category}
        initialFamily={params.family}
      />
    </>
  );
}
