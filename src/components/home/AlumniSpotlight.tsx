'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Linkedin,
  MapPin,
  Building2,
  ExternalLink,
  GraduationCap,
  Quote,
} from 'lucide-react'
import Image from 'next/image'

interface Alumni {
  id: string
  name: string
  role: string
  company: string
  ppi: string
  year: string
  quote: string
  image?: string
  linkedin?: string
}

const spotlightAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Dr. Ahmad Fuadi',
    role: 'Penulis Best Seller & Akademisi',
    company: 'Negeri 5 Menara',
    ppi: 'PPMI Mesir',
    year: '1996',
    quote:
      'Man Jadda Wajada. Siapa yang bersungguh-sungguh, dia akan berhasil. Spirit ini yang saya bawa dari Mesir.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '2',
    name: 'Prof. Siti Marwah',
    role: 'Rektor Universitas',
    company: 'UIN Sunan Kalijaga',
    ppi: 'PPI Maroko',
    year: '1998',
    quote:
      'Pendidikan di Maghreb mengajarkan kedalaman filosofi yang menjadi bekal memimpin institusi akademik.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'H. Muhammad Yasin',
    role: 'Ketua Komisi Fatwa',
    company: 'Majelis Ulama Indonesia',
    ppi: 'PPI Yaman',
    year: '1995',
    quote:
      'Integritas keilmuan dan kearifan lokal adalah kunci dakwah yang diterima masyarakat luas.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '4',
    name: 'Ir. Rahmat Hidayat',
    role: 'Direktur Operasional',
    company: 'Pertamina International',
    ppi: 'PPMI Arab Saudi',
    year: '2000',
    quote:
      'Disiplin dan profesionalisme kerja di Timur Tengah sangat membentuk karakter kepemimpinan saya.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '5',
    name: 'Dr. Fatimah Zahra',
    role: 'Diplomat Senior',
    company: 'Kementerian Luar Negeri RI',
    ppi: 'PPI Tunisia',
    year: '2005',
    quote:
      'Menjadi jembatan budaya antar bangsa adalah tugas mulia yang dimulai sejak aktif di organisasi mahasiswa.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '6',
    name: 'Ustaz Ahmad Fauzi',
    role: 'Pimpinan Pesantren',
    company: 'Ponpes Modern Gontor',
    ppi: 'PPMI Mesir',
    year: '2008',
    quote:
      'Membangun peradaban dimulai dari pendidikan karakter yang kuat, warisan para masyayikh Al-Azhar.',
    linkedin: 'https://linkedin.com',
  },
]

export const AlumniSpotlight: React.FC = React.memo(() => {
  return (
    <section
      id="alumni"
      className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300"
      aria-labelledby="alumni-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/30 px-4 py-2 text-sm font-semibold text-amber-700 dark:text-amber-300 mb-6 animate-in fade-in zoom-in duration-500">
            <GraduationCap className="h-4 w-4" />
            <span>Alumni Spotlight</span>
          </div>
          <h2
            id="alumni-heading"
            className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight"
          >
            Jejak <span className="text-secondary">Inspirasi</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Figur-figur inspiratif jebolan Timur Tengah & Afrika yang kini berkontribusi nyata di
            berbagai sektor strategis.
          </p>
        </div>

        {/* Global Map Decoration (Abstract) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

        {/* Alumni Cards Grid */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlightAlumni.map((alumni) => (
            <div
              key={alumni.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Header Profile */}
              <div className="flex items-start gap-5 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity" />
                  <div className="relative h-20 w-20 rounded-2xl bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground shadow-inner overflow-hidden">
                    {alumni.image ? (
                      <Image src={alumni.image} alt={alumni.name} fill className="object-cover" />
                    ) : (
                      <span>{alumni.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 text-white shadow-sm">
                    <Linkedin className="h-3.5 w-3.5 fill-current" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors leading-tight mb-1 truncate">
                    {alumni.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    <Building2 className="h-3 w-3" />
                    <span className="truncate">{alumni.role}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    at {alumni.company}
                  </p>
                </div>
              </div>

              {/* Quote Area */}
              <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-auto">
                <Quote className="absolute top-4 left-4 h-4 w-4 text-amber-500/30 fill-current" />
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed pl-4 relative z-10">
                  "{alumni.quote}"
                </p>
              </div>

              {/* Footer Meta */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-900/30 text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    {alumni.year}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {alumni.ppi}
                  </div>
                </div>

                <Link
                  href={alumni.linkedin || '#'}
                  target="_blank"
                  className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Connect
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block relative">
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Anda Alumni Timur Tengah & Afrika?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Mari bergabung kembali, bangun jejaring, dan berkontribusi untuk adik-adik mahasiswa
                aktif.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#database-alumni"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-bold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:gap-3"
                >
                  Update Database Alumni
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#linkedin-group"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-8 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  Gabung LinkedIn Group
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

AlumniSpotlight.displayName = 'AlumniSpotlight'
