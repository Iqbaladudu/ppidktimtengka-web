import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Flame } from 'lucide-react'
import { getArticles } from '@/lib/payload'
import type { Article, Author, Category, Media } from '@/payload-types'

export async function LatestNews() {
  // Fetch featured and latest articles
  const featuredResult = await getArticles({ featured: true, limit: 1 })
  const latestResult = await getArticles({ limit: 4, excludeId: featuredResult.docs[0]?.id })

  const featured = featuredResult.docs[0]
  const latestArticles = latestResult.docs

  if (!featured && latestArticles.length === 0) {
    return null
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-emerald-600">
              <Flame className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Berita Terbaru</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Kabar Terkini
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Ikuti perkembangan terbaru dari komunitas pelajar Indonesia di Timur Tengah
            </p>
          </div>
          <Link
            href="/artikel"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Featured Article */}
          {featured && <FeaturedCard article={featured} formatDate={formatDate} />}

          {/* Latest Articles List */}
          <div className="flex flex-col gap-4">
            {latestArticles.map((article) => (
              <ArticleRow key={article.id} article={article} formatDate={formatDate} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({
  article,
  formatDate,
}: {
  article: Article
  formatDate: (date: string) => string
}) {
  const image = article.featuredImage as Media | undefined
  const author = article.author as Author | undefined
  const categories = (article.categories || []) as Category[]

  return (
    <Link href={`/artikel/${article.slug}`} className="group block">
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-slate-100">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-emerald-100 to-teal-100">
            <span className="text-6xl font-bold text-emerald-200">P</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {categories.length > 0 && (
            <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              {categories[0].name}
            </span>
          )}
          <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
            {article.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 text-sm text-white/80">
            {author && <span>{author.name}</span>}
            <span>•</span>
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ArticleRow({
  article,
  formatDate,
}: {
  article: Article
  formatDate: (date: string) => string
}) {
  const image = article.featuredImage as Media | undefined
  const categories = (article.categories || []) as Category[]

  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-emerald-100 hover:shadow-md"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50">
            <span className="text-2xl font-bold text-emerald-200">P</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        {categories.length > 0 && (
          <span className="mb-1 text-xs font-medium text-emerald-600">{categories[0].name}</span>
        )}
        <h4 className="line-clamp-2 font-semibold leading-snug text-slate-900 transition-colors group-hover:text-emerald-600">
          {article.title}
        </h4>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <Clock className="h-3 w-3" />
          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          {article.readingTime && (
            <>
              <span>•</span>
              <span>{article.readingTime} menit baca</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
