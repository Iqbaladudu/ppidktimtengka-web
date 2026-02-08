'use client'

import React, { createContext, useContext, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ArticleContextType {
  isPending: boolean
  navigateTo: (url: string) => void
}

const ArticleContext = createContext<ArticleContextType | null>(null)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navigateTo = (url: string) => {
    startTransition(() => {
      router.push(url)
    })
  }

  return (
    <ArticleContext.Provider value={{ isPending, navigateTo }}>{children}</ArticleContext.Provider>
  )
}

export function useArticleContext() {
  const context = useContext(ArticleContext)
  if (!context) {
    throw new Error('useArticleContext must be used within ArticleProvider')
  }
  return context
}
