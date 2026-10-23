import type { Metadata } from "next";
import { TrackOrder } from "@/components/account/TrackOrder";

export const metadata: Metadata = {
  title: "Track your order",
  description: "Follow your Vahnika order from our studio to your door.",
};

type SearchParams = Promise<{ order?: string }>;

export default async function TrackOrderPage({ searchParams }: { searchParams: SearchParams }) {
  const { order } = await searchParams;

  return (
    <section className="bg-paper pb-28">
      <div className="container-x pb-12 pt-16 text-center lg:pb-16 lg:pt-24">
        <p className="animate-fade-up eyebrow text-gold-deep">Track your order</p>
        <h1 className="animate-fade-up display-xl mt-5 font-light [animation-delay:120ms]">
          Where&apos;s my <em className="text-forest-700">linen?</em>
        </h1>
        <p className="animate-fade-up mx-auto mt-5 max-w-md text-ink/70 [animation-delay:240ms]">
          Enter your order number to follow it from our studio to your door.
        </p>
      </div>
      <div className="container-x">
        <TrackOrder initialId={order} />
      </div>
    </section>
  );
}
