import React, { useMemo } from 'react'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'

type Program = {
  title: string
  category: string
  date: string
  description?: string
  color: string
}

export const Programs: React.FC = React.memo(() => {
  const programs = useMemo<Program[]>(
    () => [
      {
        title: 'Simposium Kawasan',
        category: 'Akademik',
        date: 'Mei 2024',
        description:
          'Forum diskusi dan pertukaran gagasan akademis untuk meningkatkan kapasitas intelektual mahasiswa.',
        color: 'emerald',
      },
      {
        title: 'Festival Budaya',
        category: 'Seni & Budaya',
        date: 'Agustus 2024',
        description:
          'Perayaan keberagaman budaya Indonesia melalui seni, musik, dan kuliner tradisional.',
        color: 'amber',
      },
      {
        title: 'Webinar Beasiswa',
        category: 'Edukasi',
        date: 'Setiap Bulan',
        description:
          'Sesi informasi dan panduan lengkap mengenai peluang beasiswa di berbagai universitas.',
        color: 'blue',
      },
    ],
    [],
  )

  const getCategoryColors = (color: string) => {
    const colors = {
      emerald: {
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        gradient: 'from-emerald-500 to-emerald-600',
        hover: 'group-hover:border-emerald-300',
      },
      amber: {
        badge: 'bg-amber-100 text-amber-700 border-amber-200',
        gradient: 'from-amber-500 to-amber-600',
        hover: 'group-hover:border-amber-300',
      },
      blue: {
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        gradient: 'from-blue-500 to-blue-600',
        hover: 'group-hover:border-blue-300',
      },
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  return (
    <section
      id="programs"
      className="relative py-24 md:py-32 bg-white"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700 mb-4">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Program Unggulan
            </div>
            <h2
              id="programs-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
            >
              Kegiatan Seru Kami
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Berbagai program inovatif untuk pengembangan diri dan kolaborasi
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
            aria-label="Lihat semua program"
          >
            Lihat Semua Program
            <ArrowRight className="h-4 w-4 transition-transform" aria-hidden="true" />
          </a>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((item, i) => {
            const colors = getCategoryColors(item.color)
            return (
              <article
                key={i}
                className={`group relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 transition-all hover:shadow-2xl hover:shadow-slate-900/5 ${colors.hover}`}
              >
                {/* Image/Visual Area with gradient */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-90`}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]"
                    aria-hidden="true"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center rounded-lg border ${colors.badge} backdrop-blur-sm px-3 py-1.5 text-xs font-bold shadow-sm`}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Decorative pattern */}
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-7">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time>{item.date}</time>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-5">
                    {item.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Pelajari Lebih Lanjut
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center transition-all group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-105">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
})

Programs.displayName = 'Programs'
