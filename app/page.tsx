import Link from "next/link";
import { ArrowRight, BadgeCheck, Store, Wallet, LineChart } from "lucide-react";
import { HomeHero } from "@/components/home/home-hero";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { MerchantCard } from "@/components/merchant-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  categories,
  getFeaturedProducts,
  merchants,
  products,
} from "@/lib/data";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const topMerchants = [...merchants]
    .sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, 3);
  const trending = [...products].sort((a, b) => b.sales - a.sales).slice(0, 6);

  return (
    <div>
      <HomeHero />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          eyebrow="Marketplace"
          title="Shop by category"
          action={{ href: "/browse", label: "View all" }}
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured drops"
          action={{ href: "/browse", label: "Browse all" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          eyebrow="Best sellers"
          title="Trending right now"
          action={{ href: "/browse", label: "See more" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Merchant CTA */}
      <section className="border-y border-border bg-card/40">
        <div className="venom-grid mx-auto max-w-7xl px-4 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
                Start selling
              </p>
              <h2 className="text-balance font-display text-3xl leading-tight md:text-4xl">
                Turn your skills into a VENOM STORE-grade income stream
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
                List your first product in minutes. Build a public profile, earn
                a trust score with every sale, and let buyers see your track
                record.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" render={<Link href="/sell" />}>
                  <Store data-icon="inline-start" />
                  Become a merchant
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  render={<Link href="/merchants" />}>
                  Meet top merchants
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Perk
                icon={BadgeCheck}
                title="Trust score"
                body="Grow a verifiable reputation with every completed order."
              />
              <Perk
                icon={Wallet}
                title="Keep more"
                body="Transparent fees. Track lifetime earnings on your profile."
              />
              <Perk
                icon={LineChart}
                title="Insights"
                body="See sales, services delivered, and ratings at a glance."
              />
              <Perk
                icon={Store}
                title="Your storefront"
                body="A public profile with bio, skills, and every listing."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          eyebrow="Reputation"
          title="Top-rated merchants"
          action={{ href: "/merchants", label: "All merchants" }}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {topMerchants.map((m) => (
            <MerchantCard key={m.id} merchant={m} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Perk({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <span className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="font-display text-base leading-none">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
