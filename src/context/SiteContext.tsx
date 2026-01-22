'use client'

import React, { createContext, ReactNode, useContext } from 'react'

export type SiteStats = {
  countries: string
  organizations: string
  members: string
  programs: string
  yearsHistory: string
  directorates: string
  awardsWon: string
  scholarshipValue: string
}

export type SocialLinks = {
  instagram: string
  tiktok: string
  youtube: string
  facebook: string
  linkedin: string
  email: string
  linktree: string
}

export type SiteContextType = {
  siteName: string
  siteNameFull: string
  description: string
  tagline: string
  period: string
  stats: SiteStats
  socialLinks: SocialLinks
}

const DEFAULT: SiteContextType = {
  siteName: 'PPIDK TIMTENGKA',
  siteNameFull: 'Perhimpunan Pelajar Indonesia Dunia Kawasan Timur Tengah dan Afrika',
  description:
    'Wadah kolaborasi dan kreativitas mahasiswa Indonesia di kawasan Timur Tengah dan Afrika. Muda, dinamis, dan berwawasan global.',
  tagline: 'Katalisator Transformatif, Produktif, dan Inovatif',
  period: '2025-2026',
  stats: {
    countries: '19',
    organizations: '19',
    members: '28,103',
    programs: '100+',
    yearsHistory: '58+',
    directorates: '7',
    awardsWon: '25+',
    scholarshipValue: 'Rp 50M+',
  },
  socialLinks: {
    instagram: 'https://instagram.com/ppidktimtengka',
    tiktok: 'https://tiktok.com/@ppidktimtengafrika',
    youtube: 'https://youtube.com/@ppidktimtengka',
    facebook: 'https://facebook.com/ppidktimtengka',
    linkedin: 'https://linkedin.com/company/ppidk-timtengka',
    email: 'timtengka@gmail.com',
    linktree: 'https://s.id/ppidktimtengka',
  },
}

export const SiteContext = createContext<SiteContextType>(DEFAULT)

export const SiteProvider = ({ children }: { children: ReactNode }) => {
  return <SiteContext.Provider value={DEFAULT}>{children}</SiteContext.Provider>
}

export const useSite = () => useContext(SiteContext)
