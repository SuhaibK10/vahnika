"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product, type Size } from "@/lib/products";

type CartItem = { slug: string; sizeId: string; qty: number };
export type CartLine = CartItem & { product: Product; size: Size; lineTotal: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  /** False until the saved bag has been read from localStorage */
  ready: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, sizeId: string, qty?: number, openBag?: boolean) => void;
  setQty: (slug: string, sizeId: string, qty: number) => void;
  remove: (slug: string, sizeId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vahnika-bag";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const add = useCallback((slug: string, sizeId: string, qty = 1, openBag = true) => {
    setItems((prev) => {
      const hit = prev.find((i) => i.slug === slug && i.sizeId === sizeId);
      if (hit) return prev.map((i) => (i === hit ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, sizeId, qty }];
    });
    if (openBag) setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, sizeId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.sizeId === sizeId))
        : prev.map((i) => (i.slug === slug && i.sizeId === sizeId ? { ...i, qty } : i)),
    );
  }, []);

  const remove = useCallback((slug: string, sizeId: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.sizeId === sizeId)));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((i) => {
      const product = PRODUCTS.find((p) => p.slug === i.slug);
      const size = product?.sizes.find((s) => s.id === i.sizeId);
      return product && size ? [{ ...i, product, size, lineTotal: size.price * i.qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      isOpen,
      ready: hydrated,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQty,
      remove,
      clear: () => setItems([]),
    };
  }, [items, isOpen, hydrated, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
