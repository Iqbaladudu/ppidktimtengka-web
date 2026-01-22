import React from 'react'
import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/payload'
import { ContactForm } from '@/components/contact/ContactForm'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Hubungi Kami | ${siteSettings.siteName}`,
    description: 'Hubungi tim kami untuk pertanyaan, kolaborasi, atau informasi lebih lanjut.',
  }
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings()
  const { contactEmail, contactPhone, contactAddress, contactFormId } = siteSettings

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-slate-900 pt-32 pb-20 px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-blue-100 text-lg">
            Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar dari Anda.
            Silakan isi formulir di bawah ini atau kunjungi kantor kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Cards (Left Column) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                    <a href={`mailto:${contactEmail}`} className="text-slate-900 dark:text-white font-semibold hover:text-blue-600 transition-colors">
                      {contactEmail || 'info@ppdktimtengka.org'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Telepon</p>
                    <a href={`tel:${contactPhone}`} className="text-slate-900 dark:text-white font-semibold hover:text-blue-600 transition-colors">
                      {contactPhone || '+62 812 3456 7890'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Alamat</p>
                    <p className="text-slate-900 dark:text-white font-medium leading-relaxed">
                      {contactAddress || 'Kairo, Mesir'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-blue-400" />
                <h3 className="font-bold text-lg">Jam Operasional</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex justify-between">
                  <span>Senin - Kamis</span>
                  <span className="font-semibold text-white">09:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Jumat</span>
                  <span className="font-semibold text-white">09:00 - 11:30</span>
                </li>
                <li className="flex justify-between">
                  <span>Sabtu - Minggu</span>
                  <span className="font-semibold text-white">Tutup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 h-full">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Kirim Pesan</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda kembali.
              </p>
              
              <ContactForm formId={contactFormId || undefined} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}