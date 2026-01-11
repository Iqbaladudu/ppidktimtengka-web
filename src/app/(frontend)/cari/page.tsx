import React from 'react'
import type { Metadata } from 'next'
import { searchArticles, getSiteSettings } from '@/lib/payload'
import { ArticleGrid } from '@/components/articles'
import { Pagination } from '@/components/layout'
import { NewsLayout } from '@/components/layout/NewsLayout'
import { Search, FileSearch } from 'lucide-react'

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  const siteSettings = await getSiteSettings()
  const siteName = siteSettings.siteName || 'PPIDK Timtengka'

  return {
    title: q ? `Hasil Pencarian: ${q} | ${siteName}` : `Cari | ${siteName}`,
    description: 'Cari artikel dan berita',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page: pageParam } = await searchParams

  const page = Number(pageParam) || 1
  const query = q?.trim() || ''

  const results = query
    ? await searchArticles(query, page, 12)
    : { docs: [], page: 1, totalPages: 0, totalDocs: 0 }

  const siteSettings = await getSiteSettings()

  return (
    <NewsLayout siteName={siteSettings.siteName || 'PPIDK Timtengka'}>
      {/* Search Header */}
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-emerald-50/20 to-teal-50/20">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-2 text-emerald-700">
            <Search className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Pencarian</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Cari Artikel
          </h1>

          {/* Search Form */}
          <form method="GET" action="/cari" className="relative mt-8">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Ketik kata kunci untuk mencari artikel..."
              className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 pl-12 pr-24 text-lg shadow-sm transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Cari
            </button>
          </form>

          {query && (
            <p className="mt-4 text-sm text-slate-600">
              {results.totalDocs > 0 ? (
                <>
                  Ditemukan <span className="font-semibold">{results.totalDocs}</span> hasil untuk{' '}
                  <span className="font-semibold text-slate-900">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                <>
                  Tidak ada hasil untuk{' '}
                  <span className="font-semibold text-slate-900">&ldquo;{query}&rdquo;</span>
                </>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Results */}
        {query && results.docs.length > 0 && (
          <>
            <ArticleGrid articles={results.docs} columns={3} />
            {results.totalPages > 1 && (
              <Pagination
                currentPage={results.page || 1}
                totalPages={results.totalPages}
                className="mt-12"
              />
            )}
          </>
        )}

        {/* No Results */}
        {query && results.totalDocs === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <FileSearch className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-900">Tidak ada hasil ditemukan</h3>
            <p className="mt-2 text-slate-600">
              Coba gunakan kata kunci yang berbeda atau lebih umum
            </p>
          </div>
        )}

        {/* Initial State */}
        {!query && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <Search className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-900">Mulai pencarian Anda</h3>
            <p className="mt-2 text-slate-600">
              Masukkan kata kunci di atas untuk mencari artikel yang Anda butuhkan
            </p>
          </div>
        )}
      </div>
    </NewsLayout>
  )
}
