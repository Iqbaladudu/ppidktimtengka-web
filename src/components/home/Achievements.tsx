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
      {/* Dynamic Background - Solidified */}
      <div className="absolute inset-0 bg-background" />
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
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight"
          >
            Dampak Nyata{' '}
            <span className="text-primary dark:text-primary-foreground">Berkelanjutan</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
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
              <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-1 tracking-tight">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={countersVisible}
                />
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider group-hover:text-primary transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
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
