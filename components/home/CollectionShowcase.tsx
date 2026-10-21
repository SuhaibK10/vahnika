"use client";

import Link from "next/link";
import { useState } from "react";
import { FAMILIES, PRODUCTS, type PrintFamily } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";

type Tab = "All" | PrintFamily;
const TABS: Tab[] = ["All", ...FAMILIES.map((f) => f.name)];

export function CollectionShowcase() {
  const [tab, setTab] = useState<Tab>("All");
  const family = FAMILIES.find((f) => f.name === tab);
  const items = tab === "All" ? PRODUCTS.slice(0, 8) : PRODUCTS.filter((p) => p.family === tab);

  return (
    <section className="bg-ivory py-24 lg:py-36">
      <div className="container-x">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-gold-deep">The collection</p>
            <h2 className="display-lg mt-4 font-light">
              Prints to <em className="text-forest-700">live with</em>
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:items-end">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    tab === t ? "border-forest-800 bg-forest-800 text-ivory" : "border-ink/15 text-ink/70 hover:border-forest-700 hover:text-forest-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <Link href="/shop" className="link-underline hidden items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] lg:inline-flex">
              View all bed linen <ArrowIcon />
            </Link>
          </div>
        </Reveal>

        <div key={tab} className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {family && (
            <Reveal className="col-span-2 flex flex-col justify-end rounded-t-full bg-forest-800 p-8 text-ivory sm:p-10 lg:col-span-1 lg:aspect-[4/5]">
              <p className="eyebrow text-gold">{family.name}</p>
              <p className="mt-4 font-display text-[1.7rem] leading-snug">{family.description}</p>
              <Link href={`/prints#${family.name.toLowerCase().replace(/ /g, "-")}`} className="link-underline mt-6 inline-flex items-center gap-2 self-start pb-0.5 text-[0.68rem] uppercase tracking-[0.2em] text-gold-soft">
                Read the stories <ArrowIcon />
              </Link>
            </Reveal>
          )}
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center lg:hidden">
          <Link href="/shop" className="btn btn-ghost-dark">View all bed linen <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  );
}
