import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { RatingStars } from '@/components/rating-stars'
import { TrustLevelBadge } from '@/components/trust-score'
import { formatCurrency, type Merchant } from '@/lib/data'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function MerchantCard({ merchant }: { merchant: Merchant }) {
  return (
    <Link href={`/merchant/${merchant.handle}`} className="block">
      <Card className="group h-full transition-colors hover:border-primary/60">
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border border-border">
              <AvatarFallback className="bg-secondary font-display text-secondary-foreground">
                {initials(merchant.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-display text-base leading-none group-hover:text-primary">
                  {merchant.name}
                </h3>
              </div>
              <p className="truncate text-xs text-muted-foreground">@{merchant.handle}</p>
            </div>
            <TrustLevelBadge level={merchant.trustLevel} />
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{merchant.bio}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RatingStars value={merchant.rating} size="sm" />
            <span>
              {merchant.rating.toFixed(1)} ({merchant.reviews.toLocaleString()})
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
            <Stat label="Trust" value={String(merchant.trustScore)} highlight />
            <Stat label="Services" value={merchant.totalServices.toLocaleString()} />
            <Stat label="Earned" value={formatCurrency(merchant.totalEarnings)} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`font-display text-sm ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  )
}
