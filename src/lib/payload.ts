import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import type { Article, Author, Category, Rubric, Tag } from '@/payload-types'

// Singleton pattern for Payload instance
let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: await config })
  }
  return payloadInstance
}

// ============================================
// Article Queries
// ============================================

export interface GetArticlesOptions {
  page?: number
  limit?: number
  categorySlug?: string
  rubricSlug?: string
  authorSlug?: string
  tagSlug?: string
  featured?: boolean
  headline?: boolean
  excludeId?: number
  sort?: '-publishedAt' | '-viewCount' | '-createdAt'
}

export async function getArticles(options: GetArticlesOptions = {}) {
  const payload = await getPayloadClient()
  const { page = 1, limit = 10, sort = '-publishedAt', ...filters } = options

  // Build where conditions array
  const conditions: Where[] = [{ status: { equals: 'published' } }]

  if (filters.categorySlug) {
    conditions.push({ 'categories.slug': { equals: filters.categorySlug } })
  }

  if (filters.rubricSlug) {
    conditions.push({ 'rubric.slug': { equals: filters.rubricSlug } })
  }

  if (filters.authorSlug) {
    conditions.push({ 'author.slug': { equals: filters.authorSlug } })
  }

  if (filters.tagSlug) {
    conditions.push({ 'tags.slug': { equals: filters.tagSlug } })
  }

  if (filters.featured) {
    conditions.push({ isFeatured: { equals: true } })
  }

  if (filters.headline) {
    conditions.push({ isHeadline: { equals: true } })
  }

  if (filters.excludeId) {
    conditions.push({ id: { not_equals: filters.excludeId } })
  }

  return payload.find({
    collection: 'articles',
    page,
    limit,
    sort,
    where: { and: conditions },
    depth: 2,
  })
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] as Article | undefined
}

export async function getRelatedArticles(articleId: number, categoryIds: number[], limit = 4) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { status: { equals: 'published' } },
        { id: { not_equals: articleId } },
        {
          or: categoryIds.map((id) => ({
            'categories.id': { equals: id },
          })),
        },
      ],
    },
    limit,
    sort: '-publishedAt',
    depth: 1,
  })

  return result.docs
}

export async function incrementViewCount(id: number) {
  const payload = await getPayloadClient()

  const article = await payload.findByID({
    collection: 'articles',
    id,
  })

  await payload.update({
    collection: 'articles',
    id,
    data: {
      viewCount: (article.viewCount || 0) + 1,
    },
  })
}

// ============================================
// Category Queries
// ============================================

export async function getCategories() {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'categories',
    where: {
      isActive: { equals: true },
    },
    sort: 'order',
    limit: 100,
    depth: 1,
  })
}

export async function getCategoryBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: slug },
      isActive: { equals: true },
    },
    limit: 1,
  })

  return result.docs[0] as Category | undefined
}

// ============================================
// Rubric Queries
// ============================================

export async function getRubrics() {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'rubrics',
    where: {
      isActive: { equals: true },
    },
    limit: 100,
  })
}

export async function getRubricBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'rubrics',
    where: {
      slug: { equals: slug },
      isActive: { equals: true },
    },
    limit: 1,
  })

  return result.docs[0] as Rubric | undefined
}

// ============================================
// Author Queries
// ============================================

export async function getAuthors() {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'authors',
    where: {
      isActive: { equals: true },
    },
    limit: 100,
    depth: 1,
  })
}

export async function getAuthorBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'authors',
    where: {
      slug: { equals: slug },
      isActive: { equals: true },
    },
    limit: 1,
    depth: 1,
  })

  return result.docs[0] as Author | undefined
}

// ============================================
// Tag Queries
// ============================================

export async function getTags() {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'tags',
    limit: 100,
  })
}

export async function getTagBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'tags',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  return result.docs[0] as Tag | undefined
}

// ============================================
// Search
// ============================================

export async function searchArticles(query: string, page = 1, limit = 10) {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'articles',
    where: {
      and: [
        { status: { equals: 'published' } },
        {
          or: [{ title: { contains: query } }, { excerpt: { contains: query } }],
        },
      ],
    },
    page,
    limit,
    sort: '-publishedAt',
    depth: 1,
  })
}

// ============================================
// Global Settings
// ============================================

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function getNavigation() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation', depth: 2 })
}
