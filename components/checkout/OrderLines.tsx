import Image from "next/image";
import type { Product, Size } from "@/lib/products";
import { formatINR } from "@/lib/site";

type Line = { slug: string; sizeId: string; qty: number; product: Product; size: Size; lineTotal: number };

// Compact line items for checkout, order confirmation and order history
export function OrderLines({ lines, className = "" }: { lines: Line[]; className?: string }) {
  return (
    <ul className={`divide-y divide-sand ${className}`}>
      {lines.map((l) => (
        <li key={l.slug + l.sizeId} className="flex items-center gap-4 py-4">
          <div className="relative shrink-0">
            <div className="relative h-20 w-16 overflow-hidden rounded-t-full bg-sand">
              <Image src={l.product.images[0]} alt={l.product.name} fill sizes="64px" className="object-cover" />
            </div>
            <span className="absolute -right-2 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-forest-800 px-1 text-[0.62rem] font-medium text-ivory">
              {l.qty}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl leading-tight">{l.product.name}</p>
            <p className="mt-0.5 text-xs text-muted">
              {l.product.category === "Quilts" ? "Quilt" : "Bedsheet set"} · {l.size.label}
            </p>
          </div>
          <p className="shrink-0 text-sm">{formatINR(l.lineTotal)}</p>
        </li>
      ))}
    </ul>
  );
}

// Subtotal → total breakdown
export function Totals({ subtotal, discount, code, shipping, total }: { subtotal: number; discount: number; code: string | null; shipping: number; total: number }) {
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted">Subtotal</dt>
        <dd>{formatINR(subtotal)}</dd>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-forest-700">
          <dt>Discount {code && <span className="ml-1 rounded-full bg-forest-800/10 px-2 py-0.5 text-[0.62rem] tracking-[0.12em]">{code}</span>}</dt>
          <dd>− {formatINR(discount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="text-muted">Delivery</dt>
        <dd>{shipping ? formatINR(shipping) : <span className="text-forest-700">Free</span>}</dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-sand pt-4">
        <dt className="eyebrow text-ink">Total</dt>
        <dd className="font-display text-[2rem] leading-none">{formatINR(total)}</dd>
      </div>
      <p className="text-right text-[0.7rem] text-muted">Inclusive of all taxes (GST)</p>
    </dl>
  );
}
