import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Rubric } from '@/payload-types'

interface RubricTagProps {
  rubric: Rubric
  size?: 'sm' | 'md'
  className?: string
}

export function RubricTag({ rubric, size = 'md', className }: RubricTagProps) {
  const baseStyles = cn(
    'inline-flex items-center font-medium uppercase tracking-wide transition-colors',
    size === 'sm' ? 'text-[10px]' : 'text-xs',
    'text-muted-foreground hover:text-foreground',
    className,
  )

  // Use rubric color if available
  const style = rubric.color ? { color: rubric.color } : undefined

  return (
    <Link href={`/rubrik/${rubric.slug}`} className={baseStyles} style={style}>
      {rubric.name}
    </Link>
  )
}
