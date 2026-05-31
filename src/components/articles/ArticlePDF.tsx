import React from 'react'
import { FileText, Download } from 'lucide-react'
import type { Document } from '@/payload-types'

interface ArticlePDFProps {
  document: Document | number | null | undefined
}

export function ArticlePDF({ document }: ArticlePDFProps) {
  if (!document || typeof document === 'number' || !document.url) {
    return null
  }

  // Format file size
  const formatBytes = (bytes?: number | null) => {
    if (!bytes) return 'Unknown size'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
          <FileText className="h-6 w-6" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <h4
            className="text-base font-semibold text-foreground truncate"
            title={document.title || 'Dokumen PDF'}
          >
            {document.title || 'Dokumen PDF'}
          </h4>
          <span className="text-sm text-muted-foreground">
            PDF Document &bull; {formatBytes(document.filesize)}
          </span>
        </div>
      </div>

      <a
        href={document.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow"
      >
        <Download className="h-4 w-4" />
        <span>Unduh Dokumen</span>
      </a>
    </div>
  )
}
