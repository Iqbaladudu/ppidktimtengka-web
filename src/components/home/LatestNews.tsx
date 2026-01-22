import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Flame, Calendar, User, Tag, TrendingUp, Share2 } from 'lucide-react'
import { getArticles, getTags } from '@/lib/payload'
import type { Article, Media, Category, Author, Tag as TagType } from '@/payload-types'

export const LatestNews = async () => {
  // Fetch data in parallel
  const [featuredResult, trendingResult, tagsResult] = await Promise.all([
    getArticles({ featured: true, limit: 1 }),
    getArticles({ sort: '-viewCount', limit: 4 }),
    getTags(),
  ])

  const featuredArticle = featuredResult.docs[0] as Article | undefined
  const trendingArticles = trendingResult.docs as Article[]

  // Fetch latest articles excluding the featured one
  const latestResult = await getArticles({
    limit: 4,
    excludeId: featuredArticle?.id,
  })
  const latestList = latestResult.docs as Article[]

  // Helper to get image URL
  const getImageUrl = (article: Article) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const thumbnail = (article as any).thumbnail as Media | undefined
    const featured = article.featuredImage as Media | undefined
    return thumbnail?.url || featured?.url || '/placeholder.jpg' // Add a placeholder if needed
  }

  // Helper to get category name
  const getCategoryName = (article: Article) => {
    const categories = article.categories as Category[]
    return categories?.[0]?.name || 'Umum'
  }

  // Helper to get author name
  const getAuthorName = (article: Article) => {
    const author = article.author as Author
    return author?.name || 'Admin'
  }

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section
      id="berita"
      className="py-16 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-8 lg:mb-12 border-b border-slate-200 dark:border-slate-800 pb-6 lg:pb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs lg:text-sm uppercase tracking-wider mb-2">
              <Flame className="h-3 w-3 lg:h-4 lg:w-4" />
              <span>Wawasan & Informasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              Kabar <span className="text-slate-500 dark:text-slate-400">Timtengka</span>
            </h2>
          </div>
          <Link
            href="/artikel"
            className="group flex items-center gap-2 text-sm lg:text-base font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Lihat Semua Artikel
            <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content (Featured) - 8 Cols */}
          <div className="lg:col-span-8">
            {/* Featured Article */}
            {featuredArticle && (
              <div className="group relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/10] mb-8 lg:mb-12">
                <Image
                  src={getImageUrl(featuredArticle)}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <span className="inline-block px-2 py-1 lg:px-3 lg:py-1 rounded-lg bg-blue-600 text-white text-[10px] lg:text-xs font-bold mb-3 lg:mb-4 uppercase tracking-wider">
                    {getCategoryName(featuredArticle)}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-3 lg:mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                    <Link href={`/artikel/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm lg:text-lg line-clamp-2 mb-4 lg:mb-6 max-w-2xl">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-white/80 text-xs lg:text-sm font-medium">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <User className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>{getAuthorName(featuredArticle)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>{formatDate(featuredArticle.publishedAt || featuredArticle.createdAt)}</span>
                    </div>
                    {featuredArticle.readingTime && (
                      <div className="flex items-center gap-1.5 lg:gap-2">
                        <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{featuredArticle.readingTime} min baca</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Latest List (Grid 2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {latestList.map((article) => (
                <div key={article.id} className="group flex flex-col gap-3 lg:gap-4">
                  <div className="relative aspect-video rounded-xl lg:rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {getImageUrl(article) !== '/placeholder.jpg' ? (
                      <Image
                        src={getImageUrl(article)}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                        No Image
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-md text-[10px] lg:text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                        {getCategoryName(article)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 mb-1 lg:mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>
                    <h4 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white mb-1 lg:mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
                    </h4>
                    <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - 4 Cols */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-10">
            {/* Trending Widget */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 lg:p-6 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
                <h3 className="font-bold text-sm lg:text-base text-slate-900 dark:text-white">Sedang Hangat</h3>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {trendingArticles.map((article, idx) => (
                  <div key={article.id} className="group flex gap-3 lg:gap-4 items-start">
                    <span className="text-xl lg:text-2xl font-black text-slate-200 dark:text-slate-700 leading-none -mt-1 selection:bg-transparent">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="text-[10px] lg:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1 block">
                        {getCategoryName(article)}
                      </span>
                      <h4 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white leading-tight mb-1 lg:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
                      </h4>
                      {article.readingTime && (
                        <div className="flex items-center gap-2 text-[10px] lg:text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{article.readingTime} min baca</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="relative rounded-2xl overflow-hidden bg-blue-600 p-5 lg:p-6 text-white text-center">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-professional-grid" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 lg:mb-4 backdrop-blur-sm">
                  <Share2 className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <h3 className="text-base lg:text-lg font-bold mb-2">Jangan Ketinggalan Info!</h3>
                <p className="text-blue-100 text-xs lg:text-sm mb-4 lg:mb-6">
                  Dapatkan ringkasan berita dan peluang beasiswa setiap minggu.
                </p>
                <Link
                  href="#newsletter"
                  className="block w-full py-2.5 lg:py-3 bg-white text-blue-600 rounded-xl font-bold text-xs lg:text-sm hover:bg-blue-50 transition-colors"
                >
                  Langganan Newsletter
                </Link>
              </div>
            </div>

            {/* Tags Widget */}
            <div>
              <h3 className="font-bold text-sm lg:text-base text-slate-900 dark:text-white mb-3 lg:mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4 text-slate-400" />
                Topik Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {(tagsResult.docs as TagType[]).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/artikel?tag=${tag.slug}`}
                    className="px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs lg:text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
