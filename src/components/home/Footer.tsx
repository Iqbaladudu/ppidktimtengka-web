'use client'

import React from 'react'
import Link from 'next/link'
import { useSite } from '../../context/SiteContext'
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Heart,
  Globe,
  ArrowRight,
} from 'lucide-react'

export const Footer: React.FC = React.memo(() => {
  const { siteName, siteNameFull, socialLinks } = useSite()

  const footerLinks = {
    tentang: [
      { label: 'Sejarah & Filosofi', href: '#sejarah' },
      { label: 'Visi & Misi', href: '#visi-misi' },
      { label: 'Struktur Organisasi', href: '#struktur' },
      { label: 'Tim Direktorat', href: '#tim' },
      { label: 'Hubungan Alumni', href: '#alumni' },
    ],
    program: [
      { label: 'Asta Berdaya', href: '#asta-berdaya' },
      { label: 'Program Unggulan', href: '#programs' },
      { label: 'Kaderisasi', href: '#kaderisasi' },
      { label: 'Info Beasiswa', href: '#beasiswa' },
      { label: 'Webinar Series', href: '#webinar' },
    ],
    anggota: [
      { label: 'Keanggotaan PPI', href: '#keanggotaan' },
      { label: 'Database Mahasiswa', href: '#database' },
      { label: 'Peta Persebaran', href: '#peta' },
      { label: 'Login Anggota', href: '#login' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'AD/ART', href: '/ad-art' },
    ],
  }

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden" aria-label="Footer">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 pt-20 pb-12">
        {/* Quote Section (Bung Karno) */}
        <div className="mb-20 text-center relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-9xl font-serif text-white/5 font-bold leading-none select-none">
            "
          </div>
          <blockquote className="relative z-10">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-relaxed font-serif tracking-tight">
              <span className="text-blue-500">"</span>Warisi Apinya, Jangan Abunya
              <span className="text-cyan-500">"</span>
            </p>
            <footer className="text-base font-semibold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-slate-700"></span>
              Ir. Soekarno
              <span className="h-px w-8 bg-slate-700"></span>
            </footer>
          </blockquote>
        </div>

        {/* Links & Brand Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 border-t border-slate-800/60 pt-16">
          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-2xl shadow-lg shadow-blue-500/20">
                P
              </div>
              <div>
                <span className="block text-xl font-bold text-white tracking-tight leading-none mb-1">
                  {siteName}
                </span>
                <span className="block text-xs font-medium text-blue-400 uppercase tracking-wider">
                  Periode 2025-2026
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-sm">
              {siteNameFull}. Wadah pemersatu dan penggerak mahasiswa Indonesia di kawasan Timur
              Tengah dan Afrika.
            </p>

            <div className="flex items-start gap-3 mb-8 text-sm text-slate-400">
              <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white mb-1">Sekretariat Pusat Koordinasi:</p>
                <p>Kairo, Mesir</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {[
                {
                  icon: <Instagram className="h-5 w-5" />,
                  href: socialLinks.instagram,
                  label: 'Instagram',
                },
                {
                  icon: <Youtube className="h-5 w-5" />,
                  href: socialLinks.youtube,
                  label: 'YouTube',
                },
                {
                  icon: <Facebook className="h-5 w-5" />,
                  href: socialLinks.facebook,
                  label: 'Facebook',
                },
                {
                  icon: <Linkedin className="h-5 w-5" />,
                  href: socialLinks.linkedin,
                  label: 'LinkedIn',
                },
                {
                  icon: <Mail className="h-5 w-5" />,
                  href: `mailto:${socialLinks.email}`,
                  label: 'Email',
                },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="h-10 w-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="font-bold text-white mb-6">Tentang</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.tentang.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 mr-1 text-blue-500">
                        ›
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold text-white mb-6">Program</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.program.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 mr-1 text-cyan-500">
                        ›
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold text-white mb-6">Anggota</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.anggota.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 mr-1 text-teal-500">
                        ›
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-slate-800">
                <Link
                  href="/linktree"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider hover:text-blue-400 transition-colors"
                >
                  Official Linktree
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025 PPIDK Timtengka. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>Indonesia</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
              <span>by DIRKOMINFO</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
