import { MerchantCard } from "@/components/merchant-card";
import { merchants } from "@/lib/data";

export const metadata = {
  title: "Merchants — VENOM STORE Marketplace",
  description:
    "Discover verified merchants ranked by trust score and reputation.",
};

export default function MerchantsPage() {
  const ranked = [...merchants].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-primary">
          Reputation
        </p>
        <h1 className="font-display text-4xl leading-none md:text-5xl">
          Merchants
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every seller carries a public trust score built from verified sales,
          ratings, and completed services. Explore the people behind the
          products.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((m) => (
          <MerchantCard key={m.id} merchant={m} />
        ))}
      </div>
    </div>
  );
}
