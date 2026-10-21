import Link from "next/link";
import { Emblem } from "@/components/Emblem";
import { ArrowIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="bg-paper py-32 text-center">
      <div className="container-x flex flex-col items-center">
        <Emblem className="h-20 w-20" vColor="#1A4D3C" />
        <p className="eyebrow mt-10 text-gold-deep">Page not found</p>
        <h1 className="display-lg mt-5 max-w-2xl font-light">
          This page has gone back to <em className="text-forest-700">bed.</em>
        </h1>
        <p className="mt-5 text-ink/70">Let&apos;s find you something softer.</p>
        <Link href="/shop" className="btn btn-forest mt-10">Shop the collection <ArrowIcon /></Link>
      </div>
    </section>
  );
}
