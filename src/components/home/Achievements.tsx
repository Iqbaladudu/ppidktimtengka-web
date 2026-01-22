'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useSite } from '../../context/SiteContext'
import {
  Award,
  Globe,
  Users,
  Calendar,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Quote,
  Trophy,
  Star,
} from 'lucide-react'

interface CounterStat {
  id: string
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  delay: string
}

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'PPIDK TIMTENGKA membantu saya menemukan komunitas yang supportif dan membuka banyak peluang karir global. Networking di sini luar biasa!',
    name: 'Ahmad Fauzi',
    role: 'Alumni PPMI Mesir 2020',
    company: 'Senior Consultant @ McKinsey Middle East',
  },
  {
    id: 2,
    quote:
      'Program kaderisasi yang dijalankan sangat komprehensif. Leadership skill saya terasah tajam lewat organisasi ini, bekal berharga untuk karir diplomat.',
    name: 'Siti Aisyah',
    role: 'Alumni PPI Yaman 2019',
    company: 'Diplomat Muda @ Kemenlu RI',
  },
  {
    id: 3,
    quote:
      'Jaringan alumni yang kuat sangat membantu ekspansi bisnis saya. Ekosistem TIMTENGKA adalah tempat terbaik untuk bertumbuh.',
    name: 'Muhammad Rizki',
    role: 'Alumni PPMI Arab Saudi 2018',
    company: 'Founder & CEO @ TechStartup',
  },
]

export const Achievements: React.FC = React.memo(() => {
  const { stats } = useSite()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [countersVisible, setCountersVisible] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const counterStats: CounterStat[] = [
    {
      id: 'programs',
      icon: <Briefcase className="h-7 w-7" />,
      value: 120,
      suffix: '+',
      label: 'Program Kerja',
      delay: '0ms',
    },
    {
      id: 'years',
      icon: <Calendar className="h-7 w-7" />,
      value: 58,
      suffix: ' Th',
      label: 'Pengalaman',
      delay: '100ms',
    },
    {
      id: 'members',
      icon: <Users className="h-7 w-7" />,
      value: 28103,
      suffix: '',
      label: 'Mahasiswa',
      delay: '200ms',
    },
    {
      id: 'countries',
      icon: <Globe className="h-7 w-7" />,
      value: 19,
      suffix: ' Negara',
      label: 'Jangkauan',
      delay: '300ms',
    },
    {
      id: 'awards',
      icon: <Trophy className="h-7 w-7" />,
      value: 45,
      suffix: '+',
      label: 'Penghargaan',
      delay: '400ms',
    },
    {
      id: 'events',
      icon: <Star className="h-7 w-7" />,
      value: 500,
      suffix: '+',
      label: 'Kegiatan/Tahun',
      delay: '500ms',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-play testimonials
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 6000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section
      ref={sectionRef}
      id="prestasi"
      className="relative py-24 lg:py-32 bg-slate-900 overflow-hidden"
      aria-labelledby="achievements-heading"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black opacity-80" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* Animated Orbs */}
      <div
        className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] animate-pulse-glow"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDuration: '7s' }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-400 mb-6 backdrop-blur-sm">
            <Trophy className="h-4 w-4" />
            <span className="uppercase tracking-wide">Jejak Langkah</span>
          </div>
          <h2
            id="achievements-heading"
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Dampak Nyata{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Berkelanjutan
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Mewujudkan visi besar melalui aksi nyata, kolaborasi strategis, dan dedikasi ribuan
            mahasiswa Indonesia di Timur Tengah & Afrika.
          </p>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-24">
          {counterStats.map((stat) => (
            <div
              key={stat.id}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-500 ${
                countersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: stat.delay }}
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white mb-4 shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <p className="text-3xl lg:text-4xl font-extrabold text-white mb-1 tracking-tight">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={countersVisible}
                />
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-blue-300 transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Decorative quotes */}
          <div className="absolute -top-12 -left-12 text-9xl text-white/5 font-serif select-none">
            “
          </div>
          <div className="absolute -bottom-12 -right-12 text-9xl text-white/5 font-serif select-none rotate-180">
            “
          </div>

          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar */}
              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full" />
                <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 p-1 ring-2 ring-white/10">
                  <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <span className="text-4xl font-bold text-blue-500">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full border-4 border-slate-900">
                  <Quote className="h-4 w-4 fill-current" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="min-h-[120px] mb-6 flex items-center justify-center md:justify-start">
                  <p
                    key={currentTestimonial}
                    className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed italic animate-in fade-in slide-in-from-right-4 duration-500"
                  >
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm font-medium text-blue-400 mb-0.5">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-16 z-10 hidden md:block">
              <button
                onClick={prevTestimonial}
                className="h-12 w-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:-translate-x-1"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-16 z-10 hidden md:block">
              <button
                onClick={nextTestimonial}
                className="h-12 w-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:translate-x-1"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8 md:mt-0 md:absolute md:top-8 md:right-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === currentTestimonial ? 'w-8 bg-blue-500' : 'w-2 bg-slate-600'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number
  suffix: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const duration = 2000 // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      // Easing function: easeOutQuart
      const ease = 1 - Math.pow(1 - percentage, 4)

      setCount(Math.floor(ease * target))

      if (percentage < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target])

  return (
    <span>
      {count.toLocaleString('id-ID')}
      <span className="text-blue-400">{suffix}</span>
    </span>
  )
}

Achievements.displayName = 'Achievements'
