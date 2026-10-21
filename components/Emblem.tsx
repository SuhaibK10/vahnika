// Vector redraw of the Vahnika emblem: a V holding a sprouting leaf, inside a hairline ring.
type EmblemProps = {
  className?: string;
  ring?: boolean;
  vColor?: string;
  leafLight?: string;
  leafDark?: string;
  ringColor?: string;
  title?: string;
};

export function Emblem({
  className,
  ring = true,
  vColor = "currentColor",
  leafLight = "#E6C766",
  leafDark = "#D4AF37",
  ringColor = "#D4AF37",
  title = "Vahnika",
}: EmblemProps) {
  return (
    <svg
      viewBox={ring ? "96 96 768 768" : "290 196 380 392"}
      className={className}
      role="img"
      aria-label={title}
    >
      {ring && <circle cx="480" cy="480" r="376" fill="none" stroke={ringColor} strokeWidth="7" />}
      <path
        d="M312 270 L480 565 L648 270"
        fill="none"
        stroke={vColor}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="473" y="296" width="14" height="168" fill={leafDark} />
      <path d="M340 264 C410 272 466 316 481 392 C412 372 360 330 340 264 Z" fill={leafLight} />
      <path d="M487 341 C504 272 560 226 621 216 C602 281 548 327 487 341 Z" fill={leafDark} />
    </svg>
  );
}

export function Wordmark({ className = "", sub = false }: { className?: string; sub?: boolean }) {
  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span className="font-display text-[1.55rem] font-medium tracking-[0.42em] pl-[0.42em]">VAHNIKA</span>
      {sub && (
        <span className="mt-1.5 text-[0.55rem] font-medium tracking-[0.5em] pl-[0.5em] text-gold">
          HOME &amp; APPAREL
        </span>
      )}
    </span>
  );
}
