import { CheckIcon, GiftIcon, PackageIcon, TruckIcon } from "@/components/Icons";

const ICONS = [CheckIcon, PackageIcon, TruckIcon, GiftIcon];

// Four-stage delivery progress: vertical on phones, horizontal from sm up. `current` is the index of the latest stage reached.
export function OrderTimeline({ steps, current }: { steps: { title: string; detail: string }[]; current: number }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-4 sm:gap-4">
      {steps.map((s, i) => {
        const Icon = ICONS[i] ?? CheckIcon;
        const done = i <= current;
        return (
          <li key={s.title} className="relative flex gap-4 sm:flex-col sm:gap-3">
            {/* Connector to the next stage: down on phones, across from sm up */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-5 top-10 h-[calc(100%-1rem)] w-px sm:left-10 sm:top-5 sm:h-px sm:w-[calc(100%-1.5rem)] ${i < current ? "bg-forest-700" : "bg-sand"}`}
              />
            )}
            <span
              className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                done ? "bg-forest-800 text-gold" : "border border-sand bg-paper text-muted"
              } ${i === current ? "ring-4 ring-forest-700/15" : ""}`}
            >
              <Icon width={18} height={18} />
            </span>
            <div className="min-w-0 pt-1 sm:pt-0">
              <p className={`font-display text-xl leading-tight ${done ? "" : "text-muted"}`}>{s.title}</p>
              <p className="mt-0.5 text-xs text-muted">{s.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
