import React from 'react'
import { Resources } from '../../../components/home/Resources'
import { FAQ } from '../../../components/home/FAQ'
import { Newsletter } from '../../../components/home/Newsletter'

export const metadata = {
  title: 'Pusat Informasi - PPIDK Timtengka',
  description: 'Unduh dokumen, panduan, dan informasi terbaru',
}

export default function ResourcesPage() {
  return (
    <div className="bg-background">
      <div className="py-20 lg:py-28 text-center space-y-4 px-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Pusat Informasi
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Akses dokumen penting dan jawaban atas pertanyaan seputar studi di Timtengka.
        </p>
      </div>

      <Resources />
      <FAQ />
      <Newsletter />
    </div>
  )
}
