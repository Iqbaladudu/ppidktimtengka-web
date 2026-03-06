import React from 'react'
import type { Metadata } from 'next'
import { getEvents, getUpcomingEvents } from '@/lib/payload'
import { EventCard } from '@/components/events'
import { Pagination } from '@/components/layout'
import { Calendar, Flame } from 'lucide-react'

export const revalidate = 60

interface EventsPageProps {
  searchParams: Promise<{ page?: string; type?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Acara & Kegiatan | PPIDK Timtengka',
    description:
      'Webinar, talk show, seminar, dan kegiatan lainnya dari PPIDK Timtengka',
  }
}

const EVENT_TYPES = [
  { label: 'Semua', value: '' },
  { label: 'Webinar', value: 'webinar' },
  { label: 'Talk Show', value: 'talkshow' },
  { label: 'Seminar', value: 'seminar' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Konferensi', value: 'conference' },
]

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { page: pageParam, type } = await searchParams
  const page = Number(pageParam) || 1
  const isFirstPage = page === 1 && !type

  const [eventsResult, upcomingResult] = await Promise.all([
    getEvents({
      page,
      limit: 12,
      eventType: type || undefined,
    }),
    isFirstPage ? getUpcomingEvents(3) : Promise.resolve({ docs: [] }),
  ])

  const upcomingEvents = upcomingResult.docs
  const featuredEvent = isFirstPage ? upcomingEvents[0] : undefined

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-primary/80 dark:border-primary/60 bg-primary dark:bg-primary/90 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="flex items-center gap-2 text-primary-foreground/80 dark:text-primary-foreground/70">
            <Flame className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Acara & Kegiatan</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl text-primary-foreground">
            {type ? `${EVENT_TYPES.find((t) => t.value === type)?.label || 'Acara'}` : 'Acara & Kegiatan'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 dark:text-primary-foreground/70 md:text-xl">
            Webinar, talk show, seminar, dan berbagai kegiatan untuk pengembangan diri dan jaringan
            mahasiswa Indonesia di Timur Tengah & Afrika.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Event Type Filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {EVENT_TYPES.map((eventType) => {
            const isActive = (type || '') === eventType.value
            return (
              <a
                key={eventType.value}
                href={eventType.value ? `/events?type=${eventType.value}` : '/events'}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {eventType.label}
              </a>
            )
          })}
        </div>

        {/* Featured Upcoming Event */}
        {featuredEvent && (
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Acara Mendatang
            </h2>
            <EventCard event={featuredEvent} variant="featured" priority />
          </div>
        )}

        {/* Events Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              {isFirstPage ? 'Semua Acara' : 'Acara'}
            </h2>
            <span className="text-sm text-muted-foreground">
              {eventsResult.totalDocs} acara
            </span>
          </div>

          {eventsResult.docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {eventsResult.docs.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Belum ada acara
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Acara baru akan segera ditambahkan. Nantikan informasi selanjutnya!
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {eventsResult.totalPages > 1 && (
          <Pagination
            currentPage={eventsResult.page || 1}
            totalPages={eventsResult.totalPages}
            className="mt-12"
          />
        )}
      </div>
    </div>
  )
}
