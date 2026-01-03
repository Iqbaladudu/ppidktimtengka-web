'use client'

import React from 'react'
import Link from 'next/link'
import { useSite } from '../../context/SiteContext'

export const Header: React.FC = React.memo(() => {
  const { siteName } = useSite()

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md"
      aria-label="Primary header"
    >
      <div className="mx-auto max-w-3xl sm:max-w-4xl md:max-w-6xl flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xl shadow-lg shadow-emerald-200">
            P
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">{siteName}</span>
        </div>
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
          aria-label="Main navigation"
        >
          <Link href="#" className="hover:text-emerald-600 transition-colors">
            Beranda
          </Link>
          <Link href="#about" className="hover:text-emerald-600 transition-colors">
            Tentang Kami
          </Link>
          <Link href="#programs" className="hover:text-emerald-600 transition-colors">
            Program
          </Link>
          <Link href="#gallery" className="hover:text-emerald-600 transition-colors">
            Galeri
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/join"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-medium text-white shadow transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
          >
            Gabung Sekarang
          </Link>
          <button className="md:hidden p-2 text-slate-600" aria-label="Open menu">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'
