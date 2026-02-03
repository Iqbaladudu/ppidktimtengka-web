import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Rubric } from '@/payload-types'

interface RubricTagProps {
  rubric: Rubric
  size?: 'sm' | 'md'
  className?: string
  variant?: 'default' | 'badge'
}

export function RubricTag({ rubric, size = 'md', className, variant = 'default' }: RubricTagProps) {
  const rubricColor = rubric.color || 'var(--primary)'
  
  const baseStyles = cn(
    'inline-flex items-center gap-1.5 font-semibold transition-all',
    size === 'sm' ? 'text-[10px]' : 'text-xs',
    className,
  )

  if (variant === 'badge') {
    return (
      <Link 
        href={`/rubrik/${rubric.slug}`} 
        className={cn(
          baseStyles,
          'px-2.5 py-1 rounded-full border bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5'
        )}
        style={{ 
          color: rubricColor,
          borderColor: `${rubricColor}30`, // 30% opacity
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rubricColor }} />
        {rubric.name}
      </Link>
    )
  }

  // Default text variant with dot
  return (
    <Link 
      href={`/rubrik/${rubric.slug}`} 
      className={cn(baseStyles, 'uppercase tracking-wide text-muted-foreground hover:text-foreground')}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rubricColor }} />
      <span style={{ color: rubricColor }}>{rubric.name}</span>
    </Link>
  )
}
