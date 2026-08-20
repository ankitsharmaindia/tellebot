"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Store } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart/cart-sheet";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { VenomLogo } from "@/components/layout/venom-logo";

const nav = [
  { href: "/browse", label: "Browse" },
  ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name })),
  { href: "/merchants", label: "Merchants" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky max-w-screen-xl  2xl:mx-auto top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <VenomLogo className="size-7 text-primary" />
          <span className="font-display text-xl tracking-wide text-glow-red">
            VENOM STORE
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground",
              )}>
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          action="/browse"
          className="ml-auto hidden max-w-xs flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Search the marketplace"
              className="h-9 pl-9"
              aria-label="Search products"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex"
            render={<Link href="/sell" />}>
            <Store data-icon="inline-start" />
            Become a merchant
          </Button>
          <CartSheet />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }>
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-display text-lg">
                  <VenomLogo className="size-6 text-primary" />
                  VENOM STORE
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                      pathname === item.href && "bg-secondary text-foreground",
                    )}>
                    {item.label}
                  </Link>
                ))}
                <Button
                  className="mt-3 mx-2"
                  render={<Link href="/sell" />}
                  onClick={() => setMobileOpen(false)}>
                  <Store data-icon="inline-start" />
                  Become a merchant
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
