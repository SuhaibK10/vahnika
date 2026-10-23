"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { ArrowIcon, HeartIcon } from "@/components/Icons";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { PRODUCTS } from "@/lib/products";

export function WishlistView() {
  const { slugs, ready } = useWishlist();
  const { add } = useCart();
  const saved = slugs.flatMap((s) => PRODUCTS.filter((p) => p.slug === s));

  if (!ready) return <div className="min-h-[50vh]" />;

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-ivory text-forest-700">
          <HeartIcon width={34} height={34} />
        </span>
        <p className="mt-8 font-display text-4xl">Nothing saved yet.</p>
        <p className="mt-3 max-w-sm text-ink/70">Tap the heart on any print to keep it here for later.</p>
        <Link href="/shop" className="btn btn-forest mt-10">
          Browse the collection <ArrowIcon />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
        <p>
          <span className="text-ink">{saved.length}</span> {saved.length === 1 ? "print" : "prints"} saved
        </p>
        <button onClick={() => saved.forEach((p) => add(p.slug, p.sizes[0].id))} className="btn btn-ghost-dark !px-5 !py-2.5">
          Add all to bag
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-4">
        {saved.map((p) => (
          <ProductCard key={p.slug} product={p} sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 50vw" />
        ))}
      </div>
    </>
  );
}
