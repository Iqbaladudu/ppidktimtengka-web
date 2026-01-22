'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'Keanggotaan',
    question: 'Bagaimana cara bergabung dengan PPIDK TIMTENGKA?',
    answer:
      'Setiap mahasiswa Indonesia yang sedang menempuh pendidikan di 19 negara kawasan Timur Tengah dan Afrika secara otomatis menjadi bagian dari PPIDK TIMTENGKA melalui keanggotaan di PPI negara masing-masing. Tidak ada pendaftaran terpisah yang diperlukan.',
  },
  {
    id: '2',
    category: 'Program',
    question: 'Apa saja program beasiswa yang tersedia?',
    answer:
      'Kami memfasilitasi informasi beasiswa dari berbagai sumber: beasiswa pemerintah (LPDP, Kemenag, Beasiswa Indonesia Maju), beasiswa universitas di Timtengka (Universitas Islam Madinah, Al-Azhar, dll), serta beasiswa mitra korporat. Pantau terus laman media sosial kami untuk update terbaru.',
  },
  {
    id: '3',
    category: 'Keanggotaan',
    question: 'Apakah alumni masih bisa terlibat dalam kegiatan organisasi?',
    answer:
      'Tentu! Kami memiliki program "Alumni Connect" yang dirancang khusus untuk menjembatani alumni dengan mahasiswa aktif. Alumni dapat berpartisipasi sebagai mentor, narasumber, atau mitra strategis dalam berbagai program pengembangan karir.',
  },
  {
    id: '4',
    category: 'Umum',
    question: 'Negara mana saja yang termasuk dalam cakupan PPIDK TIMTENGKA?',
    answer:
      'Cakupan kami meliputi 19 negara: Arab Saudi, Mesir, Turki, Sudan, Yaman, Yordania, Maroko, Tunisia, Libya, Lebanon, Kuwait, Qatar, Uni Emirat Arab, Suriah, Oman, Aljazair, Pakistan, Iran, dan Bahrain.',
  },
  {
    id: '5',
    category: 'Program',
    question: 'Bagaimana cara mengajukan kerjasama media partner?',
    answer:
      'Untuk pengajuan kerjasama, Anda dapat mengirimkan proposal ke email official@timtengka.org atau mengisi formulir "Partnership" yang tersedia di halaman Resources. Tim Humas kami akan merespons dalam waktu 2x24 jam kerja.',
  },
  {
    id: '6',
    category: 'Lainnya',
    question: 'Apakah ada program persiapan bahasa sebelum keberangkatan?',
    answer:
      'Beberapa PPI Negara menyelenggarakan program bimbingan belajar bahasa Arab/Inggris secara mandiri. PPIDK TIMTENGKA juga rutin mengadakan webinar "Persiapan Studi" yang mengundang narasumber dari berbagai negara tujuan.',
  },
]

const categories = ['Semua', 'Keanggotaan', 'Program', 'Umum', 'Lainnya']

export const FAQ: React.FC = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [openItem, setOpenItem] = useState<string | null>('1')

  const filteredFAQ = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300 mb-6 animate-in fade-in zoom-in duration-500">
            <HelpCircle className="h-4 w-4" />
            <span>Pusat Bantuan</span>
          </div>
          <h2
            id="faq-heading"
            className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight"
          >
            Pertanyaan <span className="text-secondary">Umum</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Temukan jawaban cepat untuk pertanyaan yang sering diajukan oleh anggota dan calon
            mahasiswa.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik kata kunci pertanyaan Anda..."
                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 animate-in slide-in-from-bottom-8 duration-700 fade-in">
          {filteredFAQ.map((item) => (
            <div
              key={item.id}
              className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${
                openItem === item.id
                  ? 'border-cyan-500 ring-4 ring-cyan-500/10 dark:ring-cyan-900/20 shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-700'
              }`}
            >
              <button
                onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div>
                  <span className="inline-block text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-1 uppercase tracking-wider opacity-80">
                    {item.category}
                  </span>
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      openItem === item.id
                        ? 'text-cyan-700 dark:text-cyan-400'
                        : 'text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                    }`}
                  >
                    {item.question}
                  </h3>
                </div>
                <div
                  className={`flex-shrink-0 ml-4 h-10 w-10 socket rounded-full flex items-center justify-center transition-all duration-300 ${
                    openItem === item.id
                      ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 rotate-180'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-cyan-50 dark:group-hover:bg-slate-700'
                  }`}
                >
                  <ChevronDown className="h-6 w-6" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredFAQ.length === 0 && (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Pertanyaan tidak ditemukan. Coba kata kunci lain.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-2 pr-6 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="flex -space-x-4 p-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-300 dark:bg-slate-600"
                />
              ))}
            </div>
            <div className="text-left px-2">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Masih punya pertanyaan?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tim kami siap membantu 24/7
              </p>
            </div>
            <a
              href="https://wa.me/6281234567890"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-600 text-sm font-bold text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
            >
              <MessageCircle className="h-4 w-4" />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})

FAQ.displayName = 'FAQ'
