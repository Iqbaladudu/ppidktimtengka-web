'use client'

import React, { createContext, ReactNode, useContext } from 'react'

export type SiteStats = {
  countries: string
  organizations: string
  members: string
  programs: string
}

export type SiteContextType = {
  siteName: string
  description: string
  stats: SiteStats
}

const DEFAULT: SiteContextType = {
  siteName: 'PPIDK TIMTENGKA',
  description:
    'Perhimpunan Pelajar Indonesia se-Dunia Kawasan Timur Tengah dan Afrika. Mewujudkan pelajar yang aktif, kreatif, dan kontributif.',
  stats: {
    countries: '15+',
    organizations: '25',
    members: '10k+',
    programs: '50+',
  },
}

export const SiteContext = createContext<SiteContextType>(DEFAULT)

export const SiteProvider = ({ children }: { children: ReactNode }) => {
  return <SiteContext.Provider value={DEFAULT}>{children}</SiteContext.Provider>
}

export const useSite = () => useContext(SiteContext)
