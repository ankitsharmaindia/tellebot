import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src="/venom-hero.png"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="venom-grid relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="size-3.5" />
            Trust-first digital marketplace
          </div>
          <h1 className="text-balance font-display text-xl leading-[0.95] tracking-tight md:text-7xl">
            Now in one place{" "}
            <span className="block text-primary text-5xl text-glow-red">
              Every Tool. Every Exploit. Every Identity{" "}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Deploy APK payloads with panel, Bypass UPI with zero-days, unmask
            identities via Aadhar/PAN OSINT, and get custom panels from a
            single, lethal dashboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" render={<Link href="/browse" />}>
              Explore marketplace
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/sell" />}>
              <Store data-icon="inline-start" />
              Become a merchant
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                APK payloads
              </dt>
              <dd className="font-display text-2xl text-glow-red">12+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Verified merchants
              </dt>
              <dd className="font-display text-2xl text-glow-red">40</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Paid to sellers
              </dt>
              <dd className="font-display text-2xl text-glow-red">$18M</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
