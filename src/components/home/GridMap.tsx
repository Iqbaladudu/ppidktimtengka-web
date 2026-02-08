'use client'

import React, { useState } from 'react'
import { Search, Users, MapPin, ExternalLink, Globe } from 'lucide-react'

interface PPICountry {
  id: string
  name: string
  fullName: string
  members: number
  region: string
  flag: string
}

const ppiCountries: PPICountry[] = [
  {
    id: 'mesir',
    name: 'PPMI Mesir',
    fullName: 'Perhimpunan Pelajar dan Mahasiswa Indonesia di Mesir',
    members: 15793,
    region: 'Afrika Utara',
    flag: '🇪🇬',
  },
  {
    id: 'yaman',
    name: 'PPI Yaman',
    fullName: 'Perhimpunan Pelajar Indonesia di Yaman',
    members: 6018,
    region: 'Timur Tengah',
    flag: '🇾🇪',
  },
  {
    id: 'saudi',
    name: 'PPMI Arab Saudi',
    fullName: 'Perhimpunan Pelajar dan Mahasiswa Indonesia di Arab Saudi',
    members: 3156,
    region: 'Timur Tengah',
    flag: '🇸🇦',
  },
  {
    id: 'yordania',
    name: 'HPMI Yordania',
    fullName: 'Himpunan Pelajar Mahasiswa Indonesia di Yordania',
    members: 1053,
    region: 'Timur Tengah',
    flag: '🇯🇴',
  },
  {
    id: 'pakistan',
    name: 'PPMI Pakistan',
    fullName: 'Perhimpunan Pelajar dan Mahasiswa Indonesia di Pakistan',
    members: 537,
    region: 'Asia Selatan',
    flag: '🇵🇰',
  },
  {
    id: 'tunisia',
    name: 'PPI Tunisia',
    fullName: 'Perhimpunan Pelajar Indonesia di Tunisia',
    members: 420,
    region: 'Afrika Utara',
    flag: '🇹🇳',
  },
  {
    id: 'maroko',
    name: 'PPI Maroko',
    fullName: 'Perhimpunan Pelajar Indonesia di Maroko',
    members: 380,
    region: 'Afrika Utara',
    flag: '🇲🇦',
  },
  {
    id: 'iran',
    name: 'PPI Iran',
    fullName: 'Perhimpunan Pelajar Indonesia di Iran',
    members: 180,
    region: 'Timur Tengah',
    flag: '🇮🇷',
  },
  {
    id: 'suriah',
    name: 'PPI Suriah',
    fullName: 'Perhimpunan Pelajar Indonesia di Suriah',
    members: 50,
    region: 'Timur Tengah',
    flag: '🇸🇾',
  },
  {
    id: 'aljazair',
    name: 'PPI Aljazair',
    fullName: 'Perhimpunan Pelajar Indonesia di Aljazair',
    members: 35,
    region: 'Afrika Utara',
    flag: '🇩🇿',
  },
  {
    id: 'libya',
    name: 'PPI Libya',
    fullName: 'Perhimpunan Pelajar Indonesia di Libya',
    members: 25,
    region: 'Afrika Utara',
    flag: '🇱🇾',
  },
  {
    id: 'uea',
    name: 'PPI Uni Emirat',
    fullName: 'Perhimpunan Pelajar Indonesia di Uni Emirat Arab',
    members: 15,
    region: 'Timur Tengah',
    flag: '🇦🇪',
  },
  {
    id: 'kuwait',
    name: 'PPI Kuwait',
    fullName: 'Perhimpunan Pelajar Indonesia di Kuwait',
    members: 10,
    region: 'Timur Tengah',
    flag: '🇰🇼',
  },
  {
    id: 'qatar',
    name: 'PPI Qatar',
    fullName: 'Perhimpunan Pelajar Indonesia di Qatar',
    members: 8,
    region: 'Timur Tengah',
    flag: '🇶🇦',
  },
  {
    id: 'bahrain',
    name: 'PPI Bahrain',
    fullName: 'Perhimpunan Pelajar Indonesia di Bahrain',
    members: 5,
    region: 'Timur Tengah',
    flag: '🇧🇭',
  },
  {
    id: 'oman',
    name: 'PPI Oman',
    fullName: 'Perhimpunan Pelajar Indonesia di Oman',
    members: 3,
    region: 'Timur Tengah',
    flag: '🇴🇲',
  },
]

export const GridMap: React.FC = React.memo(() => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCountries = ppiCountries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalMembers = ppiCountries.reduce((sum, c) => sum + c.members, 0)

  return (
    <section
      id="grid-map"
      className="py-24 lg:py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] animate-professional-grid pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-6 animate-pulse">
            <Globe className="h-4 w-4" />
            <span>Jaringan Global</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            19 Negara, 1 Komunitas
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Menghubungkan {totalMembers.toLocaleString()} mahasiswa Indonesia di Timur Tengah dan
            Afrika.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="Cari negara anggota..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {country.flag}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-center text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {country.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md mt-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                <Users className="h-3 w-3" />
                {country.members.toLocaleString()}
              </div>

              {/* Tooltip-like details on hover could go here, or just keep it clean */}
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            Tidak ada negara yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </section>
  )
})

GridMap.displayName = 'GridMap'
