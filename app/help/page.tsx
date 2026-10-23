import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/help/ContactForm";
import { Reveal } from "@/components/Reveal";
import { ChevronIcon, ClockIcon, CottonIcon, MailIcon, ReturnIcon, TruckIcon, PackageIcon, WhatsAppIcon } from "@/components/Icons";
import { FAQS } from "@/lib/help";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help & contact",
  description: "Answers on orders, delivery, returns and caring for your linen, and the quickest ways to reach us.",
};

const QUICK = [
  { href: "/track-order", title: "Track your order", note: "See where your parcel is", Icon: TruckIcon },
  { href: "/policies/shipping", title: "Shipping & delivery", note: "Free across India, in 2–7 days", Icon: PackageIcon },
  { href: "/policies/returns", title: "Returns & exchanges", note: "7 days, with free pickup", Icon: ReturnIcon },
  { href: "/journal/how-to-care-for-printed-cotton", title: "Caring for cotton", note: "Keep colours rich for years", Icon: CottonIcon },
];

export default function HelpPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="container-x pb-14 pt-16 lg:pb-20 lg:pt-24">
          <div className="animate-fade-up max-w-3xl">
            <p className="eyebrow text-gold-deep">Help centre</p>
            <h1 className="display-xl mt-5 font-light">
              How can we <em className="text-forest-700">help?</em>
            </h1>
            <p className="mt-6 max-w-xl text-[1.03rem] leading-[1.85] text-ink/70">
              Quick answers below. If you&apos;d rather talk to a person, we&apos;re a WhatsApp message away.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {QUICK.map(({ href, title, note, Icon }, i) => (
              <Reveal as="li" key={href} delay={i * 80}>
                <Link href={href} className="group flex h-full flex-col rounded-[24px] border border-sand p-5 transition-colors hover:border-forest-700 hover:bg-ivory sm:p-7">
                  <Icon className="h-8 w-8 text-forest-700" />
                  <span className="mt-6 font-display text-xl leading-tight sm:text-2xl">{title}</span>
                  <span className="mt-1 text-xs text-muted sm:text-sm">{note}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-gold-deep">Frequently asked</p>
            <h2 className="display-md mt-4 font-light">
              Good <em className="text-forest-700">questions.</em>
            </h2>
            <nav aria-label="FAQ topics" className="mt-8 hidden flex-col gap-3 lg:flex">
              {FAQS.map((g) => (
                <a key={g.group} href={`#${slug(g.group)}`} className="link-underline self-start pb-0.5 text-[0.72rem] uppercase tracking-[0.18em] text-muted hover:text-ink">
                  {g.group}
                </a>
              ))}
            </nav>
          </Reveal>
          <div className="space-y-14 lg:col-span-8">
            {FAQS.map((g) => (
              <div key={g.group} id={slug(g.group)} className="scroll-mt-32">
                <p className="eyebrow text-forest-700">{g.group}</p>
                <div className="mt-4 divide-y divide-sand border-y border-sand">
                  {g.items.map((f) => (
                    <details key={f.q} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.35rem] leading-snug [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <ChevronIcon className="shrink-0 transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <p className="pb-6 pr-10 text-[0.95rem] leading-relaxed text-ink/75">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="grain relative overflow-hidden bg-forest-900 py-20 text-ivory lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Still need us?</p>
            <h2 className="display-lg mt-5 font-light">
              Talk to a <em className="text-gold-soft">person.</em>
            </h2>
            <p className="mt-6 max-w-md text-[1.03rem] leading-[1.85] text-ivory/70">
              Real people, not bots: help choosing a print, a size for an unusual mattress, or a gift for someone special.
            </p>
            <ul className="mt-10 space-y-5 text-sm">
              <li>
                <a href={SITE.whatsapp} className="flex items-center gap-4 hover:text-gold-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon /></span>
                  <span>
                    <span className="block font-medium">WhatsApp concierge</span>
                    <span className="text-ivory/60">{SITE.whatsappNumber} · usually replies within the hour</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 hover:text-gold-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/20 text-gold"><MailIcon /></span>
                  <span>
                    <span className="block font-medium">{SITE.email}</span>
                    <span className="text-ivory/60">Replies within one working day</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/20 text-gold"><ClockIcon /></span>
                <span>
                  <span className="block font-medium">Opening hours</span>
                  <span className="text-ivory/60">{SITE.hours}</span>
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function slug(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z]+/g, "-");
}
