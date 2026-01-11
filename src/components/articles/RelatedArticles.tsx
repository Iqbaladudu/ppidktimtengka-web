import React from 'react'
import type { Article } from '@/payload-types'
import { ArticleCard } from './ArticleCard'

interface RelatedArticlesProps {
  articles: Article[]
  title?: string
}

export function RelatedArticles({ articles, title = 'Artikel Terkait' }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="mb-6 text-xl font-bold">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
