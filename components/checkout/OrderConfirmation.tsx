"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { OrderLines, Totals } from "@/components/checkout/OrderLines";
import { OrderTimeline } from "@/components/checkout/OrderTimeline";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, CardIcon, CheckIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { ARTICLES } from "@/lib/journal";
import { SAMPLE_ORDER, formatOrderDate, loadOrder, resolveLines, type Order } from "@/lib/orders";
import { SITE, deliveryDate } from "@/lib/site";

const READS = ["how-to-care-for-printed-cotton", "the-most-lived-in-room"];

export function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => setOrder(loadOrder() ?? SAMPLE_ORDER), []);

  if (!order) return <div className="min-h-[80vh] bg-forest-900" />;

  const lines = resolveLines(order.lines);
  const first = order.name.split(" ")[0] || "friend";
  const reads = ARTICLES.filter((a) => READS.includes(a.slug));

  return (
    <>
      <section className="grain relative overflow-hidden bg-forest-900 text-ivory">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,#245f4b_0%,transparent_60%)]" />
        <div className="container-x flex flex-col items-center py-20 text-center lg:py-28">
          <span className="animate-fade-up grid h-20 w-20 place-items-center rounded-full border border-gold/50 bg-forest-800">
            <CheckIcon width={36} height={36} className="text-gold" />
          </span>
          <p className="animate-fade-up eyebrow mt-8 text-gold [animation-delay:100ms]">Order confirmed · {order.id}</p>
          <h1 className="animate-fade-up display-lg mt-5 max-w-3xl font-light [animation-delay:200ms]">
            Thank you, {first}. <em className="block text-gold-soft">Your linen is being folded.</em>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-[1.03rem] leading-relaxed text-ivory/70 [animation-delay:300ms]">
            A confirmation is on its way to {order.email || "your inbox"} and on WhatsApp.
            {order.gift && " Your note will be written by hand before the box is sealed."}
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3 [animation-delay:400ms]">
            <Link href={`/track-order?order=${order.id}`} className="btn btn-gold">
              Track your order <ArrowIcon />
            </Link>
            <Link href="/shop" className="btn btn-ghost-light">Continue shopping</Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 space-y-12 lg:col-span-7">
            <div>
              <p className="eyebrow text-gold-deep">What happens next</p>
              <h2 className="display-md mt-3 font-light">
                At your door by <em className="text-forest-700">{deliveryDate(order.express ? 2 : 5)}</em>
              </h2>
              <div className="mt-10">
                <OrderTimeline
                  current={0}
                  steps={[
                    { title: "Confirmed", detail: "Just now" },
                    { title: "Packed", detail: "Within 48 hours" },
                    { title: "Shipped", detail: "Tracking link on WhatsApp" },
                    { title: "Delivered", detail: deliveryDate(order.express ? 2 : 5, true) },
                  ]}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<PinIcon />} title="Delivering to">
                <p className="font-medium text-ink">{order.name}</p>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.state} {order.pincode}
                </p>
                <p className="mt-2">+91 {order.phone}</p>
              </InfoCard>
              <InfoCard icon={<CardIcon />} title="Payment & delivery">
                <p className="font-medium text-ink">{order.payment}</p>
                <p>{order.payment === "Cash on delivery" ? "Pay when your order arrives" : "Paid securely via Razorpay"}</p>
                <p className="mt-2">{order.express ? "Express delivery" : "Standard delivery · Free"}</p>
                {order.gift && <p>Gift-boxed with a handwritten note</p>}
              </InfoCard>
            </div>

            <a href={SITE.whatsapp} className="flex items-center gap-4 rounded-2xl border border-sand px-6 py-5 text-sm hover:border-forest-600">
              <WhatsAppIcon className="shrink-0 text-forest-700" />
              <span>
                <span className="font-medium">Need to change something?</span>{" "}
                <span className="text-muted">Message us on WhatsApp within 12 hours and we&apos;ll update your order.</span>
              </span>
            </a>
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <div className="rounded-[28px] bg-ivory p-6 sm:p-8 lg:sticky lg:top-28">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-[1.9rem] leading-none">Your order</h2>
                <p className="text-xs text-muted">{formatOrderDate(order.placedAt)}</p>
              </div>
              <OrderLines lines={lines} className="mt-4 border-b border-sand" />
              <div className="mt-6">
                <Totals subtotal={order.subtotal} discount={order.discount} code={order.code} shipping={order.shipping} total={order.total} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <h2 className="display-md font-light">
              While you <em className="text-forest-700">wait</em>
            </h2>
            <Link href="/journal" className="link-underline hidden pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] sm:inline">The Journal</Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-10">
            {reads.map((a, i) => (
              <Reveal key={a.slug} delay={i * 120}>
                <Link href={`/journal/${a.slug}`} className="group grid grid-cols-[110px_1fr] items-center gap-5 sm:grid-cols-[150px_1fr] sm:gap-7">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
                    <Image src={a.cover} alt="" fill sizes="150px" placeholder="blur" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div>
                    <p className="eyebrow text-gold-deep">{a.category} · {a.readTime}</p>
                    <p className="mt-3 font-display text-2xl leading-tight sm:text-[1.9rem]">{a.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-ink/70">{a.dek}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-sand p-6">
      <p className="flex items-center gap-2 text-forest-700">
        {icon}
        <span className="eyebrow text-muted">{title}</span>
      </p>
      <div className="mt-4 space-y-0.5 text-sm leading-relaxed text-ink/75">{children}</div>
    </div>
  );
}
