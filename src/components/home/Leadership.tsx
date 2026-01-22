'use client'

import React from 'react'
import {
  Users,
  BarChart3,
  Globe,
  BookOpen,
  Megaphone,
  Briefcase,
  Lightbulb,
  Building2,
  PieChart,
} from 'lucide-react'

interface Directorate {
  id: string
  name: string
  shortName: string
  icon: React.ReactNode
  description: string
  color: string
}

const directorates: Directorate[] = [
  {
    id: 'sekjen',
    name: 'Sekretaris Jenderal',
    shortName: 'SEKJEN',
    icon: <Building2 className="h-6 w-6" />,
    description: 'Pusat administrasi dan koordinasi internal organisasi',
    color: 'from-slate-500 to-slate-600',
  },
  {
    id: 'bendum',
    name: 'Bendahara Umum',
    shortName: 'BENDUM',
    icon: <PieChart className="h-6 w-6" />,
    description: 'Pengelolaan keuangan dan aset organisasi yang transparan',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'kominfo',
    name: 'Direktorat Komunikasi & Informasi',
    shortName: 'DIRKOMINFO',
    icon: <Megaphone className="h-6 w-6" />,
    description: 'Ujung tombak publikasi dan branding organisasi',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'penlitka',
    name: 'Direktorat Pendidikan & Kajian',
    shortName: 'DIRPENLITKA',
    icon: <BookOpen className="h-6 w-6" />,
    description: 'Pusat kajian strategis dan pengembangan akademik',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'polhum',
    name: 'Direktorat Politik & Hukum',
    shortName: 'DIRPOLHUM',
    icon: <Globe className="h-6 w-6" />,
    description: 'Kajian isu politik kawasan dan advokasi hukum',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'ekonom',
    name: 'Direktorat Ekonomi & Bisnis',
    shortName: 'DIREKONOM',
    icon: <Briefcase className="h-6 w-6" />,
    description: 'Pengembangan kewirausahaan dan kemandirian ekonomi',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'psdm',
    name: 'Direktorat SDM',
    shortName: 'DIRPSDM',
    icon: <Users className="h-6 w-6" />,
    description: 'Pengembangan kapasitas dan kaderisasi anggota',
    color: 'from-pink-500 to-fuchsia-600',
  },
  {
    id: 'senbud',
    name: 'Direktorat Seni & Budaya',
    shortName: 'DIRSENBUD',
    icon: <Lightbulb className="h-6 w-6" />,
    description: 'Pelestarian dan promosi kekayaan seni budaya',
    color: 'from-indigo-500 to-blue-600',
  },
]

export const Leadership: React.FC = React.memo(() => {
  return (
    <section
      id="struktur"
      className="py-24 lg:py-32 bg-white dark:bg-slate-900 transition-colors duration-300"
      aria-labelledby="leadership-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Stats (4 columns) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-6">
              <Users className="h-4 w-4" />
              <span>Struktur Organisasi</span>
            </div>

            <h2
              id="leadership-heading"
              className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Kabinet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                Sinergi Berdaya
              </span>
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Struktur fungsional yang dirancang untuk merespons tantangan zaman dan kebutuhan
              anggota secara tangkas.
            </p>

            {/* Quick Stats Box */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Komposisi Pengurus
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300">Total Pengurus</span>
                  <span className="font-bold text-slate-900 dark:text-white text-lg">85</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300">Asal Negara</span>
                  <span className="font-bold text-slate-900 dark:text-white text-lg">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-slate-300">Keterwakilan Wanita</span>
                  <span className="font-bold text-slate-900 dark:text-white text-lg">42%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Directorates Grid (8 columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {directorates.map((dir) => (
                <div
                  key={dir.id}
                  className="group relative bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-900/10 dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${dir.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      {dir.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {dir.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1 mb-2">
                        {dir.shortName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {dir.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-slate-50 to-transparent dark:from-slate-800/50 dark:to-transparent rounded-bl-3xl -z-10 group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Leadership.displayName = 'Leadership'
