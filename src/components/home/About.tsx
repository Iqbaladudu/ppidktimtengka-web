import React, { useMemo } from 'react'
import { Globe2, Heart, Lightbulb } from 'lucide-react'

type AboutItem = {
  icon: React.ReactNode
  title: string
  desc: string
  gradientFrom: string
  gradientTo: string
  bgColor: string
}

export const About: React.FC = React.memo(() => {
  const items = useMemo<AboutItem[]>(
    () => [
      {
        icon: <Globe2 className="h-7 w-7" strokeWidth={2} />,
        title: 'Jaringan Luas',
        desc: 'Terhubung dengan ribuan mahasiswa di berbagai negara Timur Tengah dan Afrika.',
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-blue-600',
        bgColor: 'bg-blue-50',
      },
      {
        icon: <Heart className="h-7 w-7" strokeWidth={2} />,
        title: 'Solidaritas Kuat',
        desc: 'Membangun rasa kekeluargaan dan saling membantu antar sesama perantau.',
        gradientFrom: 'from-rose-500',
        gradientTo: 'to-rose-600',
        bgColor: 'bg-rose-50',
      },
      {
        icon: <Lightbulb className="h-7 w-7" strokeWidth={2} />,
        title: 'Program Inovatif',
        desc: 'Berbagai kegiatan pengembangan diri, akademik, dan sosial kemasyarakatan.',
        gradientFrom: 'from-amber-500',
        gradientTo: 'to-amber-600',
        bgColor: 'bg-amber-50',
      },
    ],
    [],
  )

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-gradient-to-b from-white to-slate-50"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header with better spacing */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-5"
          >
            Kenapa <span className="text-emerald-600">PPIDK TIMTENGKA?</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Kami hadir sebagai wadah pemersatu dan penggerak potensi mahasiswa Indonesia di kawasan
            Timur Tengah dan Afrika.
          </p>
        </div>

        {/* Cards grid with refined design */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 lg:p-10 transition-all hover:shadow-2xl hover:shadow-slate-900/5 border border-slate-200/60 hover:border-slate-300/60"
            >
              {/* Subtle gradient accent on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity`}
                aria-hidden="true"
              />

              {/* Icon with refined styling */}
              <div className="mb-6">
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} text-white shadow-lg transition-transform group-hover:scale-105`}
                >
                  {item.icon}
                </div>
              </div>

              {/* Content with better typography */}
              <h3 className="mb-3 text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">{item.desc}</p>

              {/* Decorative element */}
              <div
                className={`absolute -right-8 -bottom-8 w-32 h-32 ${item.bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none`}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
