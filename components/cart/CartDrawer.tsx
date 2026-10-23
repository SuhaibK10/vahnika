"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartContext";
import { formatINR } from "@/lib/site";
import { CloseIcon, MinusIcon, PlusIcon, ArrowIcon, CheckIcon } from "@/components/Icons";
import { Emblem } from "@/components/Emblem";

export function CartDrawer() {
  const { lines, subtotal, count, isOpen, close, setQty, remove } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div className={`fixed inset-0 z-[80] overflow-hidden ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-forest-950/50 backdrop-blur-[2px] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Your bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-paper transition-transform duration-700 ease-[var(--ease-silk)] ${isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-sand px-6 py-5">
          <div>
            <p className="eyebrow text-gold-deep">Your bag</p>
            <p className="font-display text-2xl">{count} {count === 1 ? "piece" : "pieces"}</p>
          </div>
          <button onClick={close} aria-label="Close bag" className="rounded-full p-2 hover:bg-sand/60">
            <CloseIcon />
          </button>
        </header>

        <div className="flex items-center gap-2 bg-forest-800 px-6 py-3 text-[0.78rem] text-ivory">
          <CheckIcon className="text-gold" />
          Complimentary shipping &amp; cash on delivery on every order
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <Emblem className="mb-6 h-20 w-20 text-forest-700" vColor="#1A4D3C" />
            <p className="font-display text-3xl">Your bag is resting.</p>
            <p className="mt-3 text-sm text-muted">Find a print to fall asleep in.</p>
            <Link href="/shop" onClick={close} className="btn btn-forest mt-8">
              Shop the collection <ArrowIcon />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-sand overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.slug + l.sizeId} className="flex gap-4 py-5">
                  <Link href={`/products/${l.slug}`} onClick={close} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-t-full bg-sand">
                    <Image src={l.product.images[0]} alt={l.product.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl leading-tight">{l.product.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{l.product.category === "Quilts" ? "Quilt" : "Bedsheet set"} · {l.size.label}</p>
                      </div>
                      <p className="text-sm">{formatINR(l.lineTotal)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-sand">
                        <button aria-label="Decrease" onClick={() => setQty(l.slug, l.sizeId, l.qty - 1)} className="p-2"><MinusIcon /></button>
                        <span className="w-6 text-center text-sm">{l.qty}</span>
                        <button aria-label="Increase" onClick={() => setQty(l.slug, l.sizeId, l.qty + 1)} className="p-2"><PlusIcon /></button>
                      </div>
                      <button onClick={() => remove(l.slug, l.sizeId)} className="text-xs text-muted underline underline-offset-4 hover:text-ink">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="border-t border-sand px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-muted">Subtotal</span>
                <span className="font-display text-3xl">{formatINR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">Inclusive of all taxes. Shipping is always free.</p>
              <Link href="/checkout" onClick={close} className="btn btn-gold mt-5 w-full">
                Proceed to checkout <ArrowIcon />
              </Link>
              <p className="mt-4 text-center text-[0.68rem] tracking-[0.18em] text-muted">UPI · VISA · MASTERCARD · RUPAY · COD</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
