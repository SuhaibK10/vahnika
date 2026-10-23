"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Emblem, Wordmark } from "@/components/Emblem";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon, WhatsAppIcon, InstagramIcon, ArrowIcon } from "@/components/Icons";
import { useCart } from "@/components/cart/CartContext";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { useWishlist } from "@/components/wishlist/WishlistContext";

const MENU_EXTRAS = [
  { href: "/account", label: "My account" },
  { href: "/track-order", label: "Track order" },
  { href: "/help", label: "Help" },
];

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const { slugs: saved } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const closeSearch = useCallback(() => setSearch(false), []);

  // Pages whose first section is a dark full-bleed hero get a transparent header on top.
  const overHero = pathname === "/" || pathname === "/prints" || pathname === "/our-story" || pathname === "/bed-to-body";
  const solid = !overHero || scrolled || menu;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menu);
  }, [menu]);

  const tone = solid && !menu ? "text-ink" : "text-ivory";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid && !menu ? "border-b border-sand/80 bg-paper/90 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        } ${tone}`}
      >
        <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[76px]">
          <nav className="flex items-center gap-8" aria-label="Main">
            <button onClick={() => setMenu((m) => !m)} className="-ml-2 p-2 lg:hidden" aria-label={menu ? "Close menu" : "Open menu"}>
              {menu ? <CloseIcon /> : <MenuIcon />}
            </button>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline hidden pb-0.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] lg:inline ${
                  pathname.startsWith(item.href) ? "text-gold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="flex items-center gap-3" aria-label="Vahnika home">
            <Emblem className="h-9 w-9 lg:h-10 lg:w-10" vColor={solid && !menu ? "#1A4D3C" : "#F5EFE6"} />
            <Wordmark className="hidden sm:flex" />
          </Link>

          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <Link href="/our-story" className="link-underline mr-3 hidden pb-0.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] lg:inline">
              Our Story
            </Link>
            {/* Below desktop the bag lives in the bottom tab bar and the account in the menu */}
            <Link href="/wishlist" className={`relative p-2 ${pathname === "/wishlist" ? "text-gold" : ""}`} aria-label={`Wishlist, ${saved.length} saved`}>
              <HeartIcon />
              {saved.length > 0 && (
                <span className="absolute right-0 top-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[0.62rem] font-medium text-forest-950">
                  {saved.length}
                </span>
              )}
            </Link>
            <button onClick={() => setSearch(true)} className="-mr-2 p-2 lg:mr-0" aria-label="Search">
              <SearchIcon />
            </button>
            <Link href="/account" className={`hidden p-2 lg:block ${pathname === "/account" ? "text-gold" : ""}`} aria-label="My account">
              <UserIcon />
            </Link>
            <button onClick={open} className="relative -mr-2 hidden p-2 lg:block" aria-label={`Open bag, ${count} items`}>
              <BagIcon />
              {count > 0 && (
                <span className="absolute right-0 top-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[0.62rem] font-medium text-forest-950">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`grain fixed inset-0 z-40 flex flex-col bg-forest-900 pt-28 text-ivory transition-[opacity,visibility] duration-500 lg:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1" aria-label="Mobile">
          {[...NAV, { href: "/our-story", label: "Our Story" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-ivory/10 py-4 font-display text-4xl"
              style={{ transition: `opacity .6s ${i * 60}ms, transform .6s ${i * 60}ms`, opacity: menu ? 1 : 0, transform: menu ? "none" : "translateY(16px)" }}
            >
              {item.label}
              <ArrowIcon className="text-gold" />
            </Link>
          ))}
        </nav>
        <div
          className="container-x mt-8 flex flex-wrap gap-x-6 gap-y-2"
          style={{ transition: "opacity .6s 360ms", opacity: menu ? 1 : 0 }}
        >
          {MENU_EXTRAS.map((item) => (
            <Link key={item.href} href={item.href} className="py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/70 hover:text-gold-soft">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="container-x mt-auto pb-[calc(var(--mobile-nav-h)+2.5rem)]">
          <p className="font-display text-xl italic text-gold-soft">{SITE.tagline}</p>
          <div className="mt-6 flex gap-4 text-sm text-ivory/70">
            <a href={SITE.whatsapp} className="flex items-center gap-2"><WhatsAppIcon /> WhatsApp</a>
            <a href={SITE.instagram} className="flex items-center gap-2"><InstagramIcon /> Instagram</a>
          </div>
        </div>
      </div>

      {search && <SearchOverlay onClose={closeSearch} />}
    </>
  );
}
