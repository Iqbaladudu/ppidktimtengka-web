import React from 'react'
import { VisionMission } from '../../../components/home/VisionMission'
import { Leadership } from '../../../components/home/Leadership'
import { Achievements } from '../../../components/home/Achievements'
import { GridMap } from '../../../components/home/GridMap'
import { AlumniSpotlight } from '../../../components/home/AlumniSpotlight'

export const metadata = {
  title: 'Tentang Kami - PPIDK Timtengka',
  description: 'Sejarah, Visi Misi, dan Struktur Organisasi PPIDK Timur Tengah & Afrika',
}

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="py-20 lg:py-28 text-center space-y-4 px-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Tentang Kami
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Mengenal lebih dekat Sinergi Pelajar Indonesia di kawasan Timur Tengah dan Afrika.
        </p>
      </div>

      <VisionMission />
      <GridMap />
      <Leadership />
      <Achievements />
      <AlumniSpotlight />
    </div>
  )
}
