import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductBrowser } from "@/components/product-browser";
import { categories, getCategory, getProductsByCategory } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} — VENOM STORE Marketplace`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);
  const Icon = category.icon;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={category.cover || "/placeholder.svg"}
            alt=""
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-3 px-4 py-14">
          <span className="flex size-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary">
            <Icon className="size-6" />
          </span>
          <h1 className="font-display text-4xl leading-none md:text-5xl">
            {category.name}
          </h1>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            {category.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <ProductBrowser
          products={items}
          initialCategory={category.slug}
          showCategoryFilter={false}
        />
      </div>
    </div>
  );
}
