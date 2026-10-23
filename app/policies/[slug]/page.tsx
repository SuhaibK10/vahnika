import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/Icons";
import { POLICIES, POLICIES_UPDATED, getPolicy } from "@/lib/policies";
import { SITE } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const policy = getPolicy((await params).slug);
  return policy ? { title: policy.title, description: policy.intro } : {};
}

export default async function PolicyPage({ params }: { params: Params }) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <section className="bg-paper pb-28">
      <div className="container-x pt-8">
        <nav aria-label="Breadcrumb" className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-ink">Home</Link> <span className="mx-2">/</span>
          <Link href="/help" className="hover:text-ink">Help</Link> <span className="mx-2">/</span>
          <span className="text-ink">{policy.title}</span>
        </nav>
      </div>

      <div className="container-x grid gap-10 pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-16">
        <aside className="min-w-0 lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow hidden text-muted lg:block">Policies</p>
            <nav aria-label="Policies" className="flex flex-wrap gap-2 lg:mt-5 lg:flex-col lg:flex-nowrap lg:gap-1">
              {POLICIES.map((p) => {
                const active = p.slug === policy.slug;
                return (
                  <Link
                    key={p.slug}
                    href={`/policies/${p.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2.5 sm:px-5 text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-colors lg:rounded-2xl lg:py-3 ${
                      active ? "bg-forest-800 text-ivory" : "border border-ink/15 text-ink/70 hover:border-forest-700 lg:border-transparent lg:hover:bg-ivory"
                    }`}
                  >
                    {p.title}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-10 hidden rounded-[24px] bg-ivory p-6 lg:block">
              <p className="font-display text-2xl leading-tight">Still have a question?</p>
              <p className="mt-2 text-sm text-muted">We&apos;re happy to help.</p>
              <a href={SITE.whatsapp} className="mt-5 flex items-center gap-2 text-sm text-forest-700 hover:text-forest-800">
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
              <Link href="/help" className="mt-2 block text-sm text-muted underline underline-offset-4 hover:text-ink">Visit the help centre</Link>
            </div>
          </div>
        </aside>

        <article className="min-w-0 max-w-3xl lg:col-span-8 lg:col-start-5">
          <p className="eyebrow text-gold-deep">Last updated {POLICIES_UPDATED}</p>
          <h1 className="display-lg mt-5 font-light">{policy.title}</h1>
          <p className="mt-6 text-[1.15rem] leading-[1.8] text-ink/75">{policy.intro}</p>
          <div className="mt-6 h-px w-16 bg-gold" />
          {policy.sections.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2 className="text-[1.9rem] leading-tight text-forest-800">{s.heading}</h2>
              {s.body.map((para) => (
                <p key={para} className="mt-4 text-[1.02rem] leading-[1.85] text-ink/80">{para}</p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="relative pl-7 text-[1.02rem] leading-[1.8] text-ink/80 before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-4 before:bg-gold">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="mt-16 rounded-[24px] bg-ivory p-6 text-sm leading-relaxed text-ink/75 lg:hidden">
            Still have a question? <a href={SITE.whatsapp} className="text-forest-700 underline underline-offset-4">Chat with us on WhatsApp</a> or visit the{" "}
            <Link href="/help" className="text-forest-700 underline underline-offset-4">help centre</Link>.
          </p>
        </article>
      </div>
    </section>
  );
}
