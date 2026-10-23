import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronIcon } from "@/components/Icons";

// Shared form controls for checkout, account, tracking and contact. Front-end only for the pitch.
export const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-paper px-5 py-3.5 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-forest-700 sm:text-sm";

function Label({ label, hint, className = "", children }: { label: string; hint?: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-baseline justify-between gap-3 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-muted">
        {label}
        {hint && <span className="normal-case tracking-normal text-muted/80">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

type FieldProps = { label: string; hint?: string; className?: string } & InputHTMLAttributes<HTMLInputElement>;

export function Field({ label, hint, className, ...props }: FieldProps) {
  return (
    <Label label={label} hint={hint} className={className}>
      <input className={inputClass} {...props} />
    </Label>
  );
}

// Indian mobile number with a fixed +91 prefix
export function PhoneField({ label = "Mobile number", hint, className, ...props }: Partial<FieldProps>) {
  return (
    <Label label={label} hint={hint} className={className}>
      <span className="flex items-center rounded-2xl border border-ink/15 bg-paper transition-colors focus-within:border-forest-700">
        <span className="shrink-0 border-r border-ink/15 py-3.5 pl-5 pr-3 text-sm text-ink/80">+91</span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          pattern="[6-9][0-9]{9}"
          title="A 10-digit Indian mobile number"
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-base outline-none placeholder:text-muted/70 sm:text-sm"
          {...props}
        />
      </span>
    </Label>
  );
}

export function SelectField({ label, hint, className, children, ...props }: { label: string; hint?: string; className?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Label label={label} hint={hint} className={className}>
      <span className="relative flex items-center">
        <select className={`${inputClass} appearance-none pr-12`} {...props}>
          {children}
        </select>
        <ChevronIcon className="pointer-events-none absolute right-5" />
      </span>
    </Label>
  );
}

export function TextareaField({ label, hint, className, ...props }: { label: string; hint?: string; className?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Label label={label} hint={hint} className={className}>
      <textarea className={`${inputClass} resize-none`} {...props} />
    </Label>
  );
}

// Selectable card for radio choices (delivery speed, payment method). `detail` opens below the chosen card.
export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  detail,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  detail?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-2xl border transition-colors ${checked ? "border-forest-700 bg-ivory" : "border-ink/15 hover:border-forest-600"}`}>
      <label className="flex cursor-pointer items-start gap-4 px-5 py-4">
        <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="mt-1 h-4 w-4 shrink-0 accent-forest-700" />
        <span className="min-w-0 flex-1">{children}</span>
      </label>
      {checked && detail && <div className="animate-fade-in px-5 pb-5 sm:pl-[3.25rem]">{detail}</div>}
    </div>
  );
}
