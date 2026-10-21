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
      <section className="border-b border-sand bg-paper">
        <div className="container-x grid gap-8 pb-14 pt-16 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-24">
          {/* Above the fold: CSS-only entrance so it paints before hydration */}
          <div className="animate-fade-up lg:col-span-7">
            <p className="eyebrow text-gold-deep">Bed linen · {PRODUCTS.length} prints</p>
            <h1 className="display-xl mt-5 font-light">
              The <em className="text-forest-700">Collection</em>
            </h1>
          </div>
          <div className="animate-fade-up lg:col-span-5 [animation-delay:120ms]">
            <p className="text-[1.03rem] leading-[1.85] text-ink/70">
              Pure cotton bedsheet sets and quilts, each in a print with its own name and story. Every set arrives with
              matching pillow covers — and ships free, anywhere in India.
            </p>
          </div>
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
