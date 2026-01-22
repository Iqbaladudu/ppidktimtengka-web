import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, Clock, Tag, ArrowRight, Mail, User } from 'lucide-react'
import type { Article, Category, Tag as TagType, Author, Media } from '@/payload-types'

interface SidebarProps {
  trendingArticles: Article[]
  tags: TagType[]
  authors: Author[]
}

export function Sidebar({ trendingArticles, tags, authors }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Newsletter Widget */}
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5" />
            <h3 className="font-bold text-lg">Newsletter</h3>
          </div>
          <p className="text-primary-foreground/90 text-sm mb-4">
            Dapatkan ringkasan berita terpopuler dan info beasiswa langsung di inbox kamu.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email kamu"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-hidden focus:bg-white/20 transition-all text-sm"
            />
            <button className="w-full py-2.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-slate-50 transition-colors">
              Langganan
            </button>
          </div>
        </div>
      </div>

      {/* Trending Widget */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-slate-900 dark:text-white">Sedang Hangat</h3>
        </div>

        <div className="space-y-6">
          {trendingArticles.map((article, idx) => (
            <div key={article.id} className="group flex items-start gap-4">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {idx + 1}
              </span>
              <div>
                <span className="mb-1 block text-xs font-bold uppercase text-primary">
                  {(article.categories as Category[])?.[0]?.name || 'Umum'}
                </span>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="mb-2 block font-medium leading-snug text-slate-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                >
                  {article.title}
                </Link>
                {article.readingTime && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{article.readingTime} min baca</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Authors Widget */}
      {authors.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-slate-900 dark:text-white">Penulis Aktif</h3>
          </div>
          <div className="space-y-4">
            {authors.map((author) => {
              const avatar = author.avatar as Media | undefined
              return (
                <Link
                  key={author.id}
                  href={`/penulis/${author.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 relative">
                    {avatar?.url ? (
                      <Image
                        src={avatar.url}
                        alt={author.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {author.name}
                    </h4>
                    <p className="text-xs text-slate-500 capitalize">
                      {author.role || 'Kontributor'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Tags Widget */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
          <Tag className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-slate-900 dark:text-white">Topik Populer</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/artikel?tag=${tag.slug}`}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-primary/10 hover:text-primary dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-primary/20 dark:hover:text-primary"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Archive Link (Simple) */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
        <h3 className="mb-2 text-lg font-bold">Punya tulisan menarik?</h3>
        <p className="mb-4 text-sm text-slate-300 opacity-90">
          Kirimkan artikel atau opini kamu untuk dimuat di website PPIDK Timtengka.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          Kirim Tulisan
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}
