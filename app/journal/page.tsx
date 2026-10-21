import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/lib/journal";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "The Journal",
  description: "Notes on rest, craft and the art of the bed — from the Vahnika journal.",
};

export default function JournalPage() {
  const [lead, ...rest] = ARTICLES;
  const categories = [...new Set(ARTICLES.map((a) => a.category))];

  return (
    <>
      <section className="bg-paper">
        <div className="container-x pb-12 pt-16 text-center lg:pt-24">
          <div className="animate-fade-up">
            <p className="eyebrow text-gold-deep">The Vahnika Journal</p>
            <h1 className="display-xl mt-5 font-light">
              Notes from <em className="text-forest-700">the bedroom</em>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[1.03rem] leading-relaxed text-ink/70">
              Slow reads on rest, craft and the art of a well-made bed. Pour the chai — this is the unhurried part of the
              internet.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <span key={c} className="rounded-full border border-ink/15 px-4 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-ink/65">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-16">
        <div className="container-x">
          <div className="animate-fade-up [animation-delay:150ms]">
            <Link href={`/journal/${lead.slug}`} className="group grid overflow-hidden rounded-[32px] bg-forest-900 text-ivory lg:grid-cols-2">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
                <Image src={lead.cover} alt="" fill priority sizes="(min-width:1024px) 50vw, 100vw" placeholder="blur" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
              </div>
              <div className="grain relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <p className="eyebrow text-gold">Featured · {lead.category}</p>
                <h2 className="display-lg mt-5 font-light">{lead.title}</h2>
                <p className="mt-5 text-[1.03rem] leading-relaxed text-ivory/70">{lead.dek}</p>
                <p className="mt-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold-soft">
                  Read the story · {lead.readTime} <ArrowIcon />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-28 pt-8">
        <div className="container-x grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 110}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <div className={`relative aspect-[4/5] overflow-hidden ${i % 3 === 1 ? "rounded-t-full" : "rounded-[28px]"}`}>
                  <Image src={a.cover} alt="" fill sizes="(min-width:1024px) 30vw, 50vw" placeholder="blur" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-6 text-gold-deep">{a.category} · {a.readTime}</p>
                <h3 className="mt-3 font-display text-[2rem] leading-tight">{a.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{a.dek}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
