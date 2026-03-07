import React from 'react'

interface NewsLayoutProps {
  children: React.ReactNode
  siteName?: string
}

export function NewsLayout({ children, siteName }: NewsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">{children}</main>
    </div>
  )
}
