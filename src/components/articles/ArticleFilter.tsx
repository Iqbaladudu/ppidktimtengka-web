'use client'

import React, { useOptimistic } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Category } from '@/payload-types'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useArticleContext } from './ArticlePageContext'

interface ArticleFilterProps {
  categories: Category[]
  activeCategory?: string
}

export function ArticleFilter({ categories, activeCategory }: ArticleFilterProps) {
  const searchParams = useSearchParams()
  const { isPending, navigateTo } = useArticleContext()

  // Optimistic state for immediate UI feedback
  const [optimisticCategory, setOptimisticCategory] = useOptimistic(
    activeCategory || '',
    (state, newCategory: string) => newCategory,
  )

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()

    // Immediate UI update
    setOptimisticCategory(slug)

    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('kategori', slug)
      params.delete('page') // Reset to page 1
    } else {
      params.delete('kategori')
      params.delete('page')
    }

    const newUrl = `/artikel?${params.toString()}`
    navigateTo(newUrl)
  }

  return (
    <div className="mb-10 pb-4 md:px-0">
      <div className="flex items-center flex-wrap justify-start gap-2 w-full mx-auto">
        {/* "All" Button */}
        <Link
          href="/artikel"
          onClick={(e) => handleCategoryClick(e, '')}
          className={cn(
            'shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300',
            !optimisticCategory
              ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105'
              : 'bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground hover:border-accent',
          )}
        >
          Semua
        </Link>

        {/* Category Buttons */}
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/artikel?kategori=${cat.slug}`}
            onClick={(e) => handleCategoryClick(e, cat.slug!)}
            className={cn(
              'shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300',
              optimisticCategory === cat.slug
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105'
                : 'bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground hover:border-accent',
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
