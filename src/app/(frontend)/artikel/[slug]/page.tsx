import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getRelatedArticles, getArticles, getSiteSettings } from '@/lib/payload'
import type { Category, Author, Rubric } from '@/payload-types'
import {
  ArticleMeta,
  ArticleContent,
  RelatedArticles,
  ShareButtons,
  AuthorCard,
  ReadingProgressBar,
} from '@/components/articles'
import { NewsLayout } from '@/components/layout/NewsLayout'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    }
  }

  const siteSettings = await getSiteSettings()
  const siteName = siteSettings.siteName || 'PPIDK Timtengka'

  const title = article.seo?.metaTitle || article.title
  const description =
    article.seo?.metaDescription || article.excerpt || `Baca artikel ${article.title}`

  const ogImage =
    (article.seo?.ogImage as { url?: string })?.url ||
    (article.featuredImage as { url?: string })?.url

  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.publishedAt || undefined,
      authors: [(article.author as Author)?.name || ''],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

// Generate static params for SSG
export async function generateStaticParams() {
  const articles = await getArticles({ limit: 100 })
  return articles.docs.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const categories = (article.categories || []) as Category[]
  const categoryIds = categories.map((c) => c.id)

  const relatedArticles = await getRelatedArticles(article.id, categoryIds, 4)
  const author = article.author as Author
  const rubric = article.rubric as Rubric | undefined
  const siteSettings = await getSiteSettings()

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || '',
    image: (article.featuredImage as { url?: string })?.url,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: author?.name,
      url: author ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}/penulis/${author.slug}` : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: siteSettings.siteName || 'PPIDK Timtengka',
    },
    articleSection: categories.map((c) => c.name),
  }

  return (
    <NewsLayout siteName={siteSettings.siteName || 'PPIDK Timtengka'}>
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Container */}
      <article className="mx-auto max-w-4xl px-3 py-6 md:px-6 md:py-12">
        {/* Article Header */}
        <ArticleMeta article={article} />

        {/* Share Buttons */}
        <div className="mb-8 flex justify-center">
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/artikel/${article.slug}`}
            title={article.title}
          />
        </div>

        {/* Article Content */}
        <div className="rounded-2xl bg-white px-5 py-6 shadow-sm md:px-12 md:py-12">
          <ArticleContent content={article.content} />
        </div>

        {/* Author Card */}
        {author && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Tentang Penulis
            </h3>
            <AuthorCard author={author} size="lg" showBio />
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </div>
      )}
    </NewsLayout>
  )
}
