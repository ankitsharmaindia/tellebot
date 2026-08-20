import { ProductBrowser } from "@/components/product-browser";
import { products } from "@/lib/data";

export const metadata = {
  title: "Browse — VENOM STORE Marketplace",
  description: "Browse software, tools, leads, digital assets, and services.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-primary">
          Marketplace
        </p>
        <h1 className="font-display text-4xl leading-none md:text-5xl">
          Browse everything
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every digital good from verified merchants, in one place. Filter by
          category, search, and sort to find your next tool.
        </p>
      </header>

      <ProductBrowser products={products} initialQuery={q ?? ""} />
    </div>
  );
}
