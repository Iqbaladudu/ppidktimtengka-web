import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Eye } from 'lucide-react'
import type { Article, Author, Category, Rubric, Media } from '@/payload-types'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { RubricTag } from '@/components/ui/RubricTag'
import { AuthorCard } from './AuthorCard'

interface ArticleMetaProps {
  article: Article
  showImage?: boolean
}

export function ArticleMeta({ article, showImage = true }: ArticleMetaProps) {
  const author = article.author as Author | undefined
  const categories = (article.categories || []) as Category[]
  const rubric = article.rubric as Rubric | undefined
  const featuredImage = article.featuredImage as Media | undefined

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <header className="mb-8">
      {/* Rubric & Categories */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {rubric && <RubricTag rubric={rubric} />}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryBadge key={cat.id} category={cat} size="sm" />
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="mb-6 text-lg text-muted-foreground md:text-xl">{article.excerpt}</p>
      )}

      {/* Author & Meta */}
      <div className="mb-6 flex flex-col gap-4 border-y py-4 sm:flex-row sm:items-center sm:justify-between">
        {author && <AuthorCard author={author} size="sm" />}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={article.publishedAt || article.createdAt}>
              {formatDate(article.publishedAt || article.createdAt)}
            </time>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime} menit baca</span>
            </div>
          )}
          {typeof article.viewCount === 'number' && article.viewCount > 0 && (
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>{article.viewCount.toLocaleString('id-ID')} dilihat</span>
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {showImage && featuredImage?.url && (
        <figure className="relative mb-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          {(featuredImage.caption || featuredImage.credit) && (
            <figcaption className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/70 to-transparent p-4 text-sm text-white">
              {featuredImage.caption && <span>{featuredImage.caption}</span>}
              {featuredImage.caption && featuredImage.credit && <span> · </span>}
              {featuredImage.credit && (
                <span className="text-gray-300">Foto: {featuredImage.credit}</span>
              )}
            </figcaption>
          )}
        </figure>
      )}
    </header>
  )
}
