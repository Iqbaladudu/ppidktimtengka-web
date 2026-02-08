'use client'

import React, { useRef, useEffect, useCallback } from 'react'
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
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CairoSkyline } from './CairoSkyline'
import { useSite } from '../../context/SiteContext'

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger)

interface StatItem {
  id: string
  label: string
  value: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// Utility: Split text into character spans (Word-safe wrapping)
const SplitText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block leading-[1.05] ${className || ''}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="char inline-block" style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))}
          {/* Add space after word unless it's the last one */}
          {wordIndex < text.split(' ').length - 1 && (
            <span className="char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}

// Magnetic Button Component
const MagneticButton = ({
  children,
  href,
  className,
  ...props
}: {
  children: React.ReactNode
  href: string
  className: string
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }, [])

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // Only enable magnetic effect on devices with hover capability (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    if (mediaQuery.matches) {
      button.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <Link ref={buttonRef} href={href} className={className} {...props}>
      {children}
    </Link>
  )
}

export const Hero = React.memo(function Hero() {
  const { siteName, siteNameFull, tagline, period, stats } = useSite()
  const containerRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const statsBarRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const floatingStats: StatItem[] = [
    { id: 'members', label: 'Mahasiswa', value: stats.members, Icon: Users },
    { id: 'countries', label: 'Negara', value: stats.countries, Icon: Globe2 },
    { id: 'directorates', label: 'Direktorat', value: stats.directorates, Icon: Building2 },
    { id: 'years', label: 'Tahun Sejarah', value: stats.yearsHistory, Icon: Calendar },
    { id: 'programs', label: 'Program Aktif', value: stats.programs, Icon: Award },
  ]

  // Main GSAP Animation Timeline
  useGSAP(
    () => {
      if (!containerRef.current) return

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        // Instantly show everything without animation
        gsap.set(
          '.hero-badge, .hero-subtitle, .hero-title .char, .hero-period, .hero-tagline, .hero-cta-wrapper, .stat-item',
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
          },
        )
        return
      }

      // Create master timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // 1. Badge entrance
      tl.from('.hero-badge', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        scale: 0.9,
      })

        // 2. Subtitle entrance
        .from(
          '.hero-subtitle',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4',
        )

        // 3. Title characters staggered entrance (SplitText effect)
        .from(
          '.hero-title .char',
          {
            y: 80,
            opacity: 0,
            rotateX: -90,
            stagger: 0.03,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.3',
        )

        // 4. Period entrance
        .from(
          '.hero-period',
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.4',
        )

        // 5. Tagline entrance with scale
        .from(
          '.hero-tagline',
          {
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
          },
          '-=0.3',
        )

        // 6. CTA buttons staggered entrance (targeting wrappers to avoid conflict with magnetic effect)
        .from(
          '.hero-cta-wrapper',
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'back.out(1.5)',
          },
          '-=0.4',
        )

        // 7. Stats bar 3D flip entrance
        .from(
          '.stat-item',
          {
            rotateY: 90,
            opacity: 0,
            transformPerspective: 1000,
            transformOrigin: 'left center',
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.3',
        )

      // Counter animation for stats (ScrollTrigger)
      const statValues = gsap.utils.toArray<HTMLElement>('.stat-value')
      statValues.forEach((statEl) => {
        const targetText = statEl.textContent || '0'
        // Extract numeric value (e.g., "500+" → 500)
        const numericMatch = targetText.match(/(\d+)/)
        if (!numericMatch) return

        const targetNum = parseInt(numericMatch[1], 10)
        const suffix = targetText.replace(/\d+/, '') // Get non-numeric parts like "+"

        const counter = { value: 0 }

        gsap.to(counter, {
          value: targetNum,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: statsBarRef.current,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            statEl.textContent = Math.round(counter.value) + suffix
          },
        })
      })

      // Parallax effect for Cairo skyline on scroll
      gsap.to('.cairo-skyline-wrapper', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Grid fade on scroll
      gsap.to('.hero-grid', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '30% top',
          end: '80% top',
          scrub: true,
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[85vh] pt-20 md:pt-0 w-full flex flex-col justify-center overflow-hidden bg-background"
        aria-labelledby="hero-heading"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Grid pattern with animation */}
          <div
            className="hero-grid absolute inset-0 bg-[url('/grid.svg')] animate-professional-grid pointer-events-none"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
            }}
          />
          <div className="cairo-skyline-wrapper absolute inset-0 w-full h-full pointer-events-none">
            <CairoSkyline />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full z-10 pb-32 lg:pb-0">
          <div
            ref={heroContentRef}
            className="flex flex-col items-center justify-center text-center space-y-8 lg:space-y-10"
          >
            <div className="flex flex-col items-center justify-center space-y-6 lg:space-y-8">
              {/* Badge */}
              <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 backdrop-blur-md px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold text-primary shadow-sm w-fit transition-all hover:bg-background/80">
                <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 lg:h-2.5 lg:w-2.5 bg-primary"></span>
                </span>
                <span className="truncate max-w-[280px] sm:max-w-none">
                  Sinergi Pelajar Indonesia Timur Tengah & Afrika
                </span>
              </div>

              <div className="space-y-4 lg:space-y-6 max-w-4xl mx-auto">
                <p className="hero-subtitle text-sm lg:text-xl font-bold text-primary uppercase tracking-[0.2em]">
                  {siteNameFull}
                </p>
                <h1
                  ref={titleRef}
                  id="hero-heading"
                  className="hero-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05]"
                  style={{ perspective: '1000px' }}
                >
                  <SplitText text={siteName} />
                </h1>
                <p className="hero-period text-lg lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
                  Periode{' '}
                  <span className="font-bold text-foreground border-b-2 border-primary/30">
                    {period}
                  </span>
                </p>
              </div>

              {/* Tagline */}
              <div className="hero-tagline relative py-2 max-w-3xl mx-auto">
                <p className="text-xl lg:text-3xl font-serif text-foreground/80 italic leading-relaxed">
                  "{tagline}"
                </p>
              </div>

              {/* CTAs - Wrapped in div for entrance animation separation */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 lg:pt-8 w-full sm:w-auto">
                <div className="hero-cta-wrapper">
                  <MagneticButton
                    href="#gabung"
                    className="hero-cta group relative inline-flex h-12 lg:h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 lg:px-10 text-base lg:text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Rocket className="h-5 w-5 lg:h-6 lg:w-6 relative z-10" />
                    <span className="relative z-10">Bergabung Sekarang</span>
                    <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                  </MagneticButton>
                </div>

                <div className="hero-cta-wrapper">
                  <MagneticButton
                    href="#about"
                    className="hero-cta group inline-flex h-12 lg:h-14 items-center justify-center gap-2 rounded-xl border-2 border-input bg-background/50 backdrop-blur-sm px-8 lg:px-10 text-base lg:text-lg font-bold text-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <BookOpen className="h-5 w-5 lg:h-6 lg:w-6" />
                    Pelajari Lebih Lanjut
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
})

Hero.displayName = 'Hero'
