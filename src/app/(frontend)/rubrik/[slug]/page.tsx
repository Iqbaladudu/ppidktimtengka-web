import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRubricBySlug, getArticles, getRubrics, getSiteSettings } from '@/lib/payload'
import { ArticleGrid } from '@/components/articles'
import { Pagination } from '@/components/layout'
import { NewsLayout } from '@/components/layout/NewsLayout'
import { Newspaper } from 'lucide-react'

interface RubricPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: RubricPageProps): Promise<Metadata> {
  const { slug } = await params
  const rubric = await getRubricBySlug(slug)

  if (!rubric) {
    return { title: 'Rubrik Tidak Ditemukan' }
  }

  const siteSettings = await getSiteSettings()
  const siteName = siteSettings.siteName || 'PPIDK Timtengka'

  return {
    title: `${rubric.name} | ${siteName}`,
    description: rubric.description || `Artikel rubrik ${rubric.name}`,
  }
}

export async function generateStaticParams() {
  try {
    const rubrics = await getRubrics()
    return rubrics.docs.map((rub) => ({
      slug: rub.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for rubrics:', error)
    return []
  }
}

export default async function RubricPage({ params, searchParams }: RubricPageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams

  const rubric = await getRubricBySlug(slug)

  if (!rubric) {
    notFound()
  }

  const page = Number(pageParam) || 1
  const articles = await getArticles({
    rubricSlug: slug,
    page,
    limit: 12,
  })

  const siteSettings = await getSiteSettings()

  return (
    <NewsLayout siteName={siteSettings.siteName || 'PPIDK Timtengka'}>
      {/* Rubric Header */}
      {/* Rubric Header */}
      <div className="border-b border-border bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Newspaper className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Rubrik</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            {rubric.name}
          </h1>
          {rubric.description && (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{rubric.description}</p>
          )}
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{articles.totalDocs}</span>
            <span>artikel</span>
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
