'use client'

import React from 'react'
import { useArticleContext } from './ArticlePageContext'

export function ArticleFeed({ children }: { children: React.ReactNode }) {
  const { isPending } = useArticleContext()

  if (isPending) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">Menyiapkan konten...</div>
      </div>
    )
  }

  return <>{children}</>
}
