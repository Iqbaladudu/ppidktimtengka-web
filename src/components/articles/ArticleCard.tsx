'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Article, Media, Author, Category } from '@/payload-types'
import { CategoryBadge } from '@/components/ui/CategoryBadge'

interface ArticleCardProps {
  article: Article
  variant?: 'vertical' | 'horizontal' | 'featured'
  className?: string
  priority?: boolean
}

export function ArticleCard({
  article,
  variant = 'vertical',
  className,
  priority = false,
}: ArticleCardProps) {
  const featuredImage = article.featuredImage as Media | undefined
  const author = article.author as Author | undefined
  const categories = (article.categories || []) as Category[]

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (variant === 'horizontal') {
    return (
      <article
        className={cn(
          'group flex gap-4 rounded-xl bg-card p-3 transition-all hover:shadow-lg',
          className,
        )}
      >
        <Link
          href={`/artikel/${article.slug}`}
          className="relative aspect-4/3 w-32 shrink-0 overflow-hidden rounded-lg sm:w-40"
        >
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 128px, 160px"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </Link>
        <div className="flex flex-1 flex-col justify-between py-1">
          <div>
            {categories.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                {categories.slice(0, 1).map((cat) => (
                  <CategoryBadge key={cat.id} category={cat} size="sm" />
                ))}
              </div>
            )}
            <Link href={`/artikel/${article.slug}`}>
              <h3 className="line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-primary">
                {article.title}
              </h3>
            </Link>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={article.publishedAt || article.createdAt}>
              {formatDate(article.publishedAt || article.createdAt)}
            </time>
            {article.readingTime && (
              <>
                <span>·</span>
                <span>{article.readingTime} menit baca</span>
              </>
            )}
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article
        className={cn('group relative overflow-hidden rounded-2xl bg-card shadow-xl', className)}
      >
        <Link
          href={`/artikel/${article.slug}`}
          className="relative block aspect-video w-full overflow-hidden"
        >
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        </Link>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {categories.slice(0, 2).map((cat) => (
                <CategoryBadge key={cat.id} category={cat} size="sm" variant="solid" />
              ))}
            </div>
          )}
          <Link href={`/artikel/${article.slug}`}>
            <h2 className="mb-3 line-clamp-3 text-2xl font-bold leading-tight transition-colors hover:text-primary-foreground/90 md:text-3xl">
              {article.title}
            </h2>
          </Link>
          {article.excerpt && (
            <p className="mb-4 line-clamp-2 text-sm text-gray-200 md:text-base">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-300">
            {author && (
              <Link href={`/penulis/${author.slug}`} className="font-medium hover:text-white">
                {author.name}
              </Link>
            )}
            <span>·</span>
            <time dateTime={article.publishedAt || article.createdAt}>
              {formatDate(article.publishedAt || article.createdAt)}
            </time>
            {article.readingTime && (
              <>
                <span>·</span>
                <span>{article.readingTime} menit baca</span>
              </>
            )}
          </div>
        </div>
      </article>
    )
  }

  // Default vertical variant
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-lg',
        className,
      )}
    >
      <Link
        href={`/artikel/${article.slug}`}
        className="relative block aspect-16/10 w-full overflow-hidden"
      >
        {featuredImage?.url ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </Link>
      <div className="p-4">
        {categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {categories.slice(0, 2).map((cat) => (
              <CategoryBadge key={cat.id} category={cat} size="sm" />
            ))}
          </div>
        )}
        <Link href={`/artikel/${article.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
            {article.title}
          </h3>
        </Link>
        {article.excerpt && (
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {author && (
            <>
              <Link href={`/penulis/${author.slug}`} className="font-medium hover:text-foreground">
                {author.name}
              </Link>
              <span>·</span>
            </>
          )}
          <time dateTime={article.publishedAt || article.createdAt}>
            {formatDate(article.publishedAt || article.createdAt)}
          </time>
        </div>
      </div>
    </article>
  )
}
