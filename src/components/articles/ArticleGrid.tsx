import React from 'react'
import { cn } from '@/lib/utils'
import type { Article } from '@/payload-types'
import { ArticleCard } from './ArticleCard'

interface ArticleGridProps {
  articles: Article[]
  columns?: 2 | 3 | 4
  className?: string
}

export function ArticleGrid({ articles, columns = 3, className }: ArticleGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (articles.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed bg-muted/50">
        <p className="text-muted-foreground">Belum ada artikel</p>
      </div>
    )
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} priority={index < 3} />
      ))}
    </div>
  )
}
