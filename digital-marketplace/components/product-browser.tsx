'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { ProductCard } from '@/components/product-card'
import { categories, type CategorySlug, type Product } from '@/lib/data'

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'rating'

export function ProductBrowser({
  products,
  initialQuery = '',
  initialCategory = 'all',
  showCategoryFilter = true,
}: {
  products: Product[]
  initialQuery?: string
  initialCategory?: CategorySlug | 'all'
  showCategoryFilter?: boolean
}) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<CategorySlug | 'all'>(initialCategory)
  const [sort, setSort] = useState<SortKey>('popular')

  const filtered = useMemo(() => {
    let list = products
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.short.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        sorted.sort((a, b) => b.sales - a.sales)
    }
    return sorted
  }, [products, category, query, sort])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, tags, tools..."
              className="pl-9"
              aria-label="Search products"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-full sm:w-48">
              <SlidersHorizontal className="size-4" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {showCategoryFilter && (
          <ToggleGroup
            value={[category]}
            onValueChange={(v) => setCategory(((v as string[])[0] ?? 'all') as CategorySlug | 'all')}
            className="flex-wrap justify-start"
          >
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            {categories.map((c) => (
              <ToggleGroupItem key={c.slug} value={c.slug}>
                {c.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} result{filtered.length === 1 ? '' : 's'}
      </p>

      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No matches</EmptyTitle>
            <EmptyDescription>Try a different search term or clear your filters.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
