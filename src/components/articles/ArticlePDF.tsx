'use client'

import React, { useState } from 'react'
import { FileText, Download, BookOpen, ChevronDown, ExternalLink, X, AlertCircle } from 'lucide-react'
import type { Document } from '@/payload-types'

interface ArticlePDFProps {
  document: Document | number | null | undefined
}

const CATEGORY_LABELS: Record<string, string> = {
  'press-release': 'Siaran Pers',
  report: 'Laporan',
  letter: 'Surat',
  other: 'Dokumen',
}

export function ArticlePDF({ document }: ArticlePDFProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const [useGoogleViewer, setUseGoogleViewer] = useState(false)

  if (!document || typeof document === 'number' || !document.url) {
    return null
  }

  const formatBytes = (bytes?: number | null) => {
    if (!bytes) return null
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const fileSize = formatBytes(document.filesize)
  const categoryLabel = document.category ? CATEGORY_LABELS[document.category] : 'Dokumen'
  const isPdf = document.mimeType === 'application/pdf' || document.filename?.endsWith('.pdf')

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(document.url)}&embedded=true`
  const iframeUrl = useGoogleViewer ? googleViewerUrl : document.url

  const handleIframeError = () => {
    if (!useGoogleViewer) {
      setUseGoogleViewer(true)
      setIframeError(false)
    } else {
      setIframeError(true)
    }
  }

  const handleOpenReader = () => {
    setIsReaderOpen(true)
    setIframeError(false)
    setUseGoogleViewer(false)
  }

  const handleCloseReader = () => {
    setIsReaderOpen(false)
  }

  return (
    <div className="mt-8 space-y-0">
      {/* Attachment Card */}
      <div
        className={`
          rounded-2xl border border-border bg-gradient-to-br from-muted/60 to-muted
          shadow-sm transition-all duration-300
          ${isReaderOpen ? 'rounded-b-none border-b-0 shadow-md' : 'hover:shadow-md hover:border-primary/30'}
        `}
      >
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: File info */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Icon */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-red-100 dark:bg-red-900/30" />
              <div className="absolute inset-0 rounded-xl bg-red-500/10 animate-pulse" />
              <FileText className="relative h-7 w-7 text-red-600 dark:text-red-400" />
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {categoryLabel}
                </span>
                {isPdf && (
                  <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/40 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
                    PDF
                  </span>
                )}
              </div>
              <h4
                className="mt-1 text-base font-semibold text-foreground truncate leading-snug"
                title={document.title}
              >
                {document.title}
              </h4>
              {document.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {document.description}
                </p>
              )}
              {fileSize && (
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Ukuran file: {fileSize}
                </p>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Read Online Button */}
            {isPdf && (
              <button
                onClick={isReaderOpen ? handleCloseReader : handleOpenReader}
                aria-expanded={isReaderOpen}
                aria-label={isReaderOpen ? 'Tutup pembaca' : 'Baca online'}
                className={`
                  group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold
                  border transition-all duration-200
                  ${
                    isReaderOpen
                      ? 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/15'
                      : 'border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                  }
                `}
              >
                {isReaderOpen ? (
                  <>
                    <X className="h-4 w-4" />
                    <span>Tutup</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Baca Online</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${isReaderOpen ? 'rotate-180' : ''}`}
                    />
                  </>
                )}
              </button>
            )}

            {/* Download Button */}
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              title="Unduh dokumen"
              aria-label="Unduh dokumen"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Unduh</span>
            </a>

            {/* Open in New Tab */}
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka di tab baru"
              aria-label="Buka di tab baru"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Online Reader Panel */}
      {isReaderOpen && (
        <div className="rounded-b-2xl border border-t-0 border-border bg-muted/30 overflow-hidden">
          {/* Reader Toolbar */}
          <div className="flex items-center justify-between border-b border-border bg-muted/60 px-5 py-2.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Pembaca Dokumen</span>
              {useGoogleViewer && (
                <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-400">
                  via Google Docs
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!useGoogleViewer && !iframeError && (
                <button
                  onClick={() => { setUseGoogleViewer(true); setIframeError(false) }}
                  className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline transition-colors"
                >
                  Coba Google Viewer
                </button>
              )}
              <a
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Buka Fullscreen
              </a>
            </div>
          </div>

          {/* Reader Content */}
          <div className="relative bg-gray-100 dark:bg-gray-900" style={{ height: '680px' }}>
            {!iframeError ? (
              <iframe
                key={iframeUrl}
                src={iframeUrl}
                className="h-full w-full border-0"
                title={`Pembaca: ${document.title}`}
                onError={handleIframeError}
                loading="lazy"
                allow="fullscreen"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            ) : (
              /* Fallback when both methods fail */
              <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h5 className="text-base font-semibold text-foreground">
                    Tidak dapat menampilkan dokumen
                  </h5>
                  <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                    Dokumen tidak dapat dimuat langsung di browser. Silakan unduh atau buka di tab baru untuk melihatnya.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={document.url}
                    download
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Unduh Dokumen
                  </a>
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/30 hover:bg-muted transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Buka di Tab Baru
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
