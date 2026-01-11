import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Category } from '@/payload-types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
  variant?: 'default' | 'solid'
  className?: string
}

export function CategoryBadge({
  category,
  size = 'md',
  variant = 'default',
  className,
}: CategoryBadgeProps) {
  const baseStyles = cn(
    'inline-flex items-center font-medium transition-colors',
    size === 'sm' ? 'rounded px-2 py-0.5 text-xs' : 'rounded-md px-3 py-1 text-sm',
    variant === 'solid'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'bg-primary/10 text-primary hover:bg-primary/20',
    className,
  )

  // Use category color if available
  const style = category.color
    ? {
        backgroundColor: variant === 'solid' ? category.color : `${category.color}20`,
        color: variant === 'solid' ? '#fff' : category.color,
      }
    : undefined

  return (
    <Link href={`/kategori/${category.slug}`} className={baseStyles} style={style}>
      {category.name}
    </Link>
  )
}
