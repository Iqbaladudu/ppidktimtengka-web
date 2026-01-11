import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles, getCategories, getSiteSettings } from '@/lib/payload'
import { ArticleGrid, HeadlineSection } from '@/components/articles'
import { Pagination } from '@/components/layout'
import { NewsLayout } from '@/components/layout/NewsLayout'
import { TrendingUp, Clock, Flame } from 'lucide-react'

interface BeritaPageProps {
  searchParams: Promise<{ page?: string; kategori?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const siteName = siteSettings.siteName || 'PPIDK Timtengka'

  return {
    title: `Berita Terbaru | ${siteName}`,
    description: 'Baca berita dan artikel terbaru dari PPIDK Timtengka',
  }
}

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const { page: pageParam, kategori } = await searchParams

  const page = Number(pageParam) || 1
  const isFirstPage = page === 1 && !kategori

  // Fetch articles
  const articlesResult = await getArticles({
    page,
    limit: 12,
    categorySlug: kategori,
  })

  // Fetch headline and featured for first page
  let headline: (typeof articlesResult.docs)[0] | undefined = undefined
  let featured: typeof articlesResult.docs = []

  if (isFirstPage) {
    const headlineResult = await getArticles({ headline: true, limit: 1 })
    headline = headlineResult.docs[0]

    const featuredResult = await getArticles({
      featured: true,
      limit: 4,
      excludeId: headline?.id,
    })
    featured = featuredResult.docs
  }

  // Fetch categories for filter
  const categories = await getCategories()
  const siteSettings = await getSiteSettings()

  return (
    <NewsLayout siteName={siteSettings.siteName || 'PPIDK Timtengka'}>
      {/* Hero Banner */}
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-emerald-50/30 to-teal-50/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-2 text-emerald-700">
            <Flame className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Berita Terkini</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Kabar Terbaru
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Ikuti perkembangan terkini seputar kegiatan, prestasi, dan informasi dari komunitas
            pelajar Indonesia di Timur Tengah.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Category Filter */}
        {categories.docs.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/artikel"
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  !kategori
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                Semua Artikel
              </Link>
              {categories.docs.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/artikel?kategori=${cat.slug}`}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                    kategori === cat.slug
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50'
                  }`}
                  style={
                    kategori === cat.slug
                      ? {}
                      : { borderColor: cat.color ? `${cat.color}20` : undefined }
                  }
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Headline Section - Only on first page */}
        {isFirstPage && (headline || featured.length > 0) && (
          <>
            <HeadlineSection headline={headline} featured={featured} />
            <div className="my-12 border-t border-slate-200" />
          </>
        )}

        {/* Articles Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              {isFirstPage ? 'Artikel Lainnya' : kategori ? 'Artikel' : 'Semua Artikel'}
            </h2>
            <span className="text-sm text-slate-500">{articlesResult.totalDocs} artikel</span>
          </div>

          {articlesResult.docs.length > 0 ? (
            <ArticleGrid articles={articlesResult.docs} columns={3} />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Clock className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Belum ada artikel</h3>
              <p className="mt-2 text-sm text-slate-600">
                Artikel untuk kategori ini akan segera hadir.
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {articlesResult.totalPages > 1 && (
          <Pagination
            currentPage={articlesResult.page || 1}
            totalPages={articlesResult.totalPages}
            className="mt-12"
          />
        )}
      </div>
    </NewsLayout>
  )
}
