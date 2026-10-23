import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyBox } from "@/components/product/BuyBox";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ChevronIcon, StarIcon } from "@/components/Icons";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name}: ${product.meaning}`,
    description: `${product.short} ${product.print}, pure cotton. ${product.contents}.`,
  };
}

// PLACEHOLDER reviews for the pitch — replace with verified reviews at launch.
const REVIEWS = [
  { name: "Priya M.", place: "Pune", title: "Like sleeping in a garden", text: "The colours are rich without being loud, and the cotton feels cool even without the AC. Washed it four times, no fading." },
  { name: "Arjun K.", place: "Jaipur", title: "Looks far more expensive", text: "Gifted this to my parents for their anniversary. My mother called it 'hotel wali chadar'. That's a five-star review in our family." },
];

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.family === product.family) - Number(a.family === product.family))
    .slice(0, 4);
  const [, detailA, detailB] = product.images;

  const accordions = [
    { title: "The story of the print", body: <p>{product.story}</p>, open: true },
    {
      title: "Fabric & feel",
      body: (
        <ul className="space-y-2">
          <li>100% cotton: breathable, skin-friendly and softer with every wash.</li>
          <li>{product.print}.</li>
          <li>Colours: {product.colours.map((c) => c.name).join(", ")}.</li>
        </ul>
      ),
    },
    { title: "What's in the set", body: <p>{product.contents}. Folded and wrapped, ready to give.</p> },
    {
      title: "Size guide",
      body: (
        <table className="w-full text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="pb-2 font-normal">Size</th>
              <th className="pb-2 font-normal">Sheet</th>
              <th className="pb-2 font-normal">Fits mattress up to</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            <tr><td className="py-2">King</td><td>108 × 108 in</td><td>72 × 78 in</td></tr>
            <tr><td className="py-2">Queen</td><td>90 × 100 in</td><td>60 × 78 in</td></tr>
          </tbody>
        </table>
      ),
    },
    {
      title: "Care",
      body: (
        <p>
          Wash separately for the first few washes in cold water on a gentle cycle. Mild detergent, no bleach. Dry in
          shade and iron on the reverse. <Link href="/journal/how-to-care-for-printed-cotton" className="underline underline-offset-4">Read the full care guide</Link>.
        </p>
      ),
    },
    {
      title: "Shipping & returns",
      body: <p>Complimentary shipping across India, dispatched within 48 hours. Cash on delivery available. Easy exchanges and returns within 7 days of delivery.</p>,
    },
  ];

  return (
    <>
      <div className="container-x pt-8">
        <nav aria-label="Breadcrumb" className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-ink">Home</Link> <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-ink">Shop</Link> <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <section className="container-x grid gap-12 pb-24 pt-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-28">
            <ProductGallery images={product.images} name={product.name} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <BuyBox product={product} />
          <div className="mt-10 divide-y divide-sand border-y border-sand">
            {accordions.map((a) => (
              <details key={a.title} open={a.open} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 font-display text-[1.45rem] [&::-webkit-details-marker]:hidden">
                  {a.title}
                  <ChevronIcon className="transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="pb-6 text-[0.95rem] leading-relaxed text-ink/75">{a.body}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The print, up close */}
      <section className="grain relative overflow-hidden bg-forest-900 py-24 text-ivory lg:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">The print, up close</p>
            <h2 className="display-lg mt-5 font-light">
              {product.name} <em className="block text-gold-soft">{product.meaning}</em>
            </h2>
            <p className="mt-6 text-[1.05rem] leading-[1.85] text-ivory/72">{product.story}</p>
            <Link href="/prints" className="btn btn-ghost-light mt-9">Explore the Print Library</Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-6">
            {[detailA, detailB].filter(Boolean).map((img, i) => (
              <Reveal key={i} delay={i * 150} className={i === 1 ? "mt-16" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full ring-1 ring-gold/30">
                  <Image src={img} alt={`${product.name} print detail`} fill sizes="(min-width:1024px) 28vw, 45vw" placeholder="blur" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-ivory py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-gold-deep">Reviews</p>
            <h2 className="display-md mt-4 font-light">Slept on, <em className="text-forest-700">loved.</em></h2>
            <div className="mt-6 flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} width={18} height={18} />)}
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 120} className="rounded-[24px] bg-paper p-8">
                <div className="flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, n) => <StarIcon key={n} />)}</div>
                <p className="mt-5 font-display text-2xl leading-snug">{r.title}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">{r.text}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">{r.name} · {r.place}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Complete the bed */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="container-x">
          <Reveal className="mb-12 flex items-end justify-between">
            <h2 className="display-md font-light">Complete <em className="text-forest-700">the bed</em></h2>
            <Link href="/shop" className="link-underline hidden pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] sm:inline">View all</Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
