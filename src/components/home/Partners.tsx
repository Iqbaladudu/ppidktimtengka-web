'use client'

import React, { useState, useEffect } from 'react'
import {
  Building2,
  GraduationCap,
  Newspaper,
  Users2,
  Briefcase,
  Handshake,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react'

interface Partner {
  id: string
  name: string
  category: string
  logo?: string
  url?: string
}

const partnerCategories = [
  { id: 'all', name: 'Semua Mitra', icon: null },
  { id: 'pemerintah', name: 'Pemerintah', icon: <Building2 className="h-4 w-4" /> },
  { id: 'pendidikan', name: 'Pendidikan', icon: <GraduationCap className="h-4 w-4" /> },
  { id: 'media', name: 'Media', icon: <Newspaper className="h-4 w-4" /> },
  { id: 'organisasi', name: 'Organisasi', icon: <Users2 className="h-4 w-4" /> },
  { id: 'korporat', name: 'Korporat', icon: <Briefcase className="h-4 w-4" /> },
]

// Mock Logos (using PLACEHOLDER text creatively since we don't have real assets yet)
// In a real app, these would be proper image URLs
const partners: Partner[] = [
  // Pemerintah
  { id: 'kemenag', name: 'Kementerian Agama RI', category: 'pemerintah' },
  { id: 'kemenlu', name: 'Kementerian Luar Negeri', category: 'pemerintah' },
  { id: 'kemendikbud', name: 'Kemendikbudristek', category: 'pemerintah' },
  { id: 'mui', name: 'Majelis Ulama Indonesia', category: 'pemerintah' },
  { id: 'kbri-cairo', name: 'KBRI Cairo', category: 'pemerintah' },
  { id: 'kjri-jeddah', name: 'KJRI Jeddah', category: 'pemerintah' },

  // Pendidikan
  { id: 'ui', name: 'Universitas Indonesia', category: 'pendidikan' },
  { id: 'ugm', name: 'Universitas Gadjah Mada', category: 'pendidikan' },
  { id: 'al-azhar', name: 'Al-Azhar University', category: 'pendidikan' },
  { id: 'ksu', name: 'King Saud University', category: 'pendidikan' },
  { id: 'iium', name: 'Intl Islamic Univ. Malaysia', category: 'pendidikan' },
  { id: 'uin-jakarta', name: 'UIN Syarif Hidayatullah', category: 'pendidikan' },

  // Media
  { id: 'kompas', name: 'Kompas', category: 'media' },
  { id: 'republika', name: 'Republika', category: 'media' },
  { id: 'antara', name: 'Antara News', category: 'media' },
  { id: 'tvri', name: 'TVRI Nasional', category: 'media' },
  { id: 'detik', name: 'Detik.com', category: 'media' },

  // Organisasi
  { id: 'ppi-dunia', name: 'PPI Dunia', category: 'organisasi' },
  { id: 'oic-youth', name: 'OIC Youth Indonesia', category: 'organisasi' },
  { id: 'icmi', name: 'ICMI', category: 'organisasi' },
  { id: 'mes', name: 'Masyarakat Ekonomi Syariah', category: 'organisasi' },
  { id: 'baznas', name: 'BAZNAS', category: 'organisasi' },

  // Korporat
  { id: 'garuda', name: 'Garuda Indonesia', category: 'korporat' },
  { id: 'bsi', name: 'Bank Syariah Indonesia', category: 'korporat' },
  { id: 'telkom', name: 'Telkom Indonesia', category: 'korporat' },
  { id: 'pertamina', name: 'Pertamina', category: 'korporat' },
  { id: 'wardah', name: 'Wardah Cosmetics', category: 'korporat' },
]

export const Partners: React.FC = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPartners =
    activeCategory === 'all' ? partners : partners.filter((p) => p.category === activeCategory)

  return (
    <section
      id="mitra"
      className="py-16 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-4 lg:mb-6 animate-in fade-in zoom-in duration-500">
            <Handshake className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            <span>Mitra & Kolaborasi</span>
          </div>
          <h2
            id="partners-heading"
            className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 lg:mb-6 tracking-tight"
          >
            Sinergi <span className="text-primary">Strategis</span>
          </h2>
          <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Berkolaborasi dengan institusi terkemuka untuk menghadirkan dampak yang lebih luas bagi
            pelajar Indonesia.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-nowrap overflow-x-auto lg:flex-wrap justify-start lg:justify-center gap-2 lg:gap-3 mb-10 lg:mb-16 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 flex-wrap">
          {partnerCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full text-xs lg:text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Infinite Marquee (Only show when 'all' is selected for visual impact) */}
        {activeCategory === 'all' && (
          <div className="relative mb-12 lg:mb-20 py-6 lg:py-8 border-y border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm -mx-4 lg:-mx-8">
            <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-white/80 dark:bg-slate-900/80 z-10" />
            <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-white/80 dark:bg-slate-900/80 z-10" />

            <div className="flex overflow-hidden">
              <div className="flex gap-12 lg:gap-16 animate-marquee whitespace-nowrap py-2 px-8">
                {[...partners, ...partners].map((partner, idx) => (
                  <div
                    key={`${partner.id}-${idx}`}
                    className="flex items-center gap-3 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 text-sm lg:text-base">
                      {partner.name.charAt(0)}
                    </div>
                    <span className="text-sm lg:text-lg font-bold text-slate-700 dark:text-slate-300">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 animate-in slide-in-from-bottom-8 duration-700 fade-in">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Logo Placeholder */}
              <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-xl lg:rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30">
                <span className="text-2xl lg:text-3xl font-black text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {partner.name.charAt(0)}
                </span>
              </div>

              <h3 className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {partner.name}
              </h3>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4 text-indigo-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 lg:mt-20">
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-900 dark:bg-indigo-950 px-6 py-8 lg:px-12 lg:py-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 animate-professional-grid" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 max-w-xl">
              <h3 className="text-xl lg:text-3xl font-bold text-white mb-2 lg:mb-3">
                Ingin Berkolaborasi Bersama Kami?
              </h3>
              <p className="text-sm lg:text-base text-slate-400 mb-0">
                Mari ciptakan dampak positif yang lebih luas bagi ekosistem pendidikan dan
                kepemudaan Indonesia.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 lg:gap-4 w-full md:w-auto">
              <a
                href="#partnership"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 hover:-translate-y-1"
              >
                <Handshake className="h-4 w-4" />
                Ajukan Partnership
              </a>
              <a
                href="#proposal"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
              >
                Unduh Proposal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Partners.displayName = 'Partners'
