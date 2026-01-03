'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Youtube } from 'lucide-react'
import { useSite } from '../../context/SiteContext'

export const Footer: React.FC = React.memo(() => {
  const { siteName, description } = useSite()

  return (
    <footer
      className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-3xl sm:max-w-4xl md:max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm">
                P
              </div>
              <span className="text-lg font-bold text-white">{siteName}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">{description}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Tautan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-emerald-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400 transition-colors">
                  Program Kerja
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Sosial Media</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2024 {siteName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
