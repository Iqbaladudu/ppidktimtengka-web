'use client'

import React, { useState } from 'react'
import {
  X,
  Settings,
  Radio,
  BookOpen,
  Globe,
  Briefcase,
  Users,
  Palette,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

interface Pillar {
  id: string
  number: number
  title: string
  icon: React.ReactNode
  description: string
  programs: string[]
  color: string
}

const pillars: Pillar[] = [
  {
    id: 'manajemen',
    number: 1,
    title: 'Manajemen Berdaya',
    icon: <Settings className="h-8 w-8" />,
    description:
      'Penguatan sistem manajemen organisasi yang efektif, efisien, dan transparan berbasis digital.',
    programs: [
      'SOP Organisasi Terintegrasi',
      'Digital Management System (DMS)',
      'Capacity Building Pengurus',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'informasi',
    number: 2,
    title: 'Informasi Berdaya',
    icon: <Radio className="h-8 w-8" />,
    description:
      'Pusat penyebaran informasi yang akurat, cepat, dan bermanfaat bagi seluruh mahasiswa.',
    programs: ['Media Center Terpadu', 'Newsletter Mingguan', 'Digital Campaign Kreatif'],
    color: 'from-cyan-500 to-teal-600',
  },
  {
    id: 'literasi',
    number: 3,
    title: 'Literasi Berdaya',
    icon: <BookOpen className="h-8 w-8" />,
    description: 'Membangun budaya literasi kritis dan produktif melalui karya tulis dan diskusi.',
    programs: ['Omon-Omon Bareng (Diskusi)', 'Jurnal Ilmiah Timtengka', 'Penerbitan Buku Antologi'],
    color: 'from-emerald-500 to-green-600',
  },
  {
    id: 'diplomasi',
    number: 4,
    title: 'Diplomasi Berdaya',
    icon: <Globe className="h-8 w-8" />,
    description: 'Membangun jejaring strategis dan diplomasi lunak dengan berbagai stakeholder.',
    programs: ['MoU Partnership Strategis', 'Networking Gala Dinner', 'International Youth Forum'],
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'pengelolaan',
    number: 5,
    title: 'Pengelolaan Berdaya',
    icon: <BarChart3 className="h-8 w-8" />,
    description:
      'Optimalisasi pengelolaan sumber daya organisasi untuk keberlanjutan jangka panjang.',
    programs: ['Resource Management System', 'Financial Planning & Audit', 'Asset Optimization'],
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 'karir',
    number: 6,
    title: 'Karir Bisnis Berdaya',
    icon: <Briefcase className="h-8 w-8" />,
    description: 'Akselerasi pengembangan karir profesional dan jiwa kewirausahaan mahasiswa.',
    programs: ['Career Talk Series', 'Middle East Job Fair', 'Entrepreneurship Incubator'],
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'kaderisasi',
    number: 7,
    title: 'Kaderisasi Berdaya',
    icon: <Users className="h-8 w-8" />,
    description: 'Mencetak pemimpin masa depan yang progresif, adaptif, dan berintegritas.',
    programs: ['GOKS (Grand Orientation)', 'Leadership Camp', 'Mentorship & Coaching'],
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'minat',
    number: 8,
    title: 'Minat Bakat Berdaya',
    icon: <Palette className="h-8 w-8" />,
    description: 'Ruang ekspresi dan pengembangan potensi minat bakat seni, budaya, dan olahraga.',
    programs: ['Circle Timtengka', 'Festival Budaya Nusantara', 'Talent Competition'],
    color: 'from-fuchsia-500 to-purple-600',
  },
]

export const AstaBerdaya: React.FC = React.memo(() => {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null)

  return (
    <section
      id="asta-berdaya"
      className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
      aria-labelledby="asta-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/40 px-4 py-2 text-sm font-semibold text-amber-700 dark:text-amber-300 mb-6">
            <span className="animate-pulse">✨</span> 8 Pilar Program
          </div>
          <h2
            id="asta-heading"
            className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-tight"
          >
            Asta <span className="text-primary">Berdaya</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Delapan pilar utama yang menjadi pondasi transformasi dan pemberdayaan seluruh mahasiswa
            Indonesia di kawasan Timur Tengah dan Afrika.
          </p>
        </div>

        {/* Pillars Grid - Custom Honeycomb Layout */}
        <div className="relative isolate">
          {/* Background Decorative Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10" />

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar)}
                className="group relative h-full text-left focus:outline-none"
              >
                <div className="relative h-full overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 transition-all duration-500 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2">
                  {/* Background */}
                  <div
                    className={`absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-white/5 rounded-bl-[4rem] -z-0 transition-transform duration-500 group-hover:scale-110" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-blue-900/20 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                      >
                        {pillar.icon}
                      </div>
                      <span className="text-5xl font-black text-slate-100 dark:text-slate-800 select-none transition-colors duration-300 group-hover:text-slate-200 dark:group-hover:text-slate-700">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                      {pillar.description}
                    </p>

                    {/* Fake Button */}
                    <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      Lihat Program
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Pillar Detail */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSelectedPillar(null)}
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className={`relative bg-primary p-8 overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl">
                  {React.cloneElement(selectedPillar.icon as React.ReactElement, {
                    className: 'h-10 w-10',
                  })}
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-white mb-2 border border-white/20">
                    PILAR KE-{selectedPillar.number}
                  </div>
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {selectedPillar.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  Deskripsi
                </h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedPillar.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  Program Unggulan
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedPillar.programs.map((program, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-700/50 transition-colors"
                    >
                      <div
                        className={`mt-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0`}
                      >
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {program}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedPillar(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
})

AstaBerdaya.displayName = 'AstaBerdaya'
