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
  getPressReleases,
  normalizePressReleaseAsArticle,
} from '@/lib/payload'
import { ArticleGrid, HeadlineSection } from '@/components/articles'
import { Sidebar } from '@/components/articles/Sidebar'
import { RubricHighlight } from '@/components/articles/RubricHighlight'
import { ArticleSearch } from '@/components/articles/ArticleSearch'
import { ArticleFilter } from '@/components/articles/ArticleFilter'
import { ArticleProvider } from '@/components/articles/ArticlePageContext'
import { ArticleFeed } from '@/components/articles/ArticleFeed'
import { Pagination } from '@/components/layout'
import { NewsLayout } from '@/components/layout/NewsLayout'
import { TrendingUp, Clock, Flame } from 'lucide-react'
import type { Article, Tag as TagType, Author, Rubric } from '@/payload-types'

// Revalidate this page every 60 seconds
export const revalidate = 60

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
    pressReleasesResult,
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
    getPressReleases({
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

  // Merge articles and press releases, sorted by publishedAt descending
  const normalizedPressReleases = pressReleasesResult.docs.map(normalizePressReleaseAsArticle)
  const mergedDocs = [...articlesResult.docs, ...normalizedPressReleases].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt).getTime()
    const dateB = new Date(b.publishedAt || b.createdAt).getTime()
    return dateB - dateA
  })
  const totalMergedDocs = articlesResult.totalDocs + pressReleasesResult.totalDocs

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
      <ArticleProvider>
        {/* Hero Banner */}
        {/* Hero Banner */}
        <div className="relative overflow-hidden border-b border-primary/80 dark:border-primary/60 bg-primary dark:bg-primary/90 text-primary-foreground">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[40px_40px]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
            <div className="flex items-center gap-2 text-primary-foreground/80 dark:text-primary-foreground/70">
              <Flame className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Berita Terkini</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl text-primary-foreground">
              {q ? `Hasil Pencarian: "${q}"` : 'Kabar Terbaru'}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 dark:text-primary-foreground/70 md:text-xl">
              {q
                ? `Menampilkan artikel yang memuat kata kunci "${q}"`
                : 'Ikuti perkembangan terkini seputar kegiatan, prestasi, dan informasi dari komunitas pelajar Indonesia di Timur Tengah.'}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          {/* Search Bar (Mobile/Desktop) */}
          <div className="mb-10 max-w-2xl mx-auto -mt-16 relative z-10 shadow-xl rounded-2xl bg-white p-2 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <ArticleSearch />
          </div>

          {/* Category Filter */}
          {categoriesResult.docs.length > 0 && (
            <ArticleFilter categories={categoriesResult.docs} activeCategory={kategori} />
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
              <ArticleFeed>
                {/* Articles Grid */}
                <section>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      {q
                        ? 'Hasil Pencarian'
                        : isFirstPage
                          ? 'Artikel Lainnya'
                          : kategori
                            ? 'Artikel'
                            : 'Semua Artikel'}
                    </h2>
                    <span className="text-sm text-slate-500">
                      {totalMergedDocs} artikel
                    </span>
                  </div>

                  {mergedDocs.length > 0 ? (
                    <ArticleGrid articles={mergedDocs} columns={2} />
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
              </ArticleFeed>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 lg:mt-0">
              <div className="sticky top-24">
                <Sidebar
                  trendingArticles={trendingResult.docs as Article[]}
                  tags={tagsResult.docs as TagType[]}
                  authors={authorsResult.docs as Author[]}
                  rubrics={rubricsResult.docs as Rubric[]}
                />
              </div>
            </div>
          </div>
        </div>
      </ArticleProvider>
    </NewsLayout>
  )
}
