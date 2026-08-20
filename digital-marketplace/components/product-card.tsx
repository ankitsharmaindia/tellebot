import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'
import {
  formatCurrency,
  getCategory,
  getMerchant,
  type Product,
} from '@/lib/data'

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category)
  const merchant = getMerchant(product.merchantId)

  return (
    <Card className="group overflow-hidden pt-0 transition-colors hover:border-primary/60">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={product.cover || '/placeholder.svg'}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          {product.oldPrice && (
            <Badge className="absolute left-3 top-3 border-transparent bg-primary text-primary-foreground">
              Save {formatCurrency(product.oldPrice - product.price)}
            </Badge>
          )}
          {category && (
            <Badge
              variant="secondary"
              className="absolute right-3 top-3 border-transparent backdrop-blur"
            >
              {category.name}
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="flex flex-col gap-2">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-pretty font-display text-lg leading-tight transition-colors group-hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.short}</p>
        <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
          <RatingStars value={product.rating} size="sm" />
          <span>{product.rating.toFixed(1)}</span>
          <span aria-hidden>•</span>
          <span>{product.sales.toLocaleString()} sold</span>
        </div>
        {merchant && (
          <Link
            href={`/merchant/${merchant.handle}`}
            className="w-fit text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            by <span className="text-foreground">@{merchant.handle}</span>
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl">{formatCurrency(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>
        <AddToCartButton product={product} label="Add" size="sm" />
      </CardFooter>
    </Card>
  )
}
