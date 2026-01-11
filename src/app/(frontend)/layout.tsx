import React from 'react'
import { Merriweather, Plus_Jakarta_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import './styles.css'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

export const metadata = {
  description: 'PPIDK Timtengka Website',
  title: 'PPIDK Timtengka Homepage',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="id" className={cn(merriweather.variable, plusJakarta.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
