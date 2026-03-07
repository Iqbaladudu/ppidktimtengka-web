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
        'prose max-w-none dark:prose-invert font-serif',
        'md:prose-lg',
        // Headings
        'prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground',
        'prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-4 md:prose-h1:mb-6',
        'prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 md:prose-h2:mt-12 prose-h2:mb-4 md:prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-2',
        'prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 md:prose-h3:mt-10 prose-h3:mb-3 md:prose-h3:mb-4',
        'prose-h4:text-lg md:prose-h4:text-xl prose-h4:mt-6 md:prose-h4:mt-8 prose-h4:mb-3 md:prose-h4:mb-4',
        // Paragraphs
        'prose-p:leading-7 md:prose-p:leading-8 prose-p:text-foreground/80 prose-p:mb-5 md:prose-p:mb-6',
        // Links
        'prose-a:text-primary prose-a:no-underline prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary hover:prose-a:bg-primary/5 transition-colors',
        // Lists
        'prose-ul:my-4 md:prose-ul:my-6 prose-ol:my-4 md:prose-ol:my-6 prose-li:text-foreground/80 prose-li:my-1 md:prose-li:my-2',
        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted prose-blockquote:py-3 md:prose-blockquote:py-4 prose-blockquote:px-4 md:prose-blockquote:px-6 prose-blockquote:my-6 md:prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:rounded-r-lg',
        'prose-blockquote:text-lg md:prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:text-foreground/90 prose-blockquote:leading-relaxed',
        // Code
        'prose-code:font-sans prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-primary prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-[#1e1e2e] prose-pre:shadow-lg prose-pre:rounded-xl',
        // Images
        'prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 md:prose-img:my-10 prose-img:w-full',
        'prose-figure:my-8 md:prose-figure:my-10',
        'prose-figcaption:mt-2 md:prose-figcaption:mt-3 prose-figcaption:text-center prose-figcaption:text-xs md:prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:font-sans',
        // Tables
        'prose-table:border prose-th:bg-muted prose-th:p-3 md:prose-th:p-4 prose-td:p-3 md:prose-td:p-4 prose-td:border-border prose-table:text-sm md:prose-table:text-base',
        className,
      )}
    >
      <PayloadRichText data={content} />
    </div>
  )
}
