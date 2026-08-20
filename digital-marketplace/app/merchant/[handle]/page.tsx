import { notFound } from "next/navigation";
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  MapPin,
  Package,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/rating-stars";
import { TrustLevelBadge, TrustScoreMeter } from "@/components/trust-score";
import { ProductCard } from "@/components/product-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  formatCurrency,
  getMerchantByHandle,
  getProductsByMerchant,
  merchants,
} from "@/lib/data";

export function generateStaticParams() {
  return merchants.map((m) => ({ handle: m.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const merchant = getMerchantByHandle(handle);
  if (!merchant) return {};
  return {
    title: `${merchant.name} (@${merchant.handle}) — VENOM STORE`,
    description: merchant.bio,
  };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function MerchantProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const merchant = getMerchantByHandle(handle);
  if (!merchant) notFound();

  const listings = getProductsByMerchant(merchant.id);

  const stats = [
    {
      icon: Wallet,
      label: "Total earnings",
      value: formatCurrency(merchant.totalEarnings),
    },
    {
      icon: Package,
      label: "Services delivered",
      value: merchant.totalServices.toLocaleString(),
    },
    {
      icon: TrendingUp,
      label: "Total sales",
      value: merchant.totalSales.toLocaleString(),
    },
    {
      icon: Star,
      label: "Avg. rating",
      value: `${merchant.rating.toFixed(1)} / 5`,
    },
  ];

  return (
    <div>
      {/* Cover / banner */}
      <div className="relative h-40 overflow-hidden border-b border-border venom-grid bg-card md:h-52">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="-mt-14 flex flex-col gap-4 md:-mt-16 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <Avatar className="size-24 border-4 border-background bg-secondary md:size-28">
              <AvatarFallback className="bg-secondary font-display text-3xl text-secondary-foreground">
                {initials(merchant.name)}
              </AvatarFallback>
            </Avatar>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl leading-none md:text-3xl">
                  {merchant.name}
                </h1>
                <TrustLevelBadge level={merchant.trustLevel} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                @{merchant.handle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <RatingStars value={merchant.rating} />
            <span className="text-sm text-muted-foreground">
              {merchant.rating.toFixed(1)} ({merchant.reviews.toLocaleString()})
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Left: bio + details */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-lg">About</h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {merchant.bio}
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" /> {merchant.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4" /> Joined {merchant.joined}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" /> Responds {merchant.responseTime}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <TrustScoreMeter score={merchant.trustScore} />
              <Separator className="my-4" />
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {merchant.badges.map((b) => (
                  <Badge key={b} variant="secondary" className="gap-1">
                    <BadgeCheck className="size-3 text-primary" />
                    {b}
                  </Badge>
                ))}
              </div>
              <h3 className="mb-2 mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {merchant.skills.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Right: stats + listings */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-card p-4">
                    <Icon className="size-5 text-primary" />
                    <p className="mt-3 font-display text-xl leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <section>
              <h2 className="mb-4 font-display text-xl">
                Listings{" "}
                <span className="text-muted-foreground">
                  ({listings.length})
                </span>
              </h2>
              {listings.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Package />
                    </EmptyMedia>
                    <EmptyTitle>No listings yet</EmptyTitle>
                    <EmptyDescription>
                      This merchant hasn&apos;t published any products.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {listings.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
