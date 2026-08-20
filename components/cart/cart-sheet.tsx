'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { useCart } from '@/components/cart/cart-provider'
import { formatCurrency } from '@/lib/data'

export function CartSheet() {
  const { items, count, subtotal, remove, setQty } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon" aria-label={`Cart with ${count} items`} className="relative" />
        }
      >
        <ShoppingCart />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {count}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Your cart</SheetTitle>
          <SheetDescription>
            {count > 0 ? `${count} item${count > 1 ? 's' : ''} ready for checkout` : 'Your cart is empty'}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ShoppingCart />
                </EmptyMedia>
                <EmptyTitle>Nothing here yet</EmptyTitle>
                <EmptyDescription>Browse the marketplace and add digital goods to your cart.</EmptyDescription>
              </EmptyHeader>
              <Button render={<Link href="/browse" />} onClick={() => setOpen(false)}>
                Explore products
              </Button>
            </Empty>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="flex flex-col gap-3 py-2">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3 rounded-lg border border-border p-2">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.product.cover || '/placeholder.svg'}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-2 text-sm font-medium leading-tight">{item.product.title}</p>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Remove item"
                          onClick={() => remove(item.product.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(item.product.id, item.qty - 1)}
                          >
                            <Minus />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.qty}</span>
                          <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="Increase quantity"
                            onClick={() => setQty(item.product.id, item.qty + 1)}
                          >
                            <Plus />
                          </Button>
                        </div>
                        <span className="font-display text-sm">
                          {formatCurrency(item.product.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <SheetFooter>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl">{formatCurrency(subtotal)}</span>
              </div>
              <Button size="lg" render={<Link href="/checkout" />} onClick={() => setOpen(false)}>
                Checkout
              </Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                <X data-icon="inline-start" />
                Continue shopping
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
