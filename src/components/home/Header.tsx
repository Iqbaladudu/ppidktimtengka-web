'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useSite } from '../../context/SiteContext'
import { Menu, X, Search, ChevronDown, Globe, Moon, Sun, Phone } from 'lucide-react'

type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Tentang Kami',
    href: '/about',
    children: [
      { label: 'Sejarah', href: '/about#sejarah', description: 'Perjalanan 58+ tahun organisasi' },
      { label: 'Visi & Misi', href: '/about#visi-misi', description: 'Tujuan dan cita-cita kami' },
      {
        label: 'Struktur Organisasi',
        href: '/about#struktur',
        description: 'Kepemimpinan 2025-2026',
      },
      {
        label: 'Asta Berdaya',
        href: '/programs#asta-berdaya',
        description: '8 Pilar program unggulan',
      },
    ],
  },
  {
    label: 'Program',
    href: '/programs',
    children: [
      { label: 'Program Unggulan', href: '/programs', description: 'Kegiatan utama kami' },
      { label: 'Kaderisasi', href: '/programs#kaderisasi', description: 'Pengembangan kader' },
      { label: 'Beasiswa', href: '/resources#beasiswa', description: 'Informasi beasiswa' },
      { label: 'Webinar & Seminar', href: '/programs#webinar', description: 'Acara edukatif' },
    ],
  },
  {
    label: 'Anggota',
    href: '/about',
    children: [
      { label: '19 PPI Negara', href: '/about#ppi-negara', description: 'Daftar PPI anggota' },
      { label: 'Cari Anggota', href: '/about#cari-anggota', description: 'Database mahasiswa' },
      { label: 'Alumni', href: '/about#alumni', description: 'Jaringan alumni sukses' },
    ],
  },
  { label: 'Berita & Artikel', href: '/artikel' },
  { label: 'Gabung', href: '/contact' },
]

export const Header: React.FC = React.memo(() => {
  const { siteName } = useSite()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const isHome = pathname === '/'

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isMobileMenuOpen
            ? 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800'
            : isScrolled || !isHome
              ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 supports-backdrop-filter:bg-white/60'
              : 'bg-transparent'
        }`}
        aria-label="Primary header"
      >
        <div className="mx-auto max-w-[1440px] flex h-16 lg:h-20 items-center justify-between px-4 lg:px-8">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-600 text-white font-bold text-lg lg:text-xl shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-105">
              P
            </div>
            <div className="hidden sm:block">
              <span className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {siteName}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden lg:block">
                Periode 2025-2026
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeDropdown === item.label
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-64 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {child.label}
                          </span>
                          {child.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search */}
            <button
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language Switcher */}
            <button
              className="hidden md:flex items-center gap-1 h-10 px-3 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Language"
            >
              <Globe className="h-4 w-4" />
              <span>ID</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle dark mode"
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <div className="h-5 w-5" /> // Placeholder to prevent layout shift
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:inline-flex h-10 lg:h-11 items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 px-5 lg:px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-5 w-5 text-slate-400" />}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-4 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-base font-semibold text-white shadow-lg"
              >
                <Phone className="h-5 w-5" />
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
})

Header.displayName = 'Header'
