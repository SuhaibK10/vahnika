"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { STORAGE } from "@/lib/site";

type WishlistValue = {
  slugs: string[];
  /** False until the saved list has been read from localStorage */
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

const WishlistContext = createContext<WishlistValue | null>(null);

// Saved prints, kept in localStorage for the pitch (like the bag)
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE.wishlist);
      if (saved) setSlugs(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE.wishlist, JSON.stringify(slugs));
    } catch {}
  }, [slugs, ready]);

  const toggle = useCallback((slug: string) => setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug])), []);

  const value = useMemo<WishlistValue>(() => ({ slugs, ready, has: (slug) => slugs.includes(slug), toggle }), [slugs, ready, toggle]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
