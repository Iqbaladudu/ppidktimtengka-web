'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  className?: string
}

export function Pagination({ currentPage, totalPages, className }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) {
    return null
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const showEllipsisStart = currentPage > 3
    const showEllipsisEnd = currentPage < totalPages - 2

    if (totalPages <= 7) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (showEllipsisStart) {
        pages.push('ellipsis')
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (showEllipsisEnd) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label="Pagination"
    >
      <Link
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors',
          currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-muted',
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Halaman sebelumnya</span>
      </Link>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex h-10 w-10 items-center justify-center text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
              page === currentPage ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ),
      )}

      <Link
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors',
          currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-muted',
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Halaman selanjutnya</span>
      </Link>
    </nav>
  )
}
