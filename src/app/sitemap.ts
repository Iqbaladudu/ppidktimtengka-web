import type { MetadataRoute } from 'next'
import { getArticles, getCategories, getRubrics, getAuthors } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ppidk-timtengka.org'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cari`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Articles
  const articlesResult = await getArticles({ limit: 1000 })
  const articlePages: MetadataRoute.Sitemap = articlesResult.docs.map((article) => ({
    url: `${baseUrl}/artikel/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Categories
  const categoriesResult = await getCategories()
  const categoryPages: MetadataRoute.Sitemap = categoriesResult.docs.map((cat) => ({
    url: `${baseUrl}/kategori/${cat.slug}`,
    lastModified: new Date(cat.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Rubrics
  const rubricsResult = await getRubrics()
  const rubricPages: MetadataRoute.Sitemap = rubricsResult.docs.map((rub) => ({
    url: `${baseUrl}/rubrik/${rub.slug}`,
    lastModified: new Date(rub.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Authors
  const authorsResult = await getAuthors()
  const authorPages: MetadataRoute.Sitemap = authorsResult.docs.map((author) => ({
    url: `${baseUrl}/penulis/${author.slug}`,
    lastModified: new Date(author.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages, ...categoryPages, ...rubricPages, ...authorPages]
}
