'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Rocket,
  BookOpen,
  Users,
  Globe2,
  Building2,
  Calendar,
  Award,
} from 'lucide-react'
import { useSite } from '../../context/SiteContext'

interface StatItem {
  id: string
  label: string
  value: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const Hero = React.memo(function Hero() {
  const { siteName, siteNameFull, tagline, period, stats } = useSite()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const floatingStats: StatItem[] = [
    { id: 'members', label: 'Mahasiswa', value: stats.members, Icon: Users },
    { id: 'countries', label: 'Negara', value: stats.countries, Icon: Globe2 },
    { id: 'directorates', label: 'Direktorat', value: stats.directorates, Icon: Building2 },
    { id: 'years', label: 'Tahun Sejarah', value: stats.yearsHistory, Icon: Calendar },
    { id: 'programs', label: 'Program Aktif', value: stats.programs, Icon: Award },
  ]

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/20 pt-24 pb-12 lg:pt-0 lg:pb-0"
      aria-labelledby="hero-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient orbs - Optimized for performance */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[60px] lg:blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[60px] lg:blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] bg-amber-400/5 dark:bg-amber-400/10 rounded-full blur-[60px] lg:blur-[100px]" />

        {/* Grid pattern with animation */}
        <div 
          className="absolute inset-0 bg-[url('/grid.svg')] animate-professional-grid pointer-events-none" 
          style={{
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full z-10 pb-32 lg:pb-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left column: Content (60%) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 dark:border-blue-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold text-blue-800 dark:text-blue-300 shadow-sm w-fit transition-all hover:bg-white/80 dark:hover:bg-slate-900/80">
              <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 lg:h-2.5 lg:w-2.5 bg-blue-500"></span>
              </span>
              <span className="truncate max-w-[200px] sm:max-w-none">Sinergi Pelajar Indonesia Timur Tengah & Afrika</span>
            </div>

            {/* Organization name */}
            <div className="space-y-2 lg:space-y-4">
              <p className="text-sm lg:text-lg font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                {siteNameFull}
              </p>
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              >
                {siteName}
              </h1>
              <p className="text-base lg:text-xl text-slate-600 dark:text-slate-300">
                Periode{' '}
                <span className="font-bold text-slate-900 dark:text-white border-b-2 border-blue-500/30">
                  {period}
                </span>
              </p>
            </div>

            {/* Tagline */}
            <div className="relative pl-4 lg:pl-6 py-2 border-l-4 border-gradient-to-b from-blue-500 to-cyan-500 rounded-sm">
              <p className="text-lg lg:text-2xl font-serif font-medium text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "{tagline}"
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 pt-2 lg:pt-4">
              <Link
                href="#gabung"
                className="group relative inline-flex h-12 lg:h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 lg:px-8 text-sm lg:text-base font-bold text-white shadow-lg shadow-blue-600/25 overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Rocket className="h-4 w-4 lg:h-5 lg:w-5 relative z-10" />
                <span className="relative z-10">Bergabung Sekarang</span>
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1 relative z-10" />
              </Link>

              <Link
                href="#about"
                className="group inline-flex h-12 lg:h-14 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-6 lg:px-8 text-sm lg:text-base font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <BookOpen className="h-4 w-4 lg:h-5 lg:w-5" />
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          {/* Right column: Visual (40%) */}
          <div
            className={`lg:col-span-5 relative mt-8 lg:mt-0 transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Main visual card */}
            <div className="relative mx-auto max-w-sm lg:max-w-none perspective-1000">
              <figure
                className="relative aspect-square overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 shadow-2xl shadow-blue-900/30 dark:shadow-blue-500/10 group hover:rotate-1 transition-transform duration-500"
                role="img"
                aria-label="Ilustrasi komunitas mahasiswa global"
              >
                {/* Decorative patterns */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:60px_60px] opacity-50" />

                {/* Globe illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Animated rings */}
                    <div className="absolute w-[80%] h-[80%] border-2 border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute w-[60%] h-[60%] border-2 border-white/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                    <div className="relative animate-float transform-gpu">
                      <Globe2
                        className="h-32 w-32 lg:h-48 lg:w-48 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                        strokeWidth={0.5}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <p className="text-4xl lg:text-6xl font-extrabold tracking-tighter drop-shadow-md">
                            {stats.countries}
                          </p>
                          <p className="text-sm lg:text-lg font-bold opacity-90 uppercase tracking-widest text-blue-100">
                            Negara
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 lg:px-5 lg:py-3 text-white shadow-lg transform transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
                  <p className="text-xs lg:text-sm font-bold flex items-center gap-2">
                    <span className="text-amber-300">★</span> Sejak 1967
                  </p>
                </div>

                <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 lg:px-5 lg:py-3 text-white shadow-lg transform transition-transform group-hover:-translate-x-2 group-hover:translate-y-2">
                  <p className="text-xs lg:text-sm font-bold flex items-center gap-2">
                    <Globe2 className="h-3 w-3 lg:h-4 lg:w-4 text-cyan-300" /> Cairo - Cape Town
                  </p>
                </div>
              </figure>

              {/* Back glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[3rem] blur-2xl -z-10 opacity-30 animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Statistics Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between items-center gap-x-4 gap-y-6 md:gap-x-8">
              {floatingStats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className={`flex items-center gap-2 lg:gap-3 transition-all duration-700 delay-[${idx * 100}ms] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex h-8 w-8 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 ring-1 ring-blue-100 dark:ring-blue-700/50">
                    <stat.Icon className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-lg lg:text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[10px] lg:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-0.5 lg:mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
