import React from 'react'
import { NewsHeader } from './NewsHeader'
import { NewsFooter } from './NewsFooter'

interface NewsLayoutProps {
  children: React.ReactNode
  siteName?: string
}

export function NewsLayout({ children, siteName }: NewsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <NewsHeader siteName={siteName} />
      <main className="flex-1">{children}</main>
      <NewsFooter siteName={siteName} />
    </div>
  )
}
