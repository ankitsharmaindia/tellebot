import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getProductsByCategory, type Category } from '@/lib/data'

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon
  const count = getProductsByCategory(category.slug).length

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
    >
      <div className="absolute inset-0">
        <Image
          src={category.cover || '/placeholder.svg'}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover opacity-40 transition-all duration-500 group-hover:scale-105 group-hover:opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/30" />
      </div>

      <div className="relative flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/15 text-primary">
          <Icon className="size-5" />
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <div className="relative mt-6">
        <h3 className="font-display text-lg leading-none">{category.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{category.tagline}</p>
        <p className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground">
          {count} listings
        </p>
      </div>
    </Link>
  )
}
