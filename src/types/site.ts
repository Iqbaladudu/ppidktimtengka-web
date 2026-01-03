export type SiteStats = {
  countries: string
  organizations: string
  members: string
  programs: string
}

export type SiteConfig = {
  siteName: string
  description: string
  stats: SiteStats
}
