'use client'

import React from 'react'
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url: string
  title: string
  className?: string
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#4267B2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: 'hover:bg-[#0A66C2] hover:text-white',
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm font-medium text-muted-foreground">Bagikan:</span>
      <div className="flex gap-1">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background transition-colors',
              link.color,
            )}
            title={`Bagikan ke ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
            <span className="sr-only">Bagikan ke {link.name}</span>
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background transition-colors',
            copied ? 'bg-green-500 text-white' : 'hover:bg-muted',
          )}
          title="Salin link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          <span className="sr-only">Salin link</span>
        </button>
      </div>
    </div>
  )
}
