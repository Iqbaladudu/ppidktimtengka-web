import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getEventBySlug, getEvents } from '@/lib/payload'
import type { Media, Document } from '@/payload-types'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import {
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  ArrowLeft,
  Download,
  ChevronLeft,
} from 'lucide-react'

export const revalidate = 60
export const dynamicParams = true

interface EventPageProps {
  params: Promise<{ slug: string }>
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  webinar: 'Webinar',
  talkshow: 'Talk Show',
  seminar: 'Seminar',
  workshop: 'Workshop',
  conference: 'Konferensi',
  other: 'Acara',
}

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatEventTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return { title: 'Acara Tidak Ditemukan' }
  }

  const title = event.seo?.metaTitle || event.title
  const description = event.seo?.metaDescription || event.excerpt || `Detail acara ${event.title}`
  const ogImage = (event.seo?.ogImage as Media)?.url || (event.featuredImage as Media)?.url

  return {
    title: `${title} | PPIDK Timtengka`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const events = await getEvents({ limit: 100 })
    return events.docs.map((event) => ({ slug: event.slug }))
  } catch (error) {
    console.error('Error generating static params for events:', error)
    return []
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const featuredImage = event.featuredImage as Media | undefined
  const isUpcoming = new Date(event.eventDate) >= new Date()
  const typeLabel = EVENT_TYPE_LABELS[event.eventType] || 'Acara'
  const gallery = event.gallery || []
  const documents = event.documents || []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.excerpt || '',
    startDate: event.eventDate,
    endDate: event.eventEndDate || undefined,
    image: featuredImage?.url,
    eventStatus: isUpcoming
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventMovedOnline',
    organizer: {
      '@type': 'Organization',
      name: 'PPIDK Timtengka',
    },
  }

  return (
    <div className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      {featuredImage?.url && (
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-900">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || event.title}
            fill
            className="object-cover opacity-80"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        {/* Back Link */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali ke Daftar Acara
        </Link>

        {/* Event Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {typeLabel}
            </span>
            {isUpcoming && (
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                Akan Datang
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {event.title}
          </h1>

          {event.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{event.excerpt}</p>
          )}
        </header>

        {/* Event Info Card */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Tanggal</p>
                <p className="text-sm text-muted-foreground">{formatEventDate(event.eventDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Waktu</p>
                <p className="text-sm text-muted-foreground">
                  {formatEventTime(event.eventDate)}
                  {event.eventEndDate && ` – ${formatEventTime(event.eventEndDate)}`}
                </p>
              </div>
            </div>
          </div>

          {/* Registration Button */}
          {event.registrationLink && isUpcoming && (
            <div className="mt-6 border-t border-border pt-6">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl"
              >
                <ExternalLink className="h-4 w-4" />
                Daftar Sekarang
              </a>
            </div>
          )}
        </div>

        {/* Description / Content */}
        <div className="mb-10 rounded-2xl bg-white px-5 py-6 shadow-sm dark:bg-card md:px-12 md:py-12">
          <div className="prose max-w-none dark:prose-invert md:prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-7 md:prose-p:leading-8 prose-p:text-slate-700 dark:prose-p:text-slate-300">
            <PayloadRichText data={event.description} />
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 text-xl font-bold text-foreground">Galeri</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item, index) => {
                const img = item.image as Media
                return (
                  <div
                    key={item.id || index}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted"
                  >
                    {img?.url && (
                      <Image
                        src={img.url}
                        alt={item.caption || img.alt || `Gambar ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    {item.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-sm text-white">{item.caption}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Documents */}
        {documents.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 text-xl font-bold text-foreground">Dokumen</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {documents.map((item, index) => {
                const doc = item.document as Document
                return (
                  <a
                    key={item.id || index}
                    href={doc?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.label || doc?.title || `Dokumen ${index + 1}`}
                      </p>
                      <p className="text-xs text-muted-foreground">PDF</p>
                    </div>
                    <Download className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                )
              })}
            </div>
          </section>
        )}

        {/* Back to Events */}
        <div className="border-t border-border pt-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Lihat Semua Acara
          </Link>
        </div>
      </div>
    </div>
  )
}
