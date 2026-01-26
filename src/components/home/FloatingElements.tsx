'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle, ArrowUp, X } from 'lucide-react'

export const FloatingElements: React.FC = React.memo(() => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Gunakan format nomor internasional: 62812...
  const whatsappNumber = '6281234567890'
  const whatsappMessage = 'Halo, saya ingin bertanya tentang program PPIDK TIMTENGKA...'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {/* Container Pointer Events: none to let clicks pass through empty areas */}

      <div className="flex flex-col items-end gap-3 pointer-events-auto">
        {/* WhatsApp Button Wrapper */}
        <div className="relative">
          {/* Tooltip */}
          <div
            className={`absolute bottom-full right-0 mb-4 w-72 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 origin-bottom-right transform ${
              showWhatsAppTooltip
                ? 'scale-100 opacity-100 translate-y-0'
                : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <button
              onClick={() => setShowWhatsAppTooltip(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  CS
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Butuh Bantuan?</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tim kami online sekarang
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Halo! 👋 Ada yang bisa kami bantu seputar program atau beasiswa?
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-green-500/20 hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              Chat WhatsApp
            </a>
          </div>

          {/* Main WA Button */}
          <button
            onClick={() => setShowWhatsAppTooltip(!showWhatsAppTooltip)}
            className="group h-14 w-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl shadow-green-600/30 hover:scale-110 hover:shadow-2xl hover:shadow-green-600/40 transition-all duration-300 relative overflow-hidden"
            aria-label="WhatsApp Chat"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            <MessageCircle className="h-7 w-7 fill-current" />
          </button>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`h-12 w-12 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white shadow-lg hover:bg-black dark:hover:bg-slate-600 hover:scale-110 transition-all duration-500 transform ${
            showBackToTop
              ? 'opacity-100 translate-y-0 rotate-0'
              : 'opacity-0 translate-y-12 rotate-180 pointer-events-none'
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
})

FloatingElements.displayName = 'FloatingElements'
