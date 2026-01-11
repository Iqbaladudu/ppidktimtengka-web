import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getArticles, getAuthors, getSiteSettings } from '@/lib/payload'
import type { Media } from '@/payload-types'
import { ArticleGrid } from '@/components/articles'
import { Pagination } from '@/components/layout'
import { NewsLayout } from '@/components/layout/NewsLayout'
import { User, Mail, ExternalLink } from 'lucide-react'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Penulis Tidak Ditemukan' }
  }

  const siteSettings = await getSiteSettings()
  const siteName = siteSettings.siteName || 'PPIDK Timtengka'

  const roleLabels: Record<string, string> = {
    editor: 'Editor',
    journalist: 'Jurnalis',
    columnist: 'Kolumnis',
    contributor: 'Kontributor',
  }

  return {
    title: `${author.name} - ${roleLabels[author.role || 'contributor']} | ${siteName}`,
    description: `Profil dan artikel oleh ${author.name}`,
    openGraph: {
      title: author.name,
      description: `Profil dan artikel oleh ${author.name}`,
      images: (author.avatar as Media)?.url ? [{ url: (author.avatar as Media).url! }] : [],
    },
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.docs.map((auth) => ({
    slug: auth.slug,
  }))
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams

  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const page = Number(pageParam) || 1
  const articles = await getArticles({
    authorSlug: slug,
    page,
    limit: 12,
  })

  const avatar = author.avatar as Media | undefined
  const siteSettings = await getSiteSettings()

  const roleLabels: Record<string, string> = {
    editor: 'Editor',
    journalist: 'Jurnalis',
    columnist: 'Kolumnis',
    contributor: 'Kontributor',
  }

  return (
    <NewsLayout siteName={siteSettings.siteName || 'PPIDK Timtengka'}>
      {/* Author Header */}
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-slate-50 to-slate-100/50">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-8 md:text-left">
            {/* Avatar */}
            <div className="relative mb-6 h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-xl md:mb-0">
              {avatar?.url ? (
                <Image
                  src={avatar.url}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-emerald-500 to-teal-600 text-5xl font-bold text-white">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {author.name}
              </h1>
              {author.role && (
                <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                  <User className="h-4 w-4" />
                  {roleLabels[author.role]}
                </p>
              )}
              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  <Mail className="h-4 w-4" />
                  {author.email}
                </a>
              )}
              {author.bio && typeof author.bio === 'string' && (
                <p className="mt-4 text-slate-600">{author.bio}</p>
              )}

              {/* Social Links */}
              {author.socialLinks && author.socialLinks.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {author.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 md:justify-start">
            <span className="font-semibold text-slate-900">{articles.totalDocs}</span>
            <span>artikel diterbitkan</span>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">Artikel oleh {author.name}</h2>

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
