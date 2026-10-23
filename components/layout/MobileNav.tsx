"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { BagIcon, GridIcon, HomeIcon, UserIcon } from "@/components/Icons";

// Bottom tab bar — below desktop only: Home, Shop, Bag, Account. The Bag tab opens the cart drawer rather than a page.
const TABS = [
  { href: "/", label: "Home", Icon: HomeIcon, match: [] as string[] },
  { href: "/shop", label: "Shop", Icon: GridIcon, match: ["/shop", "/products"] },
];

const tab = "flex flex-1 touch-manipulation select-none flex-col items-center justify-center gap-1 transition-colors duration-300 active:bg-sand/70";
const tone = (active: boolean) => (active ? "text-gold-deep" : "text-ink/65 hover:text-forest-700");
const label = "text-[0.56rem] font-medium uppercase tracking-[0.16em]";

export function MobileNav() {
  const pathname = usePathname();
  const { count, isOpen, open } = useCart();

  return (
    <nav aria-label="Quick links" className="mobile-nav-bar fixed inset-x-0 bottom-0 z-50 border-t border-sand bg-paper/95 backdrop-blur-md lg:hidden">
      <div className="flex h-16">
        {TABS.map(({ href, label: text, Icon, match }) => {
          const active = href === "/" ? pathname === "/" : match.some((m) => pathname.startsWith(m));
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`${tab} ${tone(active)}`}>
              <Icon strokeWidth={active ? 1.9 : 1.4} />
              <span className={label}>{text}</span>
            </Link>
          );
        })}
        <button onClick={open} aria-label={`Open bag, ${count} items`} className={`${tab} ${tone(isOpen)}`}>
          <span className="relative">
            <BagIcon strokeWidth={isOpen ? 1.9 : 1.4} />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-forest-800 px-1 text-[0.55rem] font-medium leading-none text-ivory">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </span>
          <span className={label}>Bag</span>
        </button>
        <Link href="/account" aria-current={pathname.startsWith("/account") ? "page" : undefined} className={`${tab} ${tone(pathname.startsWith("/account"))}`}>
          <UserIcon strokeWidth={pathname.startsWith("/account") ? 1.9 : 1.4} />
          <span className={label}>Account</span>
        </Link>
      </div>
    </nav>
  );
}
