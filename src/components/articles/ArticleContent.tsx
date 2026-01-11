import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

interface ArticleContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  className?: string
}

export function ArticleContent({ content, className }: ArticleContentProps) {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        // Base typography - Editorial feel
        'prose prose-lg max-w-none dark:prose-invert font-serif',
        // Headings
        'prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900',
        'prose-h1:text-4xl prose-h1:mb-6',
        'prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:pb-2',
        'prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4',
        'prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4',
        // Paragraphs
        'prose-p:leading-8 prose-p:text-slate-700 prose-p:mb-6 prose-p:text-[1.125rem]',
        // Links
        'prose-a:text-emerald-700 prose-a:no-underline prose-a:border-b prose-a:border-emerald-200 hover:prose-a:border-emerald-600 hover:prose-a:bg-emerald-50 transition-colors',
        // Lists
        'prose-ul:my-6 prose-ol:my-6 prose-li:text-slate-700 prose-li:my-2',
        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:rounded-r-lg',
        'prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:text-slate-800 prose-blockquote:leading-relaxed',
        // Code
        'prose-code:font-sans prose-code:text-sm prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-emerald-700 prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-slate-900 prose-pre:shadow-lg prose-pre:rounded-xl',
        // Images
        'prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10',
        'prose-figure:my-10',
        'prose-figcaption:mt-3 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-slate-500 prose-figcaption:font-sans',
        // Tables
        'prose-table:border prose-th:bg-slate-50 prose-th:p-4 prose-td:p-4 prose-td:border-slate-100',
        className,
      )}
    >
      <PayloadRichText data={content} />
    </div>
  )
}
