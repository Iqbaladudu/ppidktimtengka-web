'use client'

import React from 'react'
import { useSite } from '../../context/SiteContext'

export const Stats: React.FC = React.memo(() => {
  const { stats } = useSite()

  return (
    <section className="py-12 bg-emerald-900 text-white" aria-label="Stats">
      <div className="mx-auto max-w-3xl sm:max-w-4xl md:max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-emerald-400">{stats.countries}</h3>
            <p className="text-emerald-100/80 text-sm uppercase tracking-wider">Negara</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-emerald-400">{stats.organizations}</h3>
            <p className="text-emerald-100/80 text-sm uppercase tracking-wider">Organisasi PPI</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-emerald-400">{stats.members}</h3>
            <p className="text-emerald-100/80 text-sm uppercase tracking-wider">Mahasiswa</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-emerald-400">{stats.programs}</h3>
            <p className="text-emerald-100/80 text-sm uppercase tracking-wider">Program Kerja</p>
          </div>
        </div>
      </div>
    </section>
  )
})

Stats.displayName = 'Stats'
