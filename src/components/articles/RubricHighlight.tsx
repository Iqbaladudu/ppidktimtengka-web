'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'
import type { Article, Media, Rubric, Author } from '@/payload-types'
import { cn } from '@/lib/utils'

interface RubricHighlightProps {
  rubric: Rubric
  articles: Article[]
}

export function RubricHighlight({ rubric, articles }: RubricHighlightProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 320 // card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  if (articles.length === 0) return null

  const rubricColor = rubric.color || 'var(--primary)'

  return (
    <div className="relative my-12 py-4">
      <div className="relative px-4 md:px-0">
        <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-border">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-4 rounded-full px-4 py-2"
              style={{ backgroundColor: `${rubricColor}15` }}
            >
              <Sparkles className="h-4 w-4" style={{ color: rubricColor }} />
              <span
                className="text-sm font-black uppercase tracking-wide"
                style={{ color: rubricColor }}
              >
                Pilihan Redaksi
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              {rubric.name}
            </h2>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-xl bg-card shadow-lg border-2 border-border hover:scale-105 hover:shadow-xl transition-all text-muted-foreground hover:-translate-y-0.5"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-xl bg-card shadow-lg border-2 border-border hover:scale-105 hover:shadow-xl transition-all text-muted-foreground hover:-translate-y-0.5"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {articles.map((article) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const thumbnail = (article as any).thumbnail as Media | undefined
            const featuredImage = article.featuredImage as Media | undefined
            const displayImage = thumbnail || featuredImage
            const author = article.author as Author

            return (
              <div key={article.id} className="snap-start shrink-0 w-[280px] md:w-[320px] group">
                <Link
                  href={`/artikel/${article.slug}`}
                  className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {displayImage?.url ? (
                      <Image
                        src={displayImage.url}
                        alt={displayImage.alt || article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 280px, 320px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted font-semibold">
                        No Image
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide shadow-lg backdrop-blur-md bg-card/90"
                        style={{ color: rubricColor }}
                      >
                        {(article.categories as any)?.[0]?.name || 'Artikel'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-black leading-tight text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-border">
                      <div className="h-8 w-8 rounded-full bg-muted overflow-hidden relative ring-1 ring-border shrink-0">
                        {(author.avatar as Media)?.url ? (
                          <Image
                            src={(author.avatar as Media).url!}
                            alt={author.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs font-bold">
                            {author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-foreground truncate">
                          {author.name}
                        </span>
                        <time className="text-[10px] text-muted-foreground font-semibold">
                          {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                            'id-ID',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            },
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}

          {/* 'See All' Card */}
          <Link
            href={`/rubrik/${rubric.slug}`}
            className="snap-start shrink-0 w-[240px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 hover:bg-card hover:border-solid hover:shadow-xl transition-all duration-500 group relative overflow-hidden hover:-translate-y-2"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
              style={{ backgroundColor: rubricColor }}
            />
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-lg border bg-card"
              style={{
                color: rubricColor,
                borderColor: `${rubricColor}40`,
              }}
            >
              <ArrowRight className="h-6 w-6" />
            </div>
            <span className="font-black text-lg text-foreground group-hover:text-primary transition-colors">
              Lihat Semua
            </span>
            <span className="text-sm text-muted-foreground text-center px-6 mt-2 font-semibold">
              Artikel di {rubric.name}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
