import React from 'react'
import dynamic from 'next/dynamic'
import { Stats } from '../../components/home/Stats'
import { LatestNews } from '../../components/home/LatestNews'
import { Partners } from '../../components/home/Partners'
import { Newsletter } from '../../components/home/Newsletter'

// Lazy load hero (large visual) to improve initial parsing for non-critical content
const Hero = dynamic(() => import('../../components/home/Hero').then((m) => m.Hero), {
  ssr: true,
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main className="flex-1">
        {/* Section 2: Hero - Full Screen with Parallax */}
        <Hero />

        {/* Section 3: Dashboard Stats - Interactive Cards */}
        {/* <Stats /> */}

        {/* Section 9: Berita & Kegiatan Terkini */}
        <LatestNews />

        {/* Section 11: Mitra & Kerja Sama */}
        {/* <Partners /> */}
      </main>
    </div>
  )
}
