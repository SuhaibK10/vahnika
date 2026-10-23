import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <section className="bg-paper pb-28">
      <div className="container-x border-b border-sand pb-6 pt-6 lg:pb-8 lg:pt-10">
        <p className="animate-fade-up eyebrow text-gold-deep">Saved for later</p>
        <h1 className="animate-fade-up display-md mt-2 font-light [animation-delay:120ms]">
          Your <em className="text-forest-700">wishlist</em>
        </h1>
      </div>
      <div className="container-x">
        <WishlistView />
      </div>
    </section>
  );
}
