'use client'

import React, { useState, useEffect } from 'react'
import type { Program } from '@/payload-types'
import {
  ArrowRight,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Filter,
  Users,
  Clock,
  ExternalLink,
  X,
} from 'lucide-react'

interface FeaturedProgramsProps {
  programs: Program[]
  featuredPrograms: Program[]
}

export const FeaturedPrograms: React.FC<FeaturedProgramsProps> = React.memo(
  ({ programs, featuredPrograms }) => {
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

    const filteredPrograms =
      activeCategory === 'Semua' ? programs : programs.filter((p) => p.category === activeCategory)

    // Derive unique categories from the data
    const categories = ['Semua', ...Array.from(new Set(programs.map((p) => p.category)))]

    // Auto-play carousel
    useEffect(() => {
      if (featuredPrograms.length === 0) return
      let interval: NodeJS.Timeout
      if (isAutoPlaying) {
        interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % featuredPrograms.length)
        }, 5000)
      }
      return () => clearInterval(interval)
    }, [isAutoPlaying, featuredPrograms.length])

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % featuredPrograms.length)
      setIsAutoPlaying(false)
    }

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + featuredPrograms.length) % featuredPrograms.length)
      setIsAutoPlaying(false)
    }

    if (programs.length === 0) {
      return (
        <section
          id="programs"
          className="py-16 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Belum ada program yang tersedia saat ini.
            </p>
          </div>
        </section>
      )
    }

    return (
      <section
        id="programs"
        className="py-16 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
        aria-labelledby="programs-heading"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 lg:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 lg:px-4 lg:py-1.5 text-xs lg:text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-3 lg:mb-4 animate-pulse">
                <Sparkles className="h-3 w-3 lg:h-4 lg:w-4" />
                Program Unggulan
              </div>
              <h2
                id="programs-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white"
              >
                Kegiatan <span className="text-primary">Seru</span> Kami
              </h2>
              <p className="mt-2 lg:mt-3 text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                Berbagai program inovatif yang dirancang untuk pengembangan diri, karir, dan
                kolaborasi antar mahasiswa.
              </p>
            </div>
            <a
              href="#all-programs"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-5 py-2.5 lg:px-6 lg:py-3 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:bg-slate-800 dark:hover:bg-slate-200 hover:gap-3"
            >
              Lihat Semua Program
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Featured Carousel */}
          {featuredPrograms.length > 0 && (
            <div
              className="group relative mb-12 lg:mb-16 rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-xl lg:shadow-2xl shadow-blue-900/20 dark:shadow-blue-900/40 transition-transform duration-500 hover:scale-[1.01]"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Background Image/Gradient */}
              <div
                className={`absolute inset-0 bg-primary transition-colors duration-700 ease-in-out`}
              />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-professional-grid" />

              {/* Content Container */}
              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center p-6 lg:p-16 min-h-[400px] lg:min-h-[500px]">
                {/* Text Content */}
                <div className="text-white z-10 animate-in slide-in-from-left-8 fade-in duration-500 key={currentSlide}">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 lg:px-4 lg:py-1.5 text-xs lg:text-sm font-bold mb-4 lg:mb-6 border border-white/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Coming Soon
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight tracking-tight">
                    {featuredPrograms[currentSlide].title}
                  </h3>

                  <p className="text-base lg:text-xl text-white/90 mb-6 lg:mb-8 leading-relaxed max-w-lg">
                    {featuredPrograms[currentSlide].description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-8 lg:mb-10">
                    <div className="flex items-center gap-2 text-xs lg:text-sm font-medium bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>{featuredPrograms[currentSlide].schedule}</span>
                    </div>
                    {featuredPrograms[currentSlide].attendees && (
                      <div className="flex items-center gap-2 text-xs lg:text-sm font-medium bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{featuredPrograms[currentSlide].attendees} Peserta</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 lg:gap-4">
                    <a
                      href="#daftar"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 lg:px-8 lg:py-4 text-sm lg:text-base font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-lg shadow-black/20"
                    >
                      Daftar Sekarang
                      <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
                    </a>
                    <a
                      href="#info"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 px-6 py-3 lg:px-8 lg:py-4 text-sm lg:text-base font-bold text-white hover:bg-white/20 transition-colors"
                    >
                      Info Lengkap
                    </a>
                  </div>
                </div>

                {/* Visual/Emoji - Hidden on mobile to save vertical space and focus on content */}
                <div
                  className="hidden lg:flex items-center justify-center relative animate-in slide-in-from-right-8 fade-in duration-700 delay-100"
                  key={`visual-${currentSlide}`}
                >
                  {/* Decorative circles */}
                  <div className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
                  <div className="relative text-[8rem] lg:text-[12rem] filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-500 cursor-default animate-float">
                    {featuredPrograms[currentSlide].emoji}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons - Smaller on mobile */}
              <button
                onClick={prevSlide}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-4 lg:group-hover:translate-x-0"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-4 lg:group-hover:translate-x-0"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>

              {/* Carousel Dots */}
              <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:gap-3 z-20">
                {featuredPrograms.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 lg:h-2 rounded-full transition-all duration-500 ${
                      i === currentSlide
                        ? 'w-6 lg:w-10 bg-white'
                        : 'w-1.5 lg:w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto pb-4 lg:pb-0 mb-6 lg:mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-4 mr-1 shrink-0">
              <Filter className="h-3 w-3 lg:h-4 lg:w-4" />
              Filter:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 lg:px-5 lg:py-2.5 rounded-full text-xs lg:text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Header */}
                <div className={`h-32 lg:h-40 relative bg-muted overflow-hidden`}>
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-professional-grid" />
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full blur-2xl" />

                  <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                    <span className="text-5xl lg:text-6xl filter drop-shadow-md">
                      {program.emoji}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3 lg:top-4 lg:left-4">
                    <span className="px-2.5 py-1 lg:px-3 lg:py-1 rounded-lg bg-white/20 backdrop-blur-sm text-[10px] lg:text-xs font-bold text-white border border-white/20 shadow-sm">
                      {program.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] lg:text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 lg:mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                      <span>{program.schedule}</span>
                    </div>
                    {program.attendees && (
                      <>
                        <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                          <span>{program.attendees}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white mb-2 lg:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {program.title}
                  </h3>

                  <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 lg:mb-6 flex-1">
                    {program.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="flex items-center gap-2 text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    >
                      Lihat Detail
                      <ExternalLink className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Detail Modal */}
        {selectedProgram && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
            onKeyDown={(e) => e.key === 'Escape' && setSelectedProgram(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" />

            {/* Modal Content */}
            <div
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 fade-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with emoji */}
              <div className="relative h-48 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl filter drop-shadow-xl">{selectedProgram.emoji}</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-white border border-white/20">
                    {selectedProgram.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 lg:p-8">
                <h3
                  id="modal-title"
                  className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                >
                  {selectedProgram.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <Calendar className="h-3.5 w-3.5" />
                    {selectedProgram.schedule}
                  </div>
                  {selectedProgram.attendees && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <Users className="h-3.5 w-3.5" />
                      {selectedProgram.attendees} Peserta
                    </div>
                  )}
                </div>

                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  },
)

FeaturedPrograms.displayName = 'FeaturedPrograms'
