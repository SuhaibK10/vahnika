"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Product } from "@/lib/products";
import { SITE, deliveryDate, formatINR } from "@/lib/site";
import { useCart } from "@/components/cart/CartContext";
import { HeartButton } from "@/components/wishlist/HeartButton";
import { ArrowIcon, CheckIcon, CottonIcon, MinusIcon, PlusIcon, ReturnIcon, ShieldIcon, TruckIcon, WhatsAppIcon } from "@/components/Icons";

export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [eta, setEta] = useState<string | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const size = product.sizes.find((s) => s.id === sizeId)!;

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Lets the floating WhatsApp button lift clear of the sticky bar
  useEffect(() => {
    document.documentElement.classList.toggle("buybar-open", stickyVisible);
    return () => document.documentElement.classList.remove("buybar-open");
  }, [stickyVisible]);

  function checkPin(e: FormEvent) {
    e.preventDefault();
    setEta(/^[1-9]\d{5}$/.test(pin) ? deliveryDate(4) : "invalid");
  }

  return (
    <div>
      <p className="eyebrow text-gold-deep">{product.family} · {product.category === "Quilts" ? "Quilt" : "Bedsheet set"}</p>
      <h1 className="mt-4 font-display text-[3.4rem] font-light leading-none lg:text-[4.2rem]">{product.name}</h1>
      <p className="mt-2 font-display text-2xl italic text-muted">{product.meaning}</p>
      <div className="mt-6 flex items-baseline gap-3">
        <p className="font-display text-[2.2rem]">{formatINR(size.price)}</p>
        <p className="text-xs text-muted">Inclusive of all taxes · Free shipping</p>
      </div>
      <p className="mt-5 text-[1rem] leading-relaxed text-ink/75">{product.short}</p>

      <div className="mt-7 flex items-center gap-3">
        {product.colours.map((c) => (
          <span key={c.name} className="flex items-center gap-1.5 text-xs text-muted">
            <span className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
            {c.name}
          </span>
        ))}
      </div>

      <fieldset className="mt-8">
        <legend className="eyebrow text-muted">Size</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {product.sizes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSizeId(s.id)}
              aria-pressed={s.id === sizeId}
              className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                s.id === sizeId ? "border-forest-700 bg-forest-800 text-ivory" : "border-ink/15 hover:border-forest-600"
              }`}
            >
              <span className="flex items-baseline justify-between">
                <span className="font-display text-xl">{s.label}</span>
                <span className="text-sm">{formatINR(s.price)}</span>
              </span>
              <span className={`mt-1 block text-[0.72rem] ${s.id === sizeId ? "text-ivory/70" : "text-muted"}`}>{s.dims}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div ref={ctaRef} className="mt-6 flex gap-3">
        <div className="flex items-center rounded-full border border-ink/15">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3.5"><MinusIcon /></button>
          <span className="w-6 text-center" aria-live="polite">{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="p-3.5"><PlusIcon /></button>
        </div>
        <button type="button" onClick={() => add(product.slug, sizeId, qty)} className="btn btn-forest flex-1">
          Add to bag · {formatINR(size.price * qty)}
        </button>
        <HeartButton slug={product.slug} name={product.name} className="w-[52px] shrink-0 border border-ink/15 hover:border-forest-700" />
      </div>
      <button
        type="button"
        onClick={() => {
          add(product.slug, sizeId, qty, false);
          router.push("/checkout");
        }}
        className="btn btn-gold mt-3 w-full"
      >
        Buy now <ArrowIcon />
      </button>

      <form onSubmit={checkPin} className="mt-8 rounded-2xl bg-ivory p-5">
        <label htmlFor="pincode" className="eyebrow text-muted">Check delivery</label>
        <div className="mt-3 flex gap-2">
          <input
            id="pincode"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              setEta(null);
            }}
            placeholder="Enter pincode"
            className="min-w-0 flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3 text-sm outline-none focus:border-forest-600"
          />
          <button className="rounded-full border border-forest-700 px-5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-forest-800 hover:bg-forest-800 hover:text-ivory">
            Check
          </button>
        </div>
        {eta && (
          <p className={`mt-3 flex items-center gap-2 text-sm ${eta === "invalid" ? "text-red-700" : "text-forest-700"}`}>
            {eta === "invalid" ? "Please enter a valid 6-digit pincode." : (<><CheckIcon /> Arrives by {eta} · Cash on delivery available</>)}
          </p>
        )}
      </form>

      <a href={SITE.whatsapp} className="mt-4 flex items-center gap-3 rounded-2xl border border-sand px-5 py-4 text-sm hover:border-forest-600">
        <WhatsAppIcon className="text-forest-700" />
        <span><span className="font-medium">Need a custom size?</span> <span className="text-muted">Send us your mattress size on WhatsApp.</span></span>
      </a>

      <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-sand pt-8">
        {[
          [CottonIcon, "100% pure cotton"],
          [TruckIcon, "Ships in 48 hours"],
          [ShieldIcon, "Cash on delivery"],
          [ReturnIcon, "7-day easy returns"],
        ].map(([Icon, label]) => {
          const I = Icon as typeof CottonIcon;
          return (
            <li key={label as string} className="flex items-center gap-3 text-sm text-ink/80">
              <I className="h-7 w-7 shrink-0 text-forest-700" /> {label as string}
            </li>
          );
        })}
      </ul>

      {/* Mobile sticky add-to-bag */}
      <div
        className={`fixed inset-x-0 bottom-[var(--mobile-nav-h)] z-40 border-t border-sand bg-paper/95 px-5 py-3 backdrop-blur-md transition-[translate,opacity] duration-500 lg:hidden ${
          stickyVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-xl leading-none">{product.name}</p>
            <p className="text-xs text-muted">{size.label} · {formatINR(size.price)}</p>
          </div>
          <button type="button" onClick={() => add(product.slug, sizeId, qty)} className="btn btn-forest !px-6">Add to bag</button>
        </div>
      </div>
    </div>
  );
}
