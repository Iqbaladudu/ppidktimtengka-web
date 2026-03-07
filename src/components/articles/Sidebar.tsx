import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, Clock, Tag, ArrowRight, Mail, User, Sparkles } from 'lucide-react'
import type { Article, Category, Tag as TagType, Author, Media, Rubric } from '@/payload-types'

interface SidebarProps {
  trendingArticles: Article[]
  tags: TagType[]
  authors: Author[]
  rubrics: Rubric[]
}

export function Sidebar({ trendingArticles, tags, authors, rubrics }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Newsletter Widget */}
      <div className="rounded-2xl bg-linear-to-br from-[#a30404] to-[#590707] p-6 text-white shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5" />
            <h3 className="font-bold text-lg">Newsletter</h3>
          </div>
          <p className="text-white/90 text-sm mb-4">
            Dapatkan ringkasan berita terpopuler dan info beasiswa langsung di inbox kamu.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email kamu"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-hidden focus:bg-white/20 transition-all text-sm"
            />
            <button className="w-full py-2.5 rounded-xl bg-white text-[#a30404] font-bold text-sm hover:bg-white/90 transition-colors cursor-pointer">
              Langganan
            </button>
          </div>
        </div>
      </div>

      {/* Trending Widget */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">Sedang Hangat</h3>
        </div>

        <div className="space-y-6">
          {trendingArticles.map((article, idx) => (
            <div key={article.id} className="group flex items-start gap-4">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {idx + 1}
              </span>
              <div>
                <span className="mb-1 block text-xs font-bold uppercase text-primary">
                  {(article.categories as Category[])?.[0]?.name || 'Umum'}
                </span>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="mb-2 block font-medium leading-snug text-foreground transition-colors group-hover:text-primary"
                >
                  {article.title}
                </Link>
                {article.readingTime && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{article.readingTime} min baca</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rubrics Widget */}
      {rubrics.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Rubrik Pilihan</h3>
          </div>
          <div className="space-y-3">
            {rubrics.map((rubric) => (
              <Link
                key={rubric.id}
                href={`/rubrik/${rubric.slug}`}
                className="flex items-center justify-between group p-3 rounded-xl hover:bg-accent/50 transition-all border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-2 w-2 rounded-full ring-2 ring-card shadow-sm"
                    style={{ backgroundColor: rubric.color || 'var(--primary)' }}
                  />
                  <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors text-sm">
                    {rubric.name}
                  </span>
                </div>
                <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Authors Widget */}
      {authors.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Penulis Aktif</h3>
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
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted relative ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                    {avatar?.url ? (
                      <Image
                        src={avatar.url}
                        alt={author.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {author.name}
                    </h4>
                    <p className="text-xs text-muted-foreground capitalize">
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
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
          <Tag className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">Topik Populer</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/artikel?tag=${tag.slug}`}
              className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:scale-105 border border-border"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Archive Link (Simple) */}
      <div className="rounded-2xl bg-foreground p-6 text-background shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground to-foreground/90" />
        <div className="relative z-10">
          <h3 className="mb-2 text-lg font-bold">Punya tulisan menarik?</h3>
          <p className="mb-4 text-sm text-background/70 opacity-90">
            Kirimkan artikel atau opini kamu untuk dimuat di website PPIDK Timtengka.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-background/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-background/20 border border-background/10"
          >
            Kirim Tulisan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
