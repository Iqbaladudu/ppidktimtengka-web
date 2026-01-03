'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Globe2, MapPin, BookOpen, Sparkles } from 'lucide-react'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface StatItem {
  id: string
  label: string
  value: string
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface HeroProps {
  title?: React.ReactNode
  subtitle?: string
  ctaPrimaryText?: string
  ctaPrimaryHref?: string
  ctaSecondaryText?: string
  ctaSecondaryHref?: string
  memberCount?: string
  avatarCount?: number
  stats?: StatItem[]
}

/**
 * Hero component - Professional and modern design
 * - Accessible: semantic elements, ARIA labels
 * - Responsive: mobile-first layout with careful breakpoints
 * - Refined aesthetics: subtle animations, sophisticated color palette
 * - Performance: optimized rendering with React.memo
 */
export const Hero = React.memo(function Hero({
  title = (
    <>
      Membangun <span className="text-emerald-600">Peradaban</span>, Merajut{' '}
      <span className="text-amber-500">Persaudaraan</span>
    </>
  ),
  subtitle = 'Wadah kolaborasi dan kreativitas mahasiswa Indonesia di kawasan Timur Tengah dan Afrika. Muda, dinamis, dan berwawasan global.',
  ctaPrimaryText = 'Jelajahi Program',
  ctaPrimaryHref = '#programs',
  ctaSecondaryText = 'Tentang Kami',
  ctaSecondaryHref = '#about',
  memberCount = '10,000+',
  avatarCount = 4,
  stats = [
    { id: 'reach', label: 'Jangkauan', value: '15+ Negara', Icon: MapPin },
    { id: 'scholar', label: 'Beasiswa', value: 'Info Terupdate', Icon: BookOpen },
  ],
}: HeroProps) {
  const reduceMotion = usePrefersReducedMotion()

  const avatars = useMemo(() => Array.from({ length: avatarCount }, (_, i) => i + 1), [avatarCount])

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20 md:pt-28 lg:pt-36 pb-20 md:pb-28"
      aria-labelledby="hero-heading"
    >
      {/* Sophisticated background with subtle depth */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Gradient orbs for depth */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left column: content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            {/* Badge with refined styling */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm w-fit">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              <span>Sinergi Pelajar Indonesia Timur Tengah & Afrika</span>
            </div>

            {/* Heading with better typography */}
            <div className="space-y-5">
              <h1
                id="hero-heading"
                className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.1] lg:leading-[1.1]"
              >
                {title}
              </h1>

              <p className="max-w-2xl text-lg text-slate-600 leading-relaxed md:text-xl">
                {subtitle}
              </p>
            </div>

            {/* CTAs with refined interaction */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={ctaPrimaryHref}
                aria-label={ctaPrimaryText}
                className="group inline-flex h-14 items-center justify-center rounded-xl bg-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 active:scale-[0.98]"
              >
                {ctaPrimaryText}
                <ArrowRight
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href={ctaSecondaryHref}
                aria-label={ctaSecondaryText}
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300 active:scale-[0.98]"
              >
                {ctaSecondaryText}
              </Link>
            </div>

            {/* Social proof with enhanced design */}
            <div className="flex items-center gap-5 pt-4">
              <div className="flex -space-x-3" role="group" aria-label="Avatar group">
                {avatars.map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-sm"
                    aria-hidden="true"
                  >
                    <Users className="h-5 w-5 text-white" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-900">{memberCount} Mahasiswa</p>
                <p className="text-xs text-slate-500">Telah bergabung</p>
              </div>
            </div>
          </div>

          {/* Right column: visual showcase */}
          <div className="lg:col-span-6 relative">
            {/* Main visual card */}
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <figure
                className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl shadow-slate-900/10 border border-slate-200/50"
                role="img"
                aria-label="Ilustrasi komunitas mahasiswa global"
              >
                {/* Decorative gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10"
                  aria-hidden="true"
                />

                {/* Globe illustration with modern treatment */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="relative">
                    <Globe2 className="h-32 w-32 text-emerald-600/20" strokeWidth={1} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                  </div>
                </div>

                {/* Placeholder text with better styling */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-400 font-medium text-sm tracking-wide">
                    Hero Visual
                  </span>
                </div>
              </figure>

              {/* Static stat cards with refined design - no animations */}
              <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.Icon || MapPin
                  return (
                    <div
                      key={stat.id}
                      className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">
                            {stat.label}
                          </p>
                          <p className="text-base font-bold text-slate-900 truncate">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
