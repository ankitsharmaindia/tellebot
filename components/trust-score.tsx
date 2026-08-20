import { ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { trustLevelColor, type Merchant } from '@/lib/data'

export function TrustLevelBadge({
  level,
  className,
}: {
  level: Merchant['trustLevel']
  className?: string
}) {
  return (
    <Badge className={cn('gap-1 border-transparent font-medium', trustLevelColor[level], className)}>
      <ShieldCheck className="size-3" />
      {level}
    </Badge>
  )
}

export function TrustScoreMeter({
  score,
  className,
}: {
  score: number
  className?: string
}) {
  const tone =
    score >= 90 ? 'text-primary' : score >= 75 ? 'text-foreground' : 'text-muted-foreground'
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Trust score
        </span>
        <span className={cn('font-display text-lg leading-none', tone)}>{score}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
