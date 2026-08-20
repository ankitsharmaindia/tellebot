"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ListingForm } from "@/components/sell/listing-form"
import { SectionHeading } from "@/components/section-heading"
import { ZapIcon, ShieldCheckIcon, WalletIcon, StoreIcon } from "lucide-react"

const perks = [
  {
    icon: ZapIcon,
    title: "Instant self-serve listing",
    body: "Flip to merchant mode and publish in minutes. No approval queue, no gatekeepers.",
  },
  {
    icon: WalletIcon,
    title: "Keep more of every sale",
    body: "Low flat fees on digital goods. Track earnings and payouts from one dashboard.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Build your trust score",
    body: "Every delivery, review, and dispute-free sale grows the reputation buyers see.",
  },
]

export function BecomeMerchant() {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <div className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Merchant mode"
          title="List your first product"
          description="You are now in merchant mode. Fill out the details and publish to the market."
        />
        <ListingForm />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-8 md:grid-cols-3">
        {perks.map((p) => (
          <div key={p.title} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <p.icon className="size-5" />
            </div>
            <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-5 rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-8 text-center md:p-12">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <StoreIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-balance font-display text-2xl font-bold tracking-tight md:text-3xl">
            Ready to bond with the market?
          </h2>
          <p className="mx-auto max-w-lg text-pretty text-muted-foreground">
            Activate merchant mode to unlock listings, earnings tracking, and your public storefront profile.
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => {
            setActive(true)
            toast.success("Merchant mode activated. Let's list your first product.")
          }}
        >
          Become a merchant
        </Button>
      </div>
    </div>
  )
}
