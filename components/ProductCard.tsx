"use client";

import Image from "next/image";
import Link from "next/link";
import { fromPrice, type Product } from "@/lib/products";
import { formatINR } from "@/lib/site";
import { useCart } from "@/components/cart/CartContext";
import { PlusIcon } from "@/components/Icons";
import { HeartButton } from "@/components/wishlist/HeartButton";

export function ProductCard({ product, priority = false, sizes = "(min-width: 1024px) 25vw, 50vw" }: { product: Product; priority?: boolean; sizes?: string }) {
  const { add } = useCart();
  const [primary, hover] = product.images;

  return (
    // The card's arch is sized off its own width (cqw), so it stays a true semicircle that hugs
    // the image's arch, while the bottom corners keep a small radius.
    <div className="@container h-full">
      <article className="group flex h-full flex-col rounded-t-[50cqw] rounded-b-[22px] overflow-hidden border border-forest-700 bg-paper transition-[box-shadow,translate] duration-500 ease-[var(--ease-silk)] hover:-translate-y-1 hover:shadow-[0_28px_44px_-30px_rgba(15,46,37,.5)]">
        <div className="relative">
          <Link
            href={`/products/${product.slug}`}
            className="relative block aspect-[4/5] overflow-hidden rounded-t-full bg-sand"
            aria-label={`${product.name}, ${product.meaning}`}
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
            className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-forest-800 text-ivory shadow-lg transition-all duration-500 hover:bg-gold hover:text-forest-950 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          >
            <PlusIcon width={14} height={14} />
          </button>
        </div>
        <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
          <div className="flex flex-col gap-1 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
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
          <div className="mt-auto flex items-center gap-1.5 pt-3">
            {product.colours.map((c) => (
              <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
            ))}
            <span className="ml-2 hidden text-[0.68rem] uppercase tracking-[0.18em] text-muted sm:inline">{product.family}</span>
            <HeartButton slug={product.slug} name={product.name} className="-my-2 -mr-2 ml-auto h-9 w-9 shrink-0 hover:bg-sand/60" />
          </div>
        </div>
      </article>
    </div>
  );
}
