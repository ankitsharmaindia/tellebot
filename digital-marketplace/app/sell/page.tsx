import type { Metadata } from "next"
import { BecomeMerchant } from "@/components/sell/become-merchant"

export const metadata: Metadata = {
  title: "Become a Merchant — Venom Market",
  description: "Sell software, tools, leads, digital assets, and services. Build your trust score and track earnings.",
}

export default function SellPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <div className="mb-10 flex flex-col gap-3">
        <span className="w-fit rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
          Sell on Venom
        </span>
        <h1 className="text-balance font-display text-3xl font-bold tracking-tight md:text-5xl">
          Turn your work into a storefront
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
          Join independent creators selling digital products to a hungry market. Instant listing, transparent trust
          scoring, and earnings you can watch grow.
        </p>
      </div>
      <BecomeMerchant />
    </div>
  )
}
