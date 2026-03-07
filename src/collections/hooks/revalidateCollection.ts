import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

/**
 * A generalized hook to revalidate paths after data changes.
 * Can be used for both Collections and Globals.
 */
export const revalidateCollection = (
  paths: string[] = ['/'],
  revalidateLayout = false
): CollectionAfterChangeHook | GlobalAfterChangeHook => {
  return ({ doc, req: { payload } }) => {
    try {
      paths.forEach((path) => {
        if (revalidateLayout) {
          revalidatePath(path, 'layout')
        } else {
          revalidatePath(path)
        }
      })
      console.log(`[ISR] Revalidated paths: ${paths.join(', ')}`)
    } catch {
      // revalidatePath is a no-op outside of Next.js runtime (e.g. seed scripts)
    }
    return doc
  }
}

/**
 * Specific hook for items with slugs (Authors, Categories, etc.)
 */
export const revalidateWithSlug = (basePath: string): CollectionAfterChangeHook => {
  return ({ doc, previousDoc }) => {
    try {
      if (doc.slug) {
        revalidatePath(`${basePath}/${doc.slug}`)
      }
      if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
        revalidatePath(`${basePath}/${previousDoc.slug}`)
      }
      revalidatePath(basePath)
      revalidatePath('/')
      console.log(`[ISR] Revalidated slug-based paths for: ${doc.slug || doc.id}`)
    } catch {
      // no-op outside Next.js runtime
    }
    return doc
  }
}
