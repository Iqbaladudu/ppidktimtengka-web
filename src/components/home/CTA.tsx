import React from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Sparkles } from 'lucide-react'

export const CTA: React.FC = React.memo(() => {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 shadow-2xl shadow-emerald-900/20">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-8 py-16 md:px-16 md:py-20 lg:py-24">
            {/* Left column: Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg mb-8">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Bergabunglah Sekarang</span>
              </div>

              {/* Heading */}
              <h2
                id="cta-heading"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight"
              >
                Siap Berkolaborasi?
                <br />
                <span className="text-emerald-200">Gabung Bersama Kami.</span>
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg text-emerald-50 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Jadilah bagian dari pergerakan mahasiswa Indonesia di Timur Tengah dan Afrika.
                Temukan teman baru, pengalaman baru, dan inspirasi baru.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-emerald-600 shadow-xl hover:bg-emerald-50 hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white active:scale-[0.98]"
                  aria-label="Daftar sebagai anggota"
                >
                  Daftar Anggota
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="#"
                  className="group inline-flex items-center gap-2 text-base font-semibold text-white hover:text-emerald-100 transition-colors"
                  aria-label="Hubungi kami"
                >
                  Hubungi Kami
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Right column: Visual stats/social proof */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main card */}
                <div className="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Stat 1 */}
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                        <Users className="h-7 w-7 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">10,000+</p>
                        <p className="text-sm text-emerald-100">Anggota Aktif</p>
                      </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                        <Sparkles className="h-7 w-7 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">15+</p>
                        <p className="text-sm text-emerald-100">Negara Jangkauan</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/20" />

                    {/* Testimonial-like element */}
                    <div className="space-y-3">
                      <p className="text-sm text-emerald-50 leading-relaxed">
                        "Komunitas yang solid dan supportif untuk mahasiswa Indonesia di luar
                        negeri."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/20" />
                        <div>
                          <p className="text-sm font-semibold text-white">Member PPIDK</p>
                          <p className="text-xs text-emerald-100">Cairo, Egypt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating accent card */}
                <div className="absolute -top-4 -right-4 rounded-xl bg-amber-400 px-4 py-2 shadow-xl">
                  <p className="text-sm font-bold text-slate-900">✨ New Events Weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

CTA.displayName = 'CTA'
