'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useSite } from '../../context/SiteContext'
import { BookOpen, Award, Users, GraduationCap, ArrowRight, TrendingUp } from 'lucide-react'

interface DashboardCard {
  id: string
  icon: React.ReactNode
  label: string
  value: string
  description: string
  href: string
  gradient: string
  iconBg: string
  hoverGlow: string
  delay: string
}

export const Stats: React.FC = React.memo(() => {
  const { stats } = useSite()
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

  const cards: DashboardCard[] = [
    {
      id: 'programs',
      icon: <BookOpen className="h-7 w-7" />,
      label: 'PROGRAM',
      value: stats.programs,
      description: 'Program Kerja Aktif',
      href: '#programs',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
      hoverGlow: 'hover:shadow-blue-500/25 dark:hover:shadow-blue-900/40',
      delay: '0ms',
    },
    {
      id: 'scholarship',
      icon: <GraduationCap className="h-7 w-7" />,
      label: 'BEASISWA',
      value: stats.scholarshipValue,
      description: 'Tersalur ke Mahasiswa',
      href: '#beasiswa',
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      hoverGlow: 'hover:shadow-emerald-500/25 dark:hover:shadow-emerald-900/40',
      delay: '100ms',
    },
    {
      id: 'awards',
      icon: <Award className="h-7 w-7" />,
      label: 'PRESTASI',
      value: stats.awardsWon,
      description: 'Penghargaan Diraih',
      href: '#prestasi',
      gradient: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
      hoverGlow: 'hover:shadow-amber-500/25 dark:hover:shadow-amber-900/40',
      delay: '200ms',
    },
    {
      id: 'members',
      icon: <Users className="h-7 w-7" />,
      label: 'ANGGOTA',
      value: stats.members,
      description: 'Mahasiswa Aktif',
      href: '#anggota',
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
      hoverGlow: 'hover:shadow-purple-500/25 dark:hover:shadow-purple-900/40',
      delay: '300ms',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className={`py-16 lg:py-24 bg-white dark:bg-slate-950 transition-colors duration-300`}
      aria-label="Dashboard Stats"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-10 lg:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4">
            <TrendingUp className="h-3 w-3" />
            <span>Update 2025</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 lg:mb-4">
            Dashboard <span className="text-primary">Real-Time</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Pantau dampak dan pertumbuhan ekosistem pelajar Indonesia di Timur Tengah & Afrika
            secara langsung.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 lg:p-8 transition-all duration-500 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl hover:-translate-y-1 ${card.hoverGlow} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? card.delay : '0ms' }}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.1] transition-opacity duration-500`}
                aria-hidden="true"
              />

              {/* Decorative circle */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-50 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

              <div className="relative">
                {/* Header: Icon & Arrow */}
                <div className="flex justify-between items-start mb-4 lg:mb-6">
                  <div
                    className={`inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl ${card.iconBg} shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {card.icon}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 lg:mb-2">
                    {card.label}
                  </p>
                  <p className="text-2xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-1 lg:mb-2 tracking-tight">
                    {card.value}
                  </p>
                  <p className="text-xs lg:text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Bar */}
                <div className="mt-4 lg:mt-6 h-1 w-12 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full w-0 group-hover:w-full bg-primary transition-all duration-700 ease-out`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
})

Stats.displayName = 'Stats'
