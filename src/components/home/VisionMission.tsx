'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Target, Compass, Users, Globe, Heart, ChevronRight, Sparkles } from 'lucide-react'

interface MissionCard {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export const VisionMission: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const missions: MissionCard[] = [
    {
      id: 'sinergi',
      icon: <Users className="h-8 w-8" />,
      title: 'SINERGI',
      description: 'Kanalisasi aspirasi PPI Negara untuk membangun kekuatan bersama',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'eksplorasi',
      icon: <Compass className="h-8 w-8" />,
      title: 'EKSPLORASI',
      description: 'Wadah eksplorasi partisipatif untuk pengembangan potensi',
      color: 'from-cyan-500 to-teal-600',
    },
    {
      id: 'kaderisasi',
      icon: <Target className="h-8 w-8" />,
      title: 'KADERISASI',
      description: 'Pengkaderan progresif dan adaptif untuk generasi masa depan',
      color: 'from-emerald-500 to-green-600',
    },
    {
      id: 'diplomasi',
      icon: <Globe className="h-8 w-8" />,
      title: 'DIPLOMASI',
      description: 'Memperluas jejaring strategis nasional dan internasional',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'berdampak',
      icon: <Heart className="h-8 w-8" />,
      title: 'BERDAMPAK',
      description: 'Aksi Peduli Sekitar untuk masyarakat yang membutuhkan',
      color: 'from-rose-500 to-pink-600',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="visi-misi"
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-900"
      aria-labelledby="vision-heading"
    >
      {/* Background with solid color */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Vision Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-semibold text-blue-200 mb-8 hover:bg-white/20 transition-colors cursor-default">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="tracking-wide uppercase">Visi Besar Kami</span>
          </div>

          <h2
            id="vision-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-5xl mx-auto drop-shadow-lg"
          >
            "Katalisator kegiatan pelajar dan mahasiswa Timur Tengah dan Afrika yang{' '}
            <span className="relative inline-block text-primary">
              transformatif
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500/30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
            , <span className="relative inline-block text-secondary">produktif</span>, dan{' '}
            <span className="relative inline-block text-primary">inovatif</span>"
          </h2>
        </div>

        {/* Mission Section */}
        <div
          className={`transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 text-white/60 mb-8 lg:mb-10">
            <div className="h-px w-12 bg-white/30" />
            <span className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              Misi Kami
            </span>
            <div className="h-px w-12 bg-white/30" />
          </div>

          {/* Mission Cards - Horizontal Scroll */}
          <div className="relative group/container">
            <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 lg:pb-8 w-full snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible">
              {missions.map((mission, idx) => (
                <div
                  key={mission.id}
                  className="flex-shrink-0 w-[260px] sm:w-[300px] lg:w-auto snap-center"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="group h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl lg:rounded-3xl p-5 lg:p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">
                    {/* Icon Container */}
                    <div className="relative mb-4 lg:mb-6">
                      <div
                        className={`relative inline-flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-xl lg:rounded-2xl bg-secondary text-secondary-foreground shadow-lg ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        {mission.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-base lg:text-lg font-bold text-white mb-2 lg:mb-3 tracking-wide flex items-center gap-2">
                      {mission.title}
                    </h3>

                    <p className="text-xs lg:text-sm text-slate-300 leading-relaxed mb-4 lg:mb-6 group-hover:text-white transition-colors">
                      {mission.description}
                    </p>

                    {/* Action */}
                    <div className="flex items-center gap-2 text-[10px] lg:text-xs font-bold text-cyan-300 uppercase tracking-wider opacity-60 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                      Selengkapnya
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicators for mobile */}
            <div className="absolute -bottom-4 lg:bottom-0 left-0 right-0 flex justify-center gap-2 lg:hidden">
              <div className="text-[10px] text-slate-500 animate-pulse">Geser untuk melihat →</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

VisionMission.displayName = 'VisionMission'
