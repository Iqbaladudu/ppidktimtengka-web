import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react'

interface NewsFooterProps {
  siteName?: string
  className?: string
}

export function NewsFooter({ siteName = 'PPIDK Timtengka', className }: NewsFooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    tentang: [
      { label: 'Tentang Kami', href: '/#about' },
      { label: 'Visi & Misi', href: '/#about' },
      { label: 'Tim Redaksi', href: '/tentang/redaksi' },
    ],
    berita: [
      { label: 'Artikel Terbaru', href: '/artikel' },
      { label: 'Kategori', href: '/artikel' },
      { label: 'Arsip', href: '/artikel' },
    ],
    lainnya: [
      { label: 'Kontak', href: '/kontak' },
      { label: 'Kebijakan Privasi', href: '/privasi' },
      { label: 'Syarat & Ketentuan', href: '/syarat' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white shadow-lg shadow-emerald-200">
                P
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">{siteName}</span>
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              Media informasi dan komunikasi Perhimpunan Pelajar Indonesia di Timur Tengah dan
              Kawasan.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Tentang
            </h3>
            <ul className="space-y-3">
              {footerLinks.tentang.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Berita
            </h3>
            <ul className="space-y-3">
              {footerLinks.berita.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Lain-lain
            </h3>
            <ul className="space-y-3">
              {footerLinks.lainnya.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-600">
            © {currentYear} {siteName}. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
