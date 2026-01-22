'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  BarChart3,
  FileText,
  Image,
  Download,
  ArrowRight,
  FolderOpen,
  FileCode,
  FileSpreadsheet,
  FileIcon,
  Search,
} from 'lucide-react'

interface ResourceItem {
  id: string
  icon: React.ReactNode
  typeIcon: React.ReactNode
  title: string
  description: string
  size: string
  downloads: string
  category: string
  color: string
}

const resources: ResourceItem[] = [
  {
    id: 'pedoman',
    icon: <BookOpen className="h-6 w-6" />,
    typeIcon: <FileIcon className="h-4 w-4" />,
    title: 'Pedoman Kaderisasi 2025',
    description: 'Panduan lengkap sistem pengkaderan berjenjang untuk seluruh PPI Negara.',
    size: '2.4 MB',
    downloads: '1.2k',
    category: 'Pedoman',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'ad-art',
    icon: <FileText className="h-6 w-6" />,
    typeIcon: <FileText className="h-4 w-4" />,
    title: 'AD/ART PPIDK Timtengka',
    description: 'Anggaran Dasar & Rumah Tangga hasil Simposium 2024.',
    size: '1.8 MB',
    downloads: '3.5k',
    category: 'Legal',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'proker',
    icon: <FileSpreadsheet className="h-6 w-6" />,
    typeIcon: <FileSpreadsheet className="h-4 w-4" />,
    title: 'Matrix Program Kerja',
    description: 'Timeline dan detail program kerja kabinet setahun kedepan.',
    size: '850 KB',
    downloads: '850',
    category: 'Laporan',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'statistik',
    icon: <BarChart3 className="h-6 w-6" />,
    typeIcon: <FileCode className="h-4 w-4" />,
    title: 'Laporan Data Anggota',
    description: 'Rekapitulasi demografi mahasiswa Indonesia di Timtengka.',
    size: '3.2 MB',
    downloads: '500',
    category: 'Data',
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 'logo',
    icon: <Image className="h-6 w-6" />,
    typeIcon: <Image className="h-4 w-4" />,
    title: 'Brand Kit 2025',
    description: 'Logo pack, template presentasi, dan aset grafis resmi.',
    size: '15 MB',
    downloads: '2.1k',
    category: 'Asset',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'proposal',
    icon: <FolderOpen className="h-6 w-6" />,
    typeIcon: <FileText className="h-4 w-4" />,
    title: 'Partnership Proposal',
    description: 'Penawaran kerjasama untuk sponsor dan media partner.',
    size: '5.5 MB',
    downloads: '300',
    category: 'Legal',
    color: 'from-cyan-500 to-blue-600',
  },
]

const categories = ['Semua', 'Pedoman', 'Legal', 'Laporan', 'Data', 'Asset']

export const Resources: React.FC = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = resources.filter((item) => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="resources"
      className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
      aria-labelledby="resources-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-900/30 px-4 py-2 text-sm font-semibold text-violet-700 dark:text-violet-300 mb-6 animate-in fade-in zoom-in duration-500">
            <FolderOpen className="h-4 w-4" />
            <span>Pusat Unduhan</span>
          </div>
          <h2
            id="resources-heading"
            className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Bank{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
              Data & Aset
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Akses publik untuk dokumen resmi, panduan, dan aset digital organisasi.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari dokumen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all font-medium text-sm"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700 fade-in">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${resource.color} text-white shadow-lg shadow-violet-900/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  {resource.icon}
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                  {resource.typeIcon}
                  {resource.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 h-10 line-clamp-2">
                {resource.description}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">{resource.size}</span>
                  <span className="opacity-70">{resource.downloads} Unduhan</span>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  <Download className="h-4 w-4" />
                  Unduh
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
              <Search className="h-8 w-8" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Tidak ditemukan dokumen dengan kata kunci "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </section>
  )
})

Resources.displayName = 'Resources'
