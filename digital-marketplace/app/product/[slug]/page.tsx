import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Download, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/rating-stars";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { MerchantMini } from "@/components/merchant-mini";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  formatCurrency,
  getCategory,
  getMerchant,
  getProduct,
  getProductsByMerchant,
  products,
} from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} — VENOM STORE`,
    description: product.short,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const merchant = getMerchant(product.merchantId)!;
  const category = getCategory(product.category)!;
  const more = getProductsByMerchant(merchant.id)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/browse" className="hover:text-foreground">
          Browse
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/category/${category.slug}`}
          className="hover:text-foreground">
          {category.name}
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={product.cover || "/placeholder.svg"}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <Badge className="absolute left-4 top-4 border-transparent bg-primary text-primary-foreground">
              {category.name}
            </Badge>
          </div>

          <div className="mt-6">
            <h1 className="text-balance font-display text-3xl leading-tight md:text-4xl">
              {product.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <RatingStars value={product.rating} size="sm" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span aria-hidden>•</span>
              <span>{product.sales.toLocaleString()} sold</span>
              <span aria-hidden>•</span>
              <Link
                href={`/merchant/${merchant.handle}`}
                className="hover:text-foreground">
                by <span className="text-foreground">@{merchant.handle}</span>
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="prose-invert max-w-none">
            <h2 className="font-display text-xl">About this product</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl">What&apos;s included</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="font-display text-xl">
              Reviews{" "}
              <span className="text-muted-foreground">
                ({product.reviews.length})
              </span>
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {product.reviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{r.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {r.date}
                      </span>
                    </div>
                    <RatingStars value={r.rating} size="sm" />
                    <p className="text-sm text-muted-foreground">{r.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Buy box + merchant */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl text-glow-red">
                {formatCurrency(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatCurrency(product.oldPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-background/60 p-3 text-sm">
              {product.deliveryType === "Instant download" ? (
                <Download className="size-4 text-primary" />
              ) : (
                <Zap className="size-4 text-primary" />
              )}
              <span>{product.deliveryType}</span>
            </div>

            <div className="flex flex-col gap-2">
              <AddToCartButton
                product={product}
                label="Add to cart"
                size="lg"
              />
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/checkout" />}>
                Buy now
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Buyer protection &amp; secure checkout
            </div>
          </div>

          <MerchantMini merchant={merchant} />
        </aside>
      </div>

      {more.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            title={`More from ${merchant.name}`}
            action={{
              href: `/merchant/${merchant.handle}`,
              label: "View profile",
            }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-14">
          <SectionHeading
            title="Related products"
            action={{
              href: `/category/${category.slug}`,
              label: `All ${category.name}`,
            }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
