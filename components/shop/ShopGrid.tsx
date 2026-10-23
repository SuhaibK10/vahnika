"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { FAMILIES, PALETTES, PRODUCTS, fromPrice, type Category, type Palette, type PrintFamily } from "@/lib/products";
import { MEDIA } from "@/lib/media";
import { ProductCard } from "@/components/ProductCard";
import { ProductListItem } from "@/components/shop/ProductListItem";
import { Reveal } from "@/components/Reveal";
import { ScrollHint, useScrollHint } from "@/components/ScrollHint";
import { ArrowIcon, ChevronIcon, CloseIcon, GridIcon, ListIcon } from "@/components/Icons";

type Sort = "featured" | "price-asc" | "price-desc";
type View = "grid" | "list";
const CATEGORIES: Category[] = ["Bedsheet Sets", "Quilts"];

function pick<T extends string>(value: string | undefined, allowed: readonly T[]) {
  return allowed.find((a) => a === value) ?? null;
}

export function ShopGrid({ initialPalette, initialCategory, initialFamily }: { initialPalette?: string; initialCategory?: string; initialFamily?: string }) {
  const [palette, setPalette] = useState<Palette | null>(pick(initialPalette, PALETTES.map((p) => p.name)));
  // No category buttons; the footer's "Bedsheet sets" and "Quilts" links still filter via ?category=
  const [category, setCategory] = useState<Category | null>(pick(initialCategory, CATEGORIES));
  const [family, setFamily] = useState<PrintFamily | null>(pick(initialFamily, FAMILIES.map((f) => f.name)));
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<View>("grid");
  const familyRow = useRef<HTMLDivElement>(null);
  const familyScroll = useScrollHint(familyRow);

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
      {/* Filter bar — pinned under the header from lg up. On phones its rows would cover a quarter of the screen, so it scrolls away. */}
      <div className="relative z-30 border-b border-sand bg-paper/92 backdrop-blur-md lg:sticky lg:top-[76px]">
        <div className="container-x flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:gap-2">
          <div ref={familyRow} className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <Pill active={!family} onClick={() => setFamily(null)}>All prints</Pill>
            {FAMILIES.map((f) => (
              <Pill key={f.name} active={family === f.name} onClick={() => setFamily(family === f.name ? null : f.name)}>
                {f.name}
              </Pill>
            ))}
          </div>
          {/* Only when the families run off-screen (phones): shows there is more to swipe to */}
          {familyScroll.width < 0.99 && <ScrollHint left={familyScroll.left} width={familyScroll.width} className="-mt-1 lg:hidden" />}
          <span className="mx-2 hidden h-6 w-px shrink-0 bg-sand lg:block" />
          {/* Colours and sort share a row: under the print families on phones, filling the rest of the bar from lg up */}
          <div className="flex items-center justify-between gap-3 lg:flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p.name}
                  title={p.name}
                  aria-label={`Filter by ${p.name}`}
                  aria-pressed={palette === p.name}
                  onClick={() => setPalette(palette === p.name ? null : p.name)}
                  className={`h-6 w-6 shrink-0 rounded-full ring-offset-2 ring-offset-paper transition-all sm:h-7 sm:w-7 ${palette === p.name ? "ring-2 ring-forest-700" : "ring-1 ring-black/10 hover:ring-forest-500"}`}
                  style={{ background: p.hex }}
                />
              ))}
            </div>
            <label className="relative flex shrink-0 items-center">
              <span className="sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="appearance-none rounded-full border border-ink/15 bg-transparent py-2.5 pl-4 pr-9 text-[0.68rem] font-medium uppercase tracking-[0.16em] outline-none sm:pl-5 sm:pr-10"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Lowest price</option>
                <option value="price-desc">Highest price</option>
              </select>
              <ChevronIcon className="pointer-events-none absolute right-3.5 sm:right-4" />
            </label>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="flex items-center justify-between gap-4 py-8 text-sm text-muted">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
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
          {/* Layout switch: one print per row, or the grid */}
          <div role="group" aria-label="Layout" className="flex shrink-0 items-center gap-1 rounded-full border border-ink/15 p-1">
            {(["list", "grid"] as const).map((v) => {
              const Icon = v === "list" ? ListIcon : GridIcon;
              return (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  aria-label={v === "list" ? "List view" : "Grid view"}
                  className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${view === v ? "bg-forest-800 text-ivory" : "text-ink/60 hover:text-forest-700"}`}
                >
                  <Icon width={16} height={16} />
                </button>
              );
            })}
          </div>
        </div>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-4xl">Nothing in this combination yet.</p>
            <button onClick={clear} className="btn btn-ghost-dark mt-8">Show all prints</button>
          </div>
        ) : view === "list" ? (
          <div className="grid gap-8 lg:gap-10">
            {results.map((p, i) =>
              i < 2 ? (
                <ProductListItem key={p.slug} product={p} priority={i === 0} />
              ) : (
                <Reveal key={p.slug}>
                  <ProductListItem product={p} />
                </Reveal>
              ),
            )}
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
      {/* The Print Library tile keeps the unfiltered 8-print grid even: two columns wide on phones (8 + 2 = 10),
          one tile in the three-column desktop grid (8 + 1 = 9) */}
      {show && index === 3 && (
        <Reveal className="col-span-2 lg:col-span-1">
          <Link href="/prints" className="group relative flex aspect-[16/10] h-full flex-col justify-end overflow-hidden rounded-[28px] p-8 text-ivory sm:p-12 lg:aspect-auto">
            <Image src={MEDIA.jharokha} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent" />
            <span className="relative eyebrow text-gold">The Print Library</span>
            <span className="relative mt-3 max-w-md font-display text-[2.2rem] leading-tight">Every print has a story worth knowing.</span>
            <span className="relative mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold-soft">
              Read the stories <ArrowIcon />
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
