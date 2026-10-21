"use client";

import Image from "next/image";
import Link from "next/link";
import { fromPrice, type Product } from "@/lib/products";
import { formatINR } from "@/lib/site";
import { useCart } from "@/components/cart/CartContext";
import { PlusIcon } from "@/components/Icons";

export function ProductCard({ product, priority = false, sizes = "(min-width: 1024px) 25vw, 50vw" }: { product: Product; priority?: boolean; sizes?: string }) {
  const { add } = useCart();
  const [primary, hover] = product.images;

  return (
    <article className="group">
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden rounded-t-full bg-sand"
          aria-label={`${product.name} — ${product.meaning}`}
        >
          <Image
            src={primary}
            alt={`${product.name} ${product.category === "Quilts" ? "quilt" : "bedsheet set"}`}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
          />
          {hover && (
            <Image
              src={hover}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          <span className="pointer-events-none absolute inset-0 rounded-t-full ring-1 ring-inset ring-black/5" />
        </Link>
        {product.badge && (
          <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-forest-800 backdrop-blur">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => add(product.slug, product.sizes[0].id)}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-forest-800 text-ivory shadow-lg transition-all duration-500 hover:bg-gold hover:text-forest-950 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          <PlusIcon />
        </button>
      </div>
      <div className="mt-5 flex flex-col gap-1 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[1.45rem] leading-none sm:text-[1.6rem]">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1.5 font-display text-[1rem] italic leading-snug text-muted">{product.meaning}</p>
        </div>
        <p className="shrink-0 text-[0.9rem] lg:pt-1">
          {product.sizes.length > 1 && <span className="text-muted">from </span>}
          {formatINR(fromPrice(product))}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {product.colours.map((c) => (
          <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
        ))}
        <span className="ml-2 hidden text-[0.68rem] uppercase tracking-[0.18em] text-muted sm:inline">{product.family}</span>
      </div>
    </article>
  );
}
