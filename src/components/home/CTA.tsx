'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSite } from '../../context/SiteContext'
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Mail,
  User,
  MessageSquare,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  CheckCircle,
} from 'lucide-react'

export const CTA: React.FC = React.memo(() => {
  const { socialLinks } = useSite()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle')

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setNewsletterStatus('success')
      setNewsletterEmail('')
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-900"
      aria-labelledby="cta-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 opacity-90" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* Animated Orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDuration: '7s' }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Form */}
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-400 mb-6 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Hubungi Kami</span>
              </div>
              <h2
                id="cta-heading"
                className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Mari{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Terhubung
                </span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Punya pertanyaan, usulan kolaborasi, atau sekadar ingin menyapa? Tim kami siap
                mendengar dari Anda.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pesan Terkirim!</h3>
                  <p className="text-slate-400">
                    Terima kasih telah menghubungi kami. Kami akan merespons sesegera mungkin.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 text-blue-400 font-bold hover:text-blue-300 transition-colors"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="group relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nama Lengkap"
                        className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="group relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Alamat Email"
                        className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="group relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Subjek Pesan"
                      className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="group relative">
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={4}
                      className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Newsletter & Socials */}
          <div className="flex flex-col justify-center space-y-10">
            {/* Newsletter Box */}
            <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 lg:p-10 shadow-2xl">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="absolute -top-24 -right-24 h-64 w-64 bg-cyan-400 rounded-full blur-[80px] opacity-50" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">📬 Newsletter</h3>
                <p className="text-indigo-100 mb-8">
                  Dapatkan ringkasan eksklusif seputar beasiswa, event, dan kabar terbaru pelajar
                  Indonesia di Timtengka langsung ke inbox Anda.
                </p>

                {newsletterStatus === 'success' ? (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 text-white font-medium animate-in fade-in slide-in-from-bottom-4">
                    <CheckCircle className="h-6 w-6 text-green-300" />
                    Terima kasih telah berlangganan!
                  </div>
                ) : (
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      className="flex-1 h-12 px-5 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-indigo-200 focus:ring-2 focus:ring-white/50 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="h-12 px-6 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-slate-400 font-bold uppercase tracking-wider mb-6 text-sm">
                Ikuti Media Sosial Kami
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: 'Instagram',
                    icon: <Instagram className="h-5 w-5" />,
                    url: socialLinks.instagram,
                    color: 'hover:bg-pink-600',
                  },
                  {
                    name: 'YouTube',
                    icon: <Youtube className="h-5 w-5" />,
                    url: socialLinks.youtube,
                    color: 'hover:bg-red-600',
                  },
                  {
                    name: 'Facebook',
                    icon: <Facebook className="h-5 w-5" />,
                    url: socialLinks.facebook,
                    color: 'hover:bg-blue-600',
                  },
                  {
                    name: 'LinkedIn',
                    icon: <Linkedin className="h-5 w-5" />,
                    url: socialLinks.linkedin,
                    color: 'hover:bg-blue-700',
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className={`flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-transparent text-slate-300 hover:text-white transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                  >
                    {social.icon}
                    <span className="font-semibold">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 flex flex-col gap-4">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Email Resmi
                </p>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  {socialLinks.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Sekretariat
                </p>
                <p className="text-slate-300">Kairo, Mesir (Pusat Koordinasi)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

CTA.displayName = 'CTA'
