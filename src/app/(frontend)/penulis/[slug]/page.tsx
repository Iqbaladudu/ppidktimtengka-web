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
  try {
    const authors = await getAuthors()
    return authors.docs.map((auth) => ({
      slug: auth.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for authors:', error)
    return []
  }
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
      <div className="border-b border-border bg-gradient-to-br from-background via-muted/50 to-muted">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-8 md:text-left">
            {/* Avatar */}
            <div className="relative mb-6 h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-background shadow-xl md:mb-0">
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
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-5xl font-bold text-primary">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {author.name}
              </h1>
              {author.role && (
                <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  <User className="h-4 w-4" />
                  {roleLabels[author.role]}
                </p>
              )}
              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {author.email}
                </a>
              )}
              {author.bio && typeof author.bio === 'string' && (
                <p className="mt-4 text-muted-foreground">{author.bio}</p>
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
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-accent hover:text-primary"
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
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
            <span className="font-semibold text-foreground">{articles.totalDocs}</span>
            <span>artikel diterbitkan</span>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Artikel oleh {author.name}</h2>

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
