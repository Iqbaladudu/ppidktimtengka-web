'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import type { Article, Media, Rubric, Author } from '@/payload-types'

interface RubricHighlightProps {
  rubric: Rubric
  articles: Article[]
}

export function RubricHighlight({ rubric, articles }: RubricHighlightProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 320 // card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  if (articles.length === 0) return null

  return (
    <div className="my-12 py-8 border-y border-slate-100 bg-slate-50/50 dark:bg-slate-900/30 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pilihan Redaksi</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-8 rounded-full bg-emerald-500 block"></span>
            {rubric.name}
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-slate-200 hover:bg-white hover:shadow-sm transition-all dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-slate-200 hover:bg-white hover:shadow-sm transition-all dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles.map((article) => {
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           const thumbnail = (article as any).thumbnail as Media | undefined
           const featuredImage = article.featuredImage as Media | undefined
           const displayImage = thumbnail || featuredImage
           const author = article.author as Author

           return (
            <Link 
              key={article.id}
              href={`/artikel/${article.slug}`}
              className="snap-start shrink-0 w-[260px] group border border-slate-100 rounded-xl p-3 bg-white dark:bg-slate-800 dark:border-slate-700 hover:shadow-md transition-all"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-slate-200 dark:bg-slate-700">
                 {displayImage?.url ? (
                   <Image 
                     src={displayImage.url} 
                     alt={displayImage.alt || article.title}
                     fill
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                     sizes="260px"
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                 )}
              </div>
              
              <span className="text-xs font-bold text-emerald-600 mb-1 block">
                {(article.categories as any)?.[0]?.name || 'Umum'}
              </span>

              <h3 className="font-bold text-base leading-snug text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {article.title}
              </h3>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-auto">
                 <div className="h-5 w-5 rounded-full bg-slate-200 overflow-hidden relative">
                    {(author.avatar as Media)?.url && (
                        <Image src={(author.avatar as Media).url!} alt={author.name} fill className="object-cover" />
                    )}
                 </div>
                 <span className="truncate max-w-[120px]">{author.name}</span>
              </div>
            </Link>
           )
        })}
        
        {/* 'See All' Card */}
        <Link 
          href={`/rubrik/${rubric.slug}`}
          className="snap-start shrink-0 w-[150px] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
        >
           <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
             <ArrowRight className="h-5 w-5" />
           </div>
           <span className="font-bold text-sm text-emerald-700">Lihat Semua</span>
           <span className="text-xs text-slate-500">{rubric.name}</span>
        </Link>
      </div>
    </div>
  )
}
