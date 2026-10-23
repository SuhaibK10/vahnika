"use client";

import { HeartIcon } from "@/components/Icons";
import { useWishlist } from "@/components/wishlist/WishlistContext";

// Save / unsave a print. Filled emerald when saved.
export function HeartButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`grid place-items-center rounded-full transition-colors ${saved ? "text-forest-700" : "text-ink/55 hover:text-forest-700"} ${className}`}
    >
      <HeartIcon fill={saved ? "currentColor" : "none"} strokeWidth={saved ? 1.6 : 1.4} />
    </button>
  );
}
