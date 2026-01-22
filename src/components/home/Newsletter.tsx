'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

export const Newsletter: React.FC = React.memo(() => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section
      id="newsletter"
      className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>

        {/* Heading */}
        <h2 id="newsletter-heading" className="text-2xl lg:text-3xl font-bold text-white mb-4">
          📬 Dapatkan Update Terbaru
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
          Berlangganan newsletter untuk info program, beasiswa, dan kegiatan terbaru PPIDK TIMTENGKA
        </p>

        {/* Form */}
        {isSubmitted ? (
          <div className="inline-flex items-center gap-3 bg-white/20 rounded-xl px-6 py-4 text-white">
            <CheckCircle className="h-6 w-6" />
            <span className="font-medium">Terima kasih! Anda berhasil berlangganan.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Anda"
              required
              className="flex-1 h-14 px-5 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="h-14 px-8 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              Subscribe →
            </button>
          </form>
        )}

        {/* Options */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" /> Program Updates
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Beasiswa Info
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400" /> Event Invitation
          </span>
        </div>
      </div>
    </section>
  )
})

Newsletter.displayName = 'Newsletter'
