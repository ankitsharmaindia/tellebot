'use client'

import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart/cart-provider'
import type { Product } from '@/lib/data'
import type { ComponentProps } from 'react'

export function AddToCartButton({
  product,
  label = 'Add to cart',
  className,
  size,
  variant,
}: {
  product: Product
  label?: string
  className?: string
  size?: ComponentProps<typeof Button>['size']
  variant?: ComponentProps<typeof Button>['variant']
}) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      onClick={() => {
        add(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 1200)
      }}
    >
      {added ? (
        <Check data-icon="inline-start" />
      ) : (
        <ShoppingCart data-icon="inline-start" />
      )}
      {added ? 'Added' : label}
    </Button>
  )
}
