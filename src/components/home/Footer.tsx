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
    <footer
      className="relative bg-muted/80 backdrop-blur-sm dark:bg-slate-950 text-muted-foreground overflow-hidden"
      aria-label="Footer"
    >
      {/* Background Decor - Solidified */}
      <div className="absolute top-0 inset-x-0 h-px bg-border" />

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 pt-20 pb-12">
        {/* Quote Section (Bung Karno) */}
        <div className="mb-20 text-center relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-9xl font-serif text-foreground/5 font-bold leading-none select-none">
            "
          </div>
          <blockquote className="relative z-10">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-relaxed font-serif tracking-tight">
              <span className="text-primary">"</span>Warisi Apinya, Jangan Abunya
              <span className="text-secondary">"</span>
            </p>
            <footer className="text-base font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-border"></span>
              Ir. Soekarno
              <span className="h-px w-8 bg-border"></span>
            </footer>
          </blockquote>
        </div>

        {/* Links & Brand Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 border-t border-border pt-16">
          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/20">
                P
              </div>
              <div>
                <span className="block text-xl font-bold text-foreground tracking-tight leading-none mb-1">
                  {siteName}
                </span>
                <span className="block text-xs font-medium text-primary uppercase tracking-wider">
                  Periode 2025-2026
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              {siteNameFull}. Wadah pemersatu dan penggerak mahasiswa Indonesia di kawasan Timur
              Tengah dan Afrika.
            </p>

            <div className="flex items-start gap-3 mb-8 text-sm text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">Sekretariat Pusat Koordinasi:</p>
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
                  className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-primary hover:border-primary transition-all"
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
              <h4 className="font-bold text-foreground mb-6">Tentang</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.tentang.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 mr-1 text-primary">
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
              <h4 className="font-bold text-foreground mb-6">Program</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.program.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 mr-1 text-secondary">
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
              <h4 className="font-bold text-foreground mb-6">Anggota</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.anggota.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 mr-1 text-secondary">
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
              <h4 className="font-bold text-foreground mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-border">
                <Link
                  href="/linktree"
                  className="inline-flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider hover:text-primary transition-colors"
                >
                  Official Linktree
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 PPIDK Timtengka. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>Indonesia</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-primary fill-current animate-pulse" />
              <span>by DIRKOMINFO</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
