import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getArticles, getCategories, getSiteSettings } from '@/lib/payload'
import { ArticleGrid } from '@/components/articles'
import { Pagination } from '@/components/layout'
import { NewsLayout } from '@/components/layout/NewsLayout'
import { FolderOpen } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Kategori Tidak Ditemukan' }
  }

  const siteSettings = await getSiteSettings()
  const siteName = siteSettings.siteName || 'PPIDK Timtengka'

  return {
    title: `${category.name} | ${siteName}`,
    description: category.description || `Artikel dalam kategori ${category.name}`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.docs.map((cat) => ({
    slug: cat.slug,
  }))
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams

  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const page = Number(pageParam) || 1
  const articles = await getArticles({
    categorySlug: slug,
    page,
    limit: 12,
  })

  const siteSettings = await getSiteSettings()

  return (
    <NewsLayout siteName={siteSettings.siteName || 'PPIDK Timtengka'}>
      {/* Category Header */}
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-slate-50 to-slate-100/50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-2 text-slate-600">
            <FolderOpen className="h-5 w-5" />
            <span className="text-sm font-medium">Kategori</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-4 max-w-2xl text-lg text-slate-600">{category.description}</p>
          )}
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium">{articles.totalDocs}</span>
            <span>artikel tersedia</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <ArticleGrid articles={articles.docs} columns={3} />

        {articles.totalPages > 1 && (
          <Pagination
            currentPage={articles.page || 1}
            totalPages={articles.totalPages}
            className="mt-12"
          />
        )}
      </div>
    </NewsLayout>
  )
}
