'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce' // We might need to create this hook first, or just implement debounce manually

export function ArticleSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')

  // Simple debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('q', value)
        params.delete('page') // Reset to page 1 on search
      } else {
        params.delete('q')
      }

      router.push(`/artikel?${params.toString()}`)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, router, searchParams])

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cari artikel, topik, atau berita..."
          className="w-full h-12 pl-12 pr-4 rounded-xl border-none ring-1 ring-slate-200 bg-white transition-all focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        {value && (
          <button
            onClick={() => setValue('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
