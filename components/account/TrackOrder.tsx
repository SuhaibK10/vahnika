"use client";

import { useState, type FormEvent } from "react";
import { Field } from "@/components/Field";
import { OrderLines } from "@/components/checkout/OrderLines";
import { OrderTimeline } from "@/components/checkout/OrderTimeline";
import { ArrowIcon, TruckIcon, WhatsAppIcon } from "@/components/Icons";
import { SAMPLE_ORDER, loadOrder, resolveLines, type Order } from "@/lib/orders";
import { SITE, deliveryDate } from "@/lib/site";

// Front-end only for the pitch: any order number "finds" an order in transit. Wire to the courier's tracking API later.
export function TrackOrder({ initialId = "" }: { initialId?: string }) {
  const [id, setId] = useState(initialId);
  const [phase, setPhase] = useState<"form" | "loading" | "found">("form");
  const [order, setOrder] = useState<Order | null>(null);

  function lookup(e: FormEvent) {
    e.preventDefault();
    setPhase("loading");
    setTimeout(() => {
      const saved = loadOrder();
      const ref = id.trim().toUpperCase() || SAMPLE_ORDER.id;
      setOrder({ ...(saved?.id === ref ? saved : SAMPLE_ORDER), id: ref });
      setPhase("found");
    }, 900);
  }

  if (phase === "found" && order) {
    const city = order.city || "your city";
    const scans = [
      { when: stamp(0, "08:12"), what: "Arrived at delivery hub", where: `${city} hub` },
      { when: stamp(1, "21:40"), what: "In transit", where: "Linehaul to destination" },
      { when: stamp(1, "14:05"), what: "Picked up by courier", where: "Delhivery" },
      { when: stamp(2, "18:30"), what: "Packed & quality-checked", where: "Vahnika studio" },
      { when: stamp(2, "11:02"), what: "Order confirmed", where: "vahnika.com" },
    ];
    return (
      <div className="animate-fade-up">
        <div className="rounded-[28px] bg-ivory p-6 sm:p-10">
          <div className="flex flex-col gap-6 border-b border-sand pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-gold-deep">Order {order.id}</p>
              <p className="mt-3 font-display text-[2.4rem] leading-none sm:text-5xl">
                Arriving <em className="text-forest-700">{deliveryDate(1)}</em>
              </p>
            </div>
            <span className="flex items-center gap-2 self-start rounded-full bg-forest-800 px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-ivory sm:self-auto">
              <TruckIcon width={18} height={18} className="text-gold" /> In transit
            </span>
          </div>
          <div className="mt-10">
            <OrderTimeline
              current={2}
              steps={[
                { title: "Confirmed", detail: stamp(2) },
                { title: "Packed", detail: stamp(2) },
                { title: "Shipped", detail: stamp(1) },
                { title: "Delivered", detail: `Expected ${deliveryDate(1, true)}` },
              ]}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-sand p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h2 className="font-display text-[1.7rem] leading-none">Shipment updates</h2>
              <p className="text-xs text-muted">Delhivery · AWB 1490 2271 5536</p>
            </div>
            <ol className="mt-6 space-y-5">
              {scans.map((s, i) => (
                <li key={s.what} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-gold ring-4 ring-gold/20" : "bg-forest-300"}`} />
                  <div>
                    <p className="text-sm font-medium">{s.what}</p>
                    <p className="text-xs text-muted">
                      {s.where} · {s.when}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[28px] border border-sand p-6 sm:p-8">
            <h2 className="font-display text-[1.7rem] leading-none">In this parcel</h2>
            <OrderLines lines={resolveLines(order.lines)} className="mt-2" />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={() => setPhase("form")} className="link-underline pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-muted hover:text-ink">
            Track another order
          </button>
          <a href={SITE.whatsapp} className="flex items-center gap-2 text-sm text-forest-700 hover:text-forest-800">
            <WhatsAppIcon /> Questions about delivery? Chat with us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={lookup} className="mx-auto max-w-xl rounded-[28px] bg-ivory p-6 sm:p-10">
      <div className="space-y-4">
        <Field label="Order number" placeholder="VAH-24817" value={id} onChange={(e) => setId(e.target.value)} required />
        <Field label="Email or mobile number" placeholder="The one you ordered with" required />
      </div>
      <button disabled={phase === "loading"} className="btn btn-forest mt-6 w-full disabled:opacity-70">
        {phase === "loading" ? "Finding your parcel…" : <>Track order <ArrowIcon /></>}
      </button>
      <p className="mt-4 text-center text-xs text-muted">Your order number is in the confirmation email and on WhatsApp.</p>
    </form>
  );
}

function stamp(daysAgo: number, time?: string) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const day = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return time ? `${day}, ${time}` : day;
}
