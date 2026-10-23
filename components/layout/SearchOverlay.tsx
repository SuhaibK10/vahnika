"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon, CloseIcon, SearchIcon } from "@/components/Icons";
import { ARTICLES } from "@/lib/journal";
import { PRODUCTS, fromPrice, type Product } from "@/lib/products";
import { formatINR } from "@/lib/site";

const POPULAR = ["Jaipuri", "Quilt", "Indigo", "Mughal Garden", "King", "Rose"];
// Everyday words mapped onto the catalogue's own vocabulary
const SYNONYMS: Record<string, string> = {
  blue: "indigo",
  pink: "rose",
  yellow: "mustard",
  white: "ivory",
  grey: "charcoal",
  gray: "charcoal",
  sheet: "bedsheet",
  sheets: "bedsheet",
  bedsheets: "bedsheet",
  comforter: "quilt",
  quilts: "quilt",
  floral: "garden",
};

function haystack(p: Product) {
  return [p.name, p.meaning, p.family, p.category, p.print, p.short, p.badge ?? "", ...p.palette, ...p.colours.map((c) => c.name), ...p.sizes.map((s) => s.label)]
    .join(" ")
    .toLowerCase();
}

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
    document.documentElement.classList.add("modal-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const { products, articles } = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean).map((t) => SYNONYMS[t] ?? t);
    if (!terms.length) return { products: [], articles: [] };
    return {
      products: PRODUCTS.filter((p) => terms.every((t) => haystack(p).includes(t))),
      articles: ARTICLES.filter((a) => terms.every((t) => `${a.title} ${a.dek} ${a.category}`.toLowerCase().includes(t))).slice(0, 3),
    };
  }, [q]);

  const trending = PRODUCTS.filter((p) => p.badge).slice(0, 4);
  const searching = q.trim().length > 0;

  return (
    <div role="dialog" aria-modal="true" aria-label="Search" className="animate-fade-in fixed inset-0 z-[85] flex flex-col bg-paper">
      <div className="border-b border-sand">
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="container-x flex h-20 items-center gap-4 lg:h-28"
        >
          <SearchIcon width={26} height={26} className="shrink-0 text-forest-700" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search prints, colours, stories…"
            aria-label="Search"
            className="min-w-0 flex-1 bg-transparent font-display text-[1.7rem] font-light outline-none placeholder:text-muted/60 sm:text-4xl lg:text-5xl"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="-mr-2 shrink-0 rounded-full p-2 hover:bg-sand/60">
            <CloseIcon width={24} height={24} />
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto pb-[calc(var(--mobile-nav-h)+2rem)]">
        <div className="container-x py-10 lg:py-14">
          {!searching ? (
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow text-gold-deep">Popular searches</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {POPULAR.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQ(t)}
                      className="rounded-full border border-ink/15 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink/75 transition-colors hover:border-forest-700 hover:text-forest-700"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8">
                <p className="eyebrow text-gold-deep">Most loved right now</p>
                <Tiles products={trending} onPick={onClose} />
              </div>
            </div>
          ) : products.length === 0 && articles.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-display text-4xl">
                Nothing for <em className="text-forest-700">&ldquo;{q}&rdquo;</em> yet.
              </p>
              <p className="mt-3 text-sm text-muted">Try a colour, a print family or a size.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {POPULAR.map((t) => (
                  <button key={t} onClick={() => setQ(t)} className="rounded-full border border-ink/15 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink/75 hover:border-forest-700">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-14">
              {products.length > 0 && (
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="eyebrow text-gold-deep">
                      {products.length} {products.length === 1 ? "print" : "prints"}
                    </p>
                    <Link href="/shop" onClick={onClose} className="link-underline flex items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em]">
                      View the collection <ArrowIcon />
                    </Link>
                  </div>
                  <Tiles products={products} onPick={onClose} />
                </div>
              )}
              {articles.length > 0 && (
                <div>
                  <p className="eyebrow text-gold-deep">From the Journal</p>
                  <ul className="mt-5 divide-y divide-sand border-y border-sand">
                    {articles.map((a) => (
                      <li key={a.slug}>
                        <Link href={`/journal/${a.slug}`} onClick={onClose} className="group flex items-center justify-between gap-6 py-5">
                          <span>
                            <span className="block font-display text-2xl leading-tight group-hover:text-forest-700">{a.title}</span>
                            <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted">
                              {a.category} · {a.readTime}
                            </span>
                          </span>
                          <ArrowIcon className="shrink-0 text-gold-deep transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Tiles({ products, onPick }: { products: Product[]; onPick: () => void }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
      {products.map((p) => (
        <li key={p.slug}>
          <Link href={`/products/${p.slug}`} onClick={onPick} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-sand">
              <Image src={p.images[0]} alt="" fill sizes="(min-width:1024px) 16vw, 45vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <p className="mt-3 font-display text-xl leading-tight">{p.name}</p>
            <p className="text-xs text-muted">
              {p.family} · {p.sizes.length > 1 && "from "}
              {formatINR(fromPrice(p))}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
