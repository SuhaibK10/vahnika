import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle, type Block } from "@/lib/journal";
import { getProduct, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Emblem } from "@/components/Emblem";
import { ArrowIcon } from "@/components/Icons";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? { title: article.title, description: article.dek } : {};
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "p":
      return <p key={i}>{block.text}</p>;
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "quote":
      return (
        <blockquote key={i}>
          <span className="mx-auto mb-4 block h-px w-12 bg-gold" />
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure key={i} className="my-12 -mx-5 sm:mx-0">
          <div className="relative aspect-[3/2] overflow-hidden sm:rounded-[24px]">
            <Image src={block.image} alt={block.caption} fill sizes="(min-width:768px) 720px, 100vw" placeholder="blur" className="object-cover" />
          </div>
          <figcaption className="mt-3 px-5 text-center font-display text-lg italic text-muted sm:px-0">{block.caption}</figcaption>
        </figure>
      );
  }
}

export default async function ArticlePage({ params }: { params: Params }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const products = article.related.map((s) => getProduct(s)).filter(Boolean) as Product[];
  const idx = ARTICLES.findIndex((a) => a.slug === article.slug);
  const next = [ARTICLES[(idx + 1) % ARTICLES.length], ARTICLES[(idx + 2) % ARTICLES.length]];

  return (
    <>
      <article className="bg-paper">
        <header className="container-x pb-12 pt-14 text-center lg:pt-20">
          <div className="animate-fade-up">
            <Link href="/journal" className="eyebrow text-gold-deep hover:text-forest-700">The Journal · {article.category}</Link>
            <h1 className="display-xl mx-auto mt-6 max-w-4xl font-light">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl font-display text-[1.6rem] italic leading-snug text-muted">{article.dek}</p>
            <p className="mt-8 text-[0.7rem] uppercase tracking-[0.2em] text-muted">{article.date} · {article.readTime}</p>
          </div>
        </header>
        {/* Above the fold: no reveal animation, so it can paint immediately (LCP) */}
        <div className="container-x">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[32px]">
            <Image src={article.cover} alt="" fill priority sizes="(min-width:1440px) 1344px, 100vw" placeholder="blur" className="object-cover" />
          </div>
        </div>
        <div className="container-x">
          <div className="prose-vahnika mx-auto max-w-[720px] py-16 lg:py-24">{article.body.map(renderBlock)}</div>
          <div className="mx-auto flex max-w-[720px] items-center gap-4 border-t border-sand pb-20 pt-10">
            <Emblem className="h-12 w-12 shrink-0" vColor="#1A4D3C" />
            <p className="text-sm text-muted">
              Written for the <span className="text-ink">Vahnika Journal</span>: notes on rest, craft and the art of the bed.
            </p>
          </div>
        </div>
      </article>

      <section className="bg-ivory py-24">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow text-gold-deep">Sleep in the story</p>
            <h2 className="display-md mt-4 font-light">Prints from <em className="text-forest-700">this piece</em></h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} className={i === 2 ? "hidden lg:block" : ""}>
                <ProductCard product={p} sizes="(min-width:1024px) 30vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x">
          <h2 className="display-md mb-12 font-light">Keep <em className="text-forest-700">reading</em></h2>
          <div className="grid gap-8 md:grid-cols-2">
            {next.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group grid items-center gap-6 sm:grid-cols-[200px_1fr]">
                <div className="relative aspect-square overflow-hidden rounded-t-full">
                  <Image src={a.cover} alt="" fill sizes="200px" placeholder="blur" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div>
                  <p className="eyebrow text-gold-deep">{a.category} · {a.readTime}</p>
                  <h3 className="mt-3 font-display text-[1.9rem] leading-tight">{a.title}</h3>
                  <p className="mt-3 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-forest-700">Read <ArrowIcon /></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
