"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FAMILIES, PALETTES, PRODUCTS, fromPrice, type Category, type Palette, type PrintFamily } from "@/lib/products";
import { MEDIA } from "@/lib/media";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, ChevronIcon, CloseIcon, GiftIcon } from "@/components/Icons";

type Sort = "featured" | "price-asc" | "price-desc";
const CATEGORIES: Category[] = ["Bedsheet Sets", "Quilts"];

function pick<T extends string>(value: string | undefined, allowed: readonly T[]) {
  return allowed.find((a) => a === value) ?? null;
}

export function ShopGrid({ initialPalette, initialCategory, initialFamily }: { initialPalette?: string; initialCategory?: string; initialFamily?: string }) {
  const [palette, setPalette] = useState<Palette | null>(pick(initialPalette, PALETTES.map((p) => p.name)));
  const [category, setCategory] = useState<Category | null>(pick(initialCategory, CATEGORIES));
  const [family, setFamily] = useState<PrintFamily | null>(pick(initialFamily, FAMILIES.map((f) => f.name)));
  const [sort, setSort] = useState<Sort>("featured");

  const results = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) => (!palette || p.palette.includes(palette)) && (!category || p.category === category) && (!family || p.family === family),
    );
    if (sort === "price-asc") return [...list].sort((a, b) => fromPrice(a) - fromPrice(b));
    if (sort === "price-desc") return [...list].sort((a, b) => fromPrice(b) - fromPrice(a));
    return list;
  }, [palette, category, family, sort]);

  const filtered = Boolean(palette || category || family);
  const clear = () => {
    setPalette(null);
    setCategory(null);
    setFamily(null);
  };

  return (
    <section className="bg-paper pb-28">
      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-sand bg-paper/92 backdrop-blur-md lg:top-[76px]">
        <div className="container-x flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <Pill active={!family} onClick={() => setFamily(null)}>All prints</Pill>
            {FAMILIES.map((f) => (
              <Pill key={f.name} active={family === f.name} onClick={() => setFamily(family === f.name ? null : f.name)}>
                {f.name}
              </Pill>
            ))}
            <span className="mx-2 h-6 w-px shrink-0 bg-sand" />
            {PALETTES.map((p) => (
              <button
                key={p.name}
                title={p.name}
                aria-label={`Filter by ${p.name}`}
                aria-pressed={palette === p.name}
                onClick={() => setPalette(palette === p.name ? null : p.name)}
                className={`h-7 w-7 shrink-0 rounded-full ring-offset-2 ring-offset-paper transition-all ${palette === p.name ? "ring-2 ring-forest-700" : "ring-1 ring-black/10 hover:ring-forest-500"}`}
                style={{ background: p.hex }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <div className="flex items-center gap-2">
              {CATEGORIES.map((c) => (
                <Pill key={c} active={category === c} onClick={() => setCategory(category === c ? null : c)}>
                  {c}
                </Pill>
              ))}
            </div>
            <label className="relative flex items-center">
              <span className="sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="appearance-none rounded-full border border-ink/15 bg-transparent py-2.5 pl-5 pr-10 text-[0.68rem] font-medium uppercase tracking-[0.16em] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
              <ChevronIcon className="pointer-events-none absolute right-4" />
            </label>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="flex items-center justify-between py-8 text-sm text-muted">
          <p>
            Showing <span className="text-ink">{results.length}</span> {results.length === 1 ? "print" : "prints"}
            {palette && <> in <em className="font-display text-base text-forest-700">{palette}</em></>}
          </p>
          {filtered && (
            <button onClick={clear} className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] hover:text-ink">
              <CloseIcon width={14} height={14} /> Clear filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-4xl">Nothing in this combination — yet.</p>
            <button onClick={clear} className="btn btn-ghost-dark mt-8">Show all prints</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
            {results.map((p, i) => (
              <FragmentWithInterstitial key={p.slug} index={i} show={!filtered}>
                {i < 3 ? (
                  // First row is above the fold: render immediately for a fast LCP
                  <div><ProductCard product={p} priority={i < 2} sizes="(min-width: 1024px) 30vw, 50vw" /></div>
                ) : (
                  <Reveal delay={(i % 3) * 90}>
                    <ProductCard product={p} sizes="(min-width: 1024px) 30vw, 50vw" />
                  </Reveal>
                )}
              </FragmentWithInterstitial>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FragmentWithInterstitial({ index, show, children }: { index: number; show: boolean; children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Editorial cards keep the unfiltered 9-print grid even: 9 + 2-col + 1-col = 12 slots */}
      {show && index === 3 && (
        <Reveal className="col-span-2">
          <Link href="/prints" className="group relative flex aspect-[16/10] h-full flex-col justify-end overflow-hidden rounded-[28px] p-8 text-ivory sm:p-12 lg:aspect-auto">
            <Image src={MEDIA.jharokha} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent" />
            <span className="relative eyebrow text-gold">The Print Library</span>
            <span className="relative mt-3 max-w-md font-display text-[2.2rem] leading-tight lg:text-[3rem]">Every print has a story worth knowing.</span>
            <span className="relative mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold-soft">
              Read the stories <ArrowIcon />
            </span>
          </Link>
        </Reveal>
      )}
      {show && index === 7 && (
        <Reveal>
          <Link href="/#gifting" className="group flex aspect-[4/5] flex-col justify-end rounded-t-full bg-forest-800 p-6 text-ivory sm:p-10">
            <GiftIcon className="h-9 w-9 text-gold" />
            <span className="eyebrow mt-6 text-gold">Gifting</span>
            <span className="mt-3 font-display text-[1.6rem] leading-tight sm:text-[2rem]">Beautifully boxed, with a handwritten note.</span>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-gold-soft">
              Gift a set <ArrowIcon />
            </span>
          </Link>
        </Reveal>
      )}
    </>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.16em] transition-colors ${
        active ? "border-forest-800 bg-forest-800 text-ivory" : "border-ink/15 text-ink/70 hover:border-forest-700"
      }`}
    >
      {children}
    </button>
  );
}
