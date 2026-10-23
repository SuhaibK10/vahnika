"use client";

import Image from "next/image";
import Link from "next/link";
import { fromPrice, type Product } from "@/lib/products";
import { formatINR } from "@/lib/site";
import { useCart } from "@/components/cart/CartContext";
import { ArrowIcon } from "@/components/Icons";
import { HeartButton } from "@/components/wishlist/HeartButton";

// Smaller than the site's default .btn so three actions fit on one line on a phone
const compact = "h-10 whitespace-nowrap !gap-2 !px-5 !py-0 !text-[0.64rem] !tracking-[0.18em]";

// One print per row for the shop's list view. On phones it is a full-width arch card with the extra detail;
// from md up it turns sideways, photo on the left and the story, colours and sizes on the right.
export function ProductListItem({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const [primary, hover] = product.images;
  const kind = product.category === "Quilts" ? "Quilt" : "Bedsheet set";

  return (
    <div className="@container">
      <article className="group flex flex-col overflow-hidden rounded-t-[50cqw] rounded-b-[22px] border border-forest-700 bg-paper transition-[box-shadow] duration-500 hover:shadow-[0_28px_44px_-30px_rgba(15,46,37,.5)] md:flex-row md:rounded-[28px]">
        <div className="relative md:w-[42%] md:shrink-0">
          <Link
            href={`/products/${product.slug}`}
            className="relative block aspect-[6/7] overflow-hidden rounded-t-full bg-sand md:aspect-auto md:h-full md:min-h-[300px] md:rounded-none lg:min-h-[370px]"
            aria-label={`${product.name}, ${product.meaning}`}
          >
            <Image
              src={primary}
              alt={`${product.name} ${kind.toLowerCase()}`}
              fill
              sizes="(min-width: 1440px) 560px, (min-width: 768px) 42vw, 100vw"
              priority={priority}
              placeholder="blur"
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
            />
            {hover && (
              <Image src={hover} alt="" fill sizes="(min-width: 1440px) 560px, (min-width: 768px) 42vw, 100vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            )}
          </Link>
          {product.badge && (
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-forest-800 backdrop-blur">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6 md:justify-center md:p-8 lg:px-12">
          <p className="eyebrow hidden text-gold-deep md:block">
            {product.family} · {kind}
          </p>
          <div className="flex items-start justify-between gap-4 md:mt-4">
            <div className="min-w-0">
              <h3 className="font-display text-[1.9rem] leading-none md:text-[2.4rem] lg:text-[2.8rem]">
                <Link href={`/products/${product.slug}`}>{product.name}</Link>
              </h3>
              <p className="mt-2 font-display text-[1.1rem] italic leading-snug text-muted md:text-xl">{product.meaning}</p>
            </div>
            <p className="shrink-0 pt-1 text-[0.95rem] md:text-base">
              {product.sizes.length > 1 && <span className="text-muted">from </span>}
              {formatINR(fromPrice(product))}
            </p>
          </div>

          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink/75 md:mt-4">{product.short}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            {product.colours.map((c) => (
              <span key={c.name} className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
                {c.name}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <span key={s.id} className="rounded-full border border-ink/15 px-4 py-1.5 text-xs">
                {s.label} <span className="text-muted">· {formatINR(s.price)}</span>
              </span>
            ))}
          </div>

          <div className="mt-5 flex gap-2.5">
            <button type="button" onClick={() => add(product.slug, product.sizes[0].id)} className={`btn btn-forest ${compact}`}>
              Add to bag
            </button>
            <Link href={`/products/${product.slug}`} className={`btn btn-ghost-dark ${compact}`}>
              View <ArrowIcon width={14} height={14} />
            </Link>
            <HeartButton slug={product.slug} name={product.name} className="h-10 w-10 shrink-0 border border-ink/15 hover:border-forest-700" />
          </div>
        </div>
      </article>
    </div>
  );
}
