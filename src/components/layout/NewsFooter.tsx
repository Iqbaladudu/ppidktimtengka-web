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
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                P
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                {siteName}
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Media informasi dan komunikasi Perhimpunan Pelajar Indonesia di Timur Tengah dan
              Kawasan.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm transition-colors hover:bg-primary/10 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Tentang
            </h3>
            <ul className="space-y-3">
              {footerLinks.tentang.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Berita
            </h3>
            <ul className="space-y-3">
              {footerLinks.berita.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Lain-lain
            </h3>
            <ul className="space-y-3">
              {footerLinks.lainnya.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} {siteName}. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
