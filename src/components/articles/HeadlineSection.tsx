import React from 'react'
import type { Article } from '@/payload-types'
import { ArticleCard } from './ArticleCard'

interface HeadlineSectionProps {
  headline?: Article
  featured: Article[]
  className?: string
}

export function HeadlineSection({ headline, featured, className }: HeadlineSectionProps) {
  if (!headline && featured.length === 0) {
    return null
  }

  return (
    <section className={className}>
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main headline */}
        {headline && (
          <div className="lg:col-span-8">
            <ArticleCard article={headline} variant="featured" priority />
          </div>
        )}

        {/* Secondary featured articles */}
        {featured.length > 0 && (
          <div className={headline ? 'lg:col-span-4' : 'lg:col-span-12'}>
            <div className="grid gap-4">
              {featured.slice(0, headline ? 3 : 4).map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="horizontal"
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
