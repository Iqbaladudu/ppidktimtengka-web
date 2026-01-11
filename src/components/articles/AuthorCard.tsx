'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Author, Media } from '@/payload-types'

interface AuthorCardProps {
  author: Author
  size?: 'sm' | 'lg'
  showBio?: boolean
}

export function AuthorCard({ author, size = 'sm', showBio = false }: AuthorCardProps) {
  const avatar = author.avatar as Media | undefined

  if (size === 'lg') {
    return (
      <div className="rounded-xl border bg-card p-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <Link href={`/penulis/${author.slug}`}>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
              {avatar?.url ? (
                <Image
                  src={avatar.url}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </Link>
          <div className="flex-1">
            <Link
              href={`/penulis/${author.slug}`}
              className="text-lg font-semibold hover:text-primary"
            >
              {author.name}
            </Link>
            {author.role && (
              <p className="text-sm capitalize text-muted-foreground">
                {author.role === 'journalist' && 'Jurnalis'}
                {author.role === 'editor' && 'Editor'}
                {author.role === 'columnist' && 'Kolumnis'}
                {author.role === 'contributor' && 'Kontributor'}
              </p>
            )}
            {showBio && author.bio && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {typeof author.bio === 'string' ? author.bio : 'Penulis di PPIDK Timtengka'}
              </p>
            )}
            {author.socialLinks && author.socialLinks.length > 0 && (
              <div className="mt-3 flex justify-center gap-3 sm:justify-start">
                {author.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Small variant (inline)
  return (
    <Link href={`/penulis/${author.slug}`} className="group inline-flex items-center gap-2">
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
        {avatar?.url ? (
          <Image src={avatar.url} alt={author.name} fill className="object-cover" sizes="32px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-bold text-primary">
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-sm font-medium group-hover:text-primary">{author.name}</span>
    </Link>
  )
}
