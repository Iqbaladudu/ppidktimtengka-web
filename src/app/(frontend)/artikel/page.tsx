import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getArticles,
  getCategories,
  getTags,
  getAuthors,
  getRubrics,
  getSiteSettings,
} from '@/lib/payload'
import { ArticleGrid, HeadlineSection } from '@/components/articles'
import { Sidebar } from '@/components/articles/Sidebar'
import { RubricHighlight } from '@/components/articles/RubricHighlight'
import { ArticleSearch } from '@/components/articles/ArticleSearch'
import { Pagination } from '@/components/layout'
import { NewsLayout } from '@/components/layout/NewsLayout'
import { TrendingUp, Clock, Flame } from 'lucide-react'
import type { Article, Tag as TagType, Author, Rubric } from '@/payload-types'

interface BeritaPageProps {
  searchParams: Promise<{ page?: string; kategori?: string; q?: string }>
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
  const { page: pageParam, kategori, q } = await searchParams

  const page = Number(pageParam) || 1
  const isFirstPage = page === 1 && !kategori && !q

  // Parallel fetching for performance
  const [
    articlesResult,
    categoriesResult,
    tagsResult,
    trendingResult,
    authorsResult,
    rubricsResult,
  ] = await Promise.all([
    getArticles({
      page,
      limit: 12,
      categorySlug: kategori,
      query: q,
    }),
    getCategories(),
    getTags(),
    getArticles({ sort: '-viewCount', limit: 5 }),
    getAuthors(),
    getRubrics(),
  ])

  // Fetch headline and featured for first page only (no search, no filter)
  let headline: (typeof articlesResult.docs)[0] | undefined = undefined
  let featured: typeof articlesResult.docs = []
  let highlightRubric: Rubric | undefined = undefined
  let highlightArticles: Article[] = []

  if (isFirstPage) {
    const headlineResult = await getArticles({ headline: true, limit: 1 })
    headline = headlineResult.docs[0]

    const featuredResult = await getArticles({
      featured: true,
      limit: 4,
      excludeId: headline?.id,
    })
    featured = featuredResult.docs

    // Get highlight rubric (e.g. first one)
    if (rubricsResult.docs.length > 0) {
      highlightRubric = rubricsResult.docs[0] as Rubric
      const rubricArticles = await getArticles({
        rubricSlug: highlightRubric.slug,
        limit: 6,
      })
      highlightArticles = rubricArticles.docs
    }
  }

  const siteSettings = await getSiteSettings()

  return (
    <NewsLayout siteName={siteSettings.siteName || 'PPIDK Timtengka'}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-emerald-900 bg-emerald-950 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="flex items-center gap-2 text-emerald-400">
            <Flame className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Berita Terkini</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {q ? `Hasil Pencarian: "${q}"` : 'Kabar Terbaru'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-emerald-100/80 md:text-xl">
            {q
              ? `Menampilkan artikel yang memuat kata kunci "${q}"`
              : 'Ikuti perkembangan terkini seputar kegiatan, prestasi, dan informasi dari komunitas pelajar Indonesia di Timur Tengah.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Search Bar (Mobile/Desktop) */}
        <div className="mb-10 max-w-2xl mx-auto -mt-16 relative z-10 shadow-xl rounded-2xl bg-white p-2">
          <ArticleSearch />
        </div>

        {/* Category Filter */}
        {categoriesResult.docs.length > 0 && (
          <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center gap-2 w-max mx-auto">
              <Link
                href="/artikel"
                className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                  !kategori
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/10'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua
              </Link>
              {categoriesResult.docs.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/artikel?kategori=${cat.slug}${q ? `&q=${q}` : ''}`}
                  className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    kategori === cat.slug
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/10'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={kategori === cat.slug ? {} : { color: cat.color || undefined }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Headline Section - Only on first page & no search */}
        {isFirstPage && (headline || featured.length > 0) && !q && (
          <div className="mb-12">
            <HeadlineSection headline={headline} featured={featured} />
          </div>
        )}

        {/* Rubric Highlight - Only on first page & no search */}
        {isFirstPage && highlightRubric && highlightArticles.length > 0 && (
          <div className="mb-12">
            <RubricHighlight rubric={highlightRubric} articles={highlightArticles} />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 min-w-0">
            {/* Articles Grid */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  {q
                    ? 'Hasil Pencarian'
                    : isFirstPage
                      ? 'Artikel Lainnya'
                      : kategori
                        ? 'Artikel'
                        : 'Semua Artikel'}
                </h2>
                <span className="text-sm text-slate-500">{articlesResult.totalDocs} artikel</span>
              </div>

              {articlesResult.docs.length > 0 ? (
                <ArticleGrid articles={articlesResult.docs} columns={2} />
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Clock className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    Tidak ada artikel ditemukan
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Coba gunakan kata kunci lain atau reset filter kategori.
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

          {/* Sidebar Column */}
          <div className="lg:col-span-4 lg:mt-0">
            <div className="sticky top-24">
              <Sidebar
                trendingArticles={trendingResult.docs as Article[]}
                tags={tagsResult.docs as TagType[]}
                authors={authorsResult.docs as Author[]}
              />
            </div>
          </div>
        </div>
      </div>
    </NewsLayout>
  )
}
