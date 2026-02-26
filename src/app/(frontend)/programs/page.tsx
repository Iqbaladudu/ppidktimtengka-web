import React from 'react'
import { getPrograms, getFeaturedPrograms } from '../../../lib/payload'
import { FeaturedPrograms } from '../../../components/home/FeaturedPrograms'

export const metadata = {
  title: 'Program Kerja - PPIDK Timtengka',
  description: 'Program unggulan dan kegiatan mahasiswa Indonesia di Timur Tengah & Afrika',
}

export default async function ProgramsPage() {
  const [programsResult, featuredPrograms] = await Promise.all([
    getPrograms(),
    getFeaturedPrograms(),
  ])

  const programs = programsResult.docs

  return (
    <div className="bg-background">
      <div className="py-20 lg:py-28 text-center space-y-4 px-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Program & Kegiatan
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Berbagai inisiatif untuk pengembangan diri dan pemberdayaan mahasiswa.
        </p>
      </div>

      <FeaturedPrograms programs={programs} featuredPrograms={featuredPrograms} />
    </div>
  )
}
