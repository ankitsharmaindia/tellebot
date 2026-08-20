import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/rating-stars'
import { TrustLevelBadge, TrustScoreMeter } from '@/components/trust-score'
import { formatCurrency, type Merchant } from '@/lib/data'

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function MerchantMini({ merchant }: { merchant: Merchant }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <Avatar className="size-12 border border-border">
          <AvatarFallback className="bg-secondary font-display text-secondary-foreground">
            {initials(merchant.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base leading-none">{merchant.name}</p>
          <p className="truncate text-xs text-muted-foreground">@{merchant.handle}</p>
        </div>
        <TrustLevelBadge level={merchant.trustLevel} />
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <RatingStars value={merchant.rating} size="sm" />
        <span>
          {merchant.rating.toFixed(1)} ({merchant.reviews.toLocaleString()} reviews)
        </span>
      </div>

      <TrustScoreMeter score={merchant.trustScore} />

      <div className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
        <div>
          <p className="font-display text-lg">{merchant.totalServices.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Services done</p>
        </div>
        <div>
          <p className="font-display text-lg">{formatCurrency(merchant.totalEarnings)}</p>
          <p className="text-xs text-muted-foreground">Total earned</p>
        </div>
        <div>
          <p className="font-display text-lg">{merchant.totalSales.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Sales</p>
        </div>
        <div>
          <p className="font-display text-lg">{merchant.responseTime}</p>
          <p className="text-xs text-muted-foreground">Response time</p>
        </div>
      </div>

      <Button variant="outline" render={<Link href={`/merchant/${merchant.handle}`} />}>
        View full profile
      </Button>
    </div>
  )
}
