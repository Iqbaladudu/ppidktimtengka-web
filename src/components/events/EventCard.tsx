'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Event, Media } from '@/payload-types'
import { Calendar, Clock, MapPin, ExternalLink, FileText } from 'lucide-react'

const EVENT_TYPE_LABELS: Record<string, string> = {
  webinar: 'Webinar',
  talkshow: 'Talk Show',
  seminar: 'Seminar',
  workshop: 'Workshop',
  conference: 'Konferensi',
  other: 'Acara',
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  webinar: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  talkshow: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  seminar: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  workshop: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  conference: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  other: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300',
}

interface EventCardProps {
  event: Event
  variant?: 'vertical' | 'featured'
  className?: string
  priority?: boolean
}

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
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

function isUpcoming(dateStr: string) {
  return new Date(dateStr) >= new Date()
}

export function EventCard({ event, variant = 'vertical', className, priority = false }: EventCardProps) {
  const featuredImage = event.featuredImage as Media | undefined
  const upcoming = isUpcoming(event.eventDate)
  const typeLabel = EVENT_TYPE_LABELS[event.eventType] || 'Acara'
  const typeColor = EVENT_TYPE_COLORS[event.eventType] || EVENT_TYPE_COLORS.other
  const docCount = event.documents?.length || 0

  if (variant === 'featured') {
    return (
      <article
        className={cn(
          'group relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl border border-white/5',
          className,
        )}
      >
        <Link
          href={`/events/${event.slug}`}
          className="relative block aspect-4/5 md:aspect-video w-full overflow-hidden"
        >
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-800">
              <Calendar className="h-16 w-16 text-slate-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </Link>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white z-10">
          <div className="mb-3 md:mb-4 flex flex-wrap items-center gap-2">
            <span className={cn('px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full shadow-lg backdrop-blur-md', typeColor)}>
              {typeLabel}
            </span>
            {upcoming && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-emerald-500/90 text-white shadow-lg backdrop-blur-md">
                Akan Datang
              </span>
            )}
          </div>

          <Link href={`/events/${event.slug}`}>
            <h2 className="mb-3 md:mb-4 line-clamp-2 text-xl sm:text-2xl md:text-4xl font-extrabold leading-tight tracking-tight text-white transition-colors group-hover:text-primary-foreground/90">
              {event.title}
            </h2>
          </Link>

          {event.excerpt && (
            <p className="mb-4 md:mb-6 line-clamp-2 text-sm md:text-lg text-white/80 max-w-3xl">
              {event.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-white/70 font-medium">
            <time dateTime={event.eventDate} className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatEventDate(event.eventDate)}
            </time>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {formatEventTime(event.eventDate)}
            </span>
          </div>
        </div>
      </article>
    )
  }

  // Standard Vertical Card
  return (
    <article
      className={cn(
        'group flex flex-col h-full overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5 border border-border/50 hover:border-primary/20',
        className,
      )}
    >
      <Link
        href={`/events/${event.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted"
      >
        {featuredImage?.url ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-muted">
            <Calendar className="h-10 w-10" />
          </div>
        )}

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
          <span className={cn('px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full shadow-lg backdrop-blur-md border border-border/50', typeColor)}>
            {typeLabel}
          </span>
          {upcoming && (
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-emerald-500/90 text-white shadow-lg backdrop-blur-md">
              Akan Datang
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 pt-5 px-3 pb-3">
        <Link href={`/events/${event.slug}`} className="mb-2">
          <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {event.title}
          </h3>
        </Link>

        {event.excerpt && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {event.excerpt}
          </p>
        )}

        {/* Date & Time */}
        <div className="mb-4 space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <span>{formatEventDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <span>
              {formatEventTime(event.eventDate)}
              {event.eventEndDate && ` – ${formatEventTime(event.eventEndDate)}`}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-3">
            {event.registrationLink && (
              <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                <ExternalLink className="h-3 w-3" />
                Daftar
              </span>
            )}
            {docCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <FileText className="h-3 w-3" />
                {docCount} dokumen
              </span>
            )}
          </div>

          {!upcoming && (
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Selesai
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
