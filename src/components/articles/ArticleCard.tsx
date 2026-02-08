'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Article, Media, Author, Category } from '@/payload-types'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { Clock, User } from 'lucide-react'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const thumbnail = (article as any).thumbnail as Media | undefined
  const displayImage = thumbnail || featuredImage

  const author = article.author as Author | undefined
  const categories = (article.categories || []) as Category[]

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Horizontal Card (e.g. for sidebars or lists)
  if (variant === 'horizontal') {
    return (
      <article
        className={cn(
          'group flex gap-5 p-4 rounded-2xl bg-card border border-border transition-all hover:shadow-lg hover:border-primary/20 hover:bg-accent/5',
          className,
        )}
      >
        <Link
          href={`/artikel/${article.slug}`}
          className="relative aspect-[4/3] w-32 md:w-40 shrink-0 overflow-hidden rounded-xl bg-muted"
        >
          {displayImage?.url ? (
            <Image
              src={displayImage.url}
              alt={displayImage.alt || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 128px, 160px"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-muted">
              <span className="text-xs text-center p-2">No image</span>
            </div>
          )}
        </Link>
        <div className="flex flex-1 flex-col py-1">
          <div className="mb-2">
            {categories.length > 0 && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
                {categories[0].name}
              </span>
            )}
            <Link href={`/artikel/${article.slug}`}>
              <h3 className="line-clamp-2 text-base md:text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                {article.title}
              </h3>
            </Link>
          </div>

          <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
            <time
              dateTime={article.publishedAt || article.createdAt}
              className="flex items-center gap-1"
            >
              <Clock className="w-3 h-3" />
              {formatDate(article.publishedAt || article.createdAt)}
            </time>
          </div>
        </div>
      </article>
    )
  }

  // Large Featured Card (Hero style)
  if (variant === 'featured') {
    return (
      <article
        className={cn(
          'group relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl border border-white/5',
          className,
        )}
      >
        <Link
          href={`/artikel/${article.slug}`}
          className="relative block aspect-4/5 md:aspect-video w-full overflow-hidden"
        >
          {displayImage?.url ? (
            <Image
              src={displayImage.url}
              alt={displayImage.alt || article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-800">
              <span className="text-slate-500">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </Link>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white z-10">
          {categories.length > 0 && (
            <div className="mb-3 md:mb-4 flex flex-wrap gap-2">
              {categories.slice(0, 2).map((cat) => (
                <CategoryBadge
                  key={cat.id}
                  category={cat}
                  size="sm"
                  variant="solid"
                  className="shadow-lg backdrop-blur-md"
                />
              ))}
            </div>
          )}
          <Link href={`/artikel/${article.slug}`}>
            <h2 className="mb-3 md:mb-4 line-clamp-2 text-xl sm:text-2xl md:text-4xl font-extrabold leading-tight tracking-tight text-white transition-colors group-hover:text-primary-foreground/90">
              {article.title}
            </h2>
          </Link>

          {article.excerpt && (
            <p className="mb-4 md:mb-6 line-clamp-2 text-sm md:text-lg text-white/80 max-w-3xl">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-white/70 font-medium">
            {author && (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-white/20 overflow-hidden relative border border-white/10">
                  {(author.avatar as Media)?.url ? (
                    <Image
                      src={(author.avatar as Media).url!}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 m-auto text-white/70" />
                  )}
                </div>
                <Link
                  href={`/penulis/${author.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {author.name}
                </Link>
              </div>
            )}
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <time dateTime={article.publishedAt || article.createdAt}>
              {formatDate(article.publishedAt || article.createdAt)}
            </time>
          </div>
        </div>
      </article>
    )
  }

  // Standard Vertical Card (Default)
  return (
    <article
      className={cn(
        'group flex flex-col h-full overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5 border border-border/50 hover:border-primary/20',
        className,
      )}
    >
      <Link
        href={`/artikel/${article.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted"
      >
        {displayImage?.url ? (
          <Image
            src={displayImage.url}
            alt={displayImage.alt || article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-muted">
            No image
          </div>
        )}

        {/* Floating Categories */}
        {categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-1 z-10">
            {categories.slice(0, 1).map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide bg-background/90 backdrop-blur-md text-primary rounded-full shadow-lg border border-border/50"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 pt-5 px-3 pb-3">
        <Link href={`/artikel/${article.slug}`} className="mb-3">
          <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {article.title}
          </h3>
        </Link>

        {article.excerpt && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted overflow-hidden relative border border-border">
              {(author?.avatar as Media)?.url ? (
                <Image
                  src={(author!.avatar as Media).url!}
                  alt={author!.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  <User className="h-3 w-3" />
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-foreground/80">
              {author?.name || 'Admin'}
            </span>
          </div>

          <time className="text-[10px] md:text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            })}
          </time>
        </div>
      </div>
    </article>
  )
}
