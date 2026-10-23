import Link from "next/link";
import { Emblem } from "@/components/Emblem";
import { Newsletter } from "@/components/Newsletter";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All bed linen" },
      { href: "/shop?category=Bedsheet%20Sets", label: "Bedsheet sets" },
      { href: "/shop?category=Quilts", label: "Quilts" },
      { href: "/prints", label: "The Print Library" },
      { href: "/bed-to-body", label: "Bed to Body" },
    ],
  },
  {
    title: "Vahnika",
    links: [
      { href: "/our-story", label: "Our story" },
      { href: "/journal", label: "The Journal" },
      { href: "/journal/a-short-story-of-the-jaipuri-print", label: "Craft & heritage" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/track-order", label: "Track your order" },
      { href: "/policies/shipping", label: "Shipping & delivery" },
      { href: "/policies/returns", label: "Returns & exchanges" },
      { href: "/help", label: "FAQs & contact" },
      { href: "/journal/how-to-care-for-printed-cotton", label: "Care guide" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-forest-950 text-ivory">
      <div className="container-x grid gap-14 border-b border-ivory/10 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <p className="eyebrow text-gold">Letters from Vahnika</p>
          <h2 className="display-md mt-5 max-w-lg text-ivory">
            Slow-living notes, new prints, <em className="text-gold-soft">first looks.</em>
          </h2>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ivory/65">
            One letter a month, never more. Stories behind our prints, bedroom rituals and early access to new launches.
          </p>
          <div className="mt-8 max-w-md">
            <Newsletter />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-gold/90">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-underline text-[0.92rem] text-ivory/70 hover:text-ivory">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3">
            <p className="eyebrow text-gold/90">Talk to us</p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-[0.92rem] text-ivory/70">
              <a href={SITE.whatsapp} className="flex items-center gap-2 hover:text-ivory"><WhatsAppIcon className="text-gold" /> WhatsApp concierge</a>
              <a href={`mailto:${SITE.email}`} className="hover:text-ivory">{SITE.email}</a>
              <a href={SITE.instagram} className="flex items-center gap-2 hover:text-ivory"><InstagramIcon className="text-gold" /> @vahnika</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col items-center gap-6 py-10 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="flex items-center gap-4">
          <Emblem className="h-12 w-12" vColor="#F5EFE6" />
          <p className="max-w-xs font-display text-lg italic leading-snug text-ivory/80">{SITE.tagline}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {["UPI", "VISA", "MASTERCARD", "RUPAY", "COD"].map((p) => (
            <span key={p} className="rounded-md border border-ivory/15 px-2.5 py-1 text-[0.6rem] tracking-[0.16em] text-ivory/60">{p}</span>
          ))}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.18em] whitespace-nowrap bg-[linear-gradient(180deg,rgba(212,175,55,.34),rgba(212,175,55,0))] bg-clip-text text-center font-display text-[17vw] leading-none tracking-[0.08em] text-transparent">
          VAHNIKA
        </p>
      </div>
      <div className="container-x flex flex-col items-center justify-between gap-2 border-t border-ivory/10 py-6 text-[0.72rem] text-ivory/45 sm:flex-row">
        <p>© {new Date().getFullYear()} Vahnika Home &amp; Apparel. Designed in India.</p>
        <nav aria-label="Policies" className="flex gap-4">
          {[
            ["/policies/privacy", "Privacy"],
            ["/policies/terms", "Terms"],
            ["/policies/shipping", "Shipping"],
            ["/policies/returns", "Returns"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-ivory">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
