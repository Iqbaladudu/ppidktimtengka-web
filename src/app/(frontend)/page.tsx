import React from 'react'
import dynamic from 'next/dynamic'
import { SiteProvider } from '../../context/SiteContext'
import { Header } from '../../components/home/Header'
import { Stats } from '../../components/home/Stats'
import { About } from '../../components/home/About'
import { Programs } from '../../components/home/Programs'
import { CTA } from '../../components/home/CTA'
import { Footer } from '../../components/home/Footer'
import { LatestNews } from '../../components/home/LatestNews'

// Lazy load hero (large visual) to improve initial parsing for non-critical content
const Hero = dynamic(() => import('../../components/home/Hero').then((m) => m.Hero), {
  ssr: true,
})

export default function HomePage() {
  return (
    <SiteProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Header />

        <main className="flex-1">
          <Hero />

          <Stats />

          <About />

          {/* Latest News from Berita */}
          <LatestNews />

          <Programs />

          <CTA />
        </main>

        <Footer />
      </div>
    </SiteProvider>
  )
}
