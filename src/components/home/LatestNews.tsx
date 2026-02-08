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
      className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header - More Solid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-10 lg:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 mb-4">
              <Flame className="h-4 w-4" />
              <span>Pilihan Redaksi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Resensi <span className="text-primary">Buku</span>
            </h2>
          </div>
          <Link
            href="/artikel"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Artikel di Resensi
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content (Featured) - 8 Cols */}
          <div className="lg:col-span-8">
            {/* Featured Article - Enhanced Solid Design */}
            {featuredArticle && (
              <div className="group relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-4/5 sm:aspect-16/10 mb-8 lg:mb-12 shadow-2xl hover:shadow-3xl transition-shadow duration-500 ring-1 ring-slate-200 dark:ring-slate-800">
                <Image
                  src={getImageUrl(featuredArticle)}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                  <span className="inline-block px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-primary text-primary-foreground text-xs font-black mb-3 lg:mb-4 uppercase tracking-wider shadow-lg">
                    {getCategoryName(featuredArticle)}
                  </span>
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white mb-3 lg:mb-4 leading-tight group-hover:text-blue-300 transition-colors">
                    <Link href={`/artikel/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                  </h3>
                  <p className="text-slate-100 text-sm sm:text-base lg:text-lg line-clamp-2 mb-4 lg:mb-6 max-w-3xl font-medium">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 lg:gap-6 text-white/90 text-sm font-semibold">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-lg">
                      <User className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                      <span>{getAuthorName(featuredArticle)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-lg">
                      <Calendar className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                      <span>
                        {formatDate(featuredArticle.publishedAt || featuredArticle.createdAt)}
                      </span>
                    </div>
                    {featuredArticle.readingTime && (
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-lg">
                        <Clock className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                        <span>{featuredArticle.readingTime} min baca</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Latest List (Grid 2 cols) - Enhanced Card Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {latestList.map((article) => (
                <div
                  key={article.id}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 dark:border-slate-800"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {getImageUrl(article) !== '/placeholder.jpg' ? (
                      <Image
                        src={getImageUrl(article)}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-semibold">
                        No Image
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-primary text-primary-foreground backdrop-blur-sm rounded-lg text-xs font-black uppercase tracking-wide shadow-lg">
                        {getCategoryName(article)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3 font-semibold">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>
                    <h4 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                      <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
                    </h4>
                    <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 line-clamp-2 font-medium">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - 4 Cols - Enhanced Widgets */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            {/* Trending Widget - More Solid */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 lg:p-7 border-2 border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex items-center gap-2.5 mb-6 lg:mb-8 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-black text-base lg:text-lg text-slate-900 dark:text-white">
                  Sedang Hangat
                </h3>
              </div>

              <div className="space-y-5 lg:space-y-6">
                {trendingArticles.map((article, idx) => (
                  <div
                    key={article.id}
                    className="group flex gap-4 items-start pb-5 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
                  >
                    <span className="text-3xl font-black bg-linear-to-br from-primary to-blue-600 bg-clip-text text-transparent leading-none shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase mb-2 rounded">
                        {getCategoryName(article)}
                      </span>
                      <h4 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                        <Link href={`/artikel/${article.slug}`} className="line-clamp-2">
                          {article.title}
                        </Link>
                      </h4>
                      {article.readingTime && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{article.readingTime} min baca</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Widget - More Solid */}
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-primary via-blue-600 to-blue-700 p-6 lg:p-8 text-primary-foreground shadow-2xl border-2 border-primary">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/30">
                  <Share2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black mb-2">Jangan Ketinggalan Info!</h3>
                <p className="text-blue-50 text-sm mb-6 font-medium">
                  Dapatkan ringkasan berita dan peluang beasiswa setiap minggu.
                </p>
                <Link
                  href="#newsletter"
                  className="block w-full py-3.5 bg-white text-primary rounded-xl font-black text-sm hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Langganan Newsletter
                </Link>
              </div>
            </div>

            {/* Tags Widget - More Solid */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 lg:p-7 border-2 border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="font-black text-base lg:text-lg text-slate-900 dark:text-white mb-5 flex items-center gap-2.5 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Tag className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                Topik Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {(tagsResult.docs as TagType[]).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/artikel?tag=${tag.slug}`}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-primary-foreground transition-all font-bold border-2 border-transparent hover:border-primary shadow-sm hover:shadow-md hover:-translate-y-0.5"
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
