import Link from "next/link";
import { VenomLogo } from "@/components/layout/venom-logo";
import { categories } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className=" max-w-screen-2xl 2xl:mx-auto  border border-red-500 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2">
            <VenomLogo className="size-6 text-primary" />
            <span className="font-display text-lg tracking-wide">
              VENOM STORE
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            The trust-first marketplace for digital software, tools, leads,
            assets, and services.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-sm uppercase tracking-wide text-muted-foreground">
            Categories
          </h3>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-sm text-foreground/80 transition-colors hover:text-primary">
              {c.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-sm uppercase tracking-wide text-muted-foreground">
            Marketplace
          </h3>
          <Link
            href="/browse"
            className="text-sm text-foreground/80 transition-colors hover:text-primary">
            Browse all
          </Link>
          <Link
            href="/merchants"
            className="text-sm text-foreground/80 transition-colors hover:text-primary">
            Top merchants
          </Link>
          <Link
            href="/sell"
            className="text-sm text-foreground/80 transition-colors hover:text-primary">
            Become a merchant
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-sm uppercase tracking-wide text-muted-foreground">
            Trust &amp; safety
          </h3>
          <span className="text-sm text-foreground/80">Buyer protection</span>
          <span className="text-sm text-foreground/80">Verified merchants</span>
          <span className="text-sm text-foreground/80">Secure checkout</span>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} VENOM STORE Marketplace. A demo
            prototype.
          </p>
          <p>Built with Next.js, Tailwind &amp; shadcn/ui.</p>
        </div>
      </div>
    </footer>
  );
}
