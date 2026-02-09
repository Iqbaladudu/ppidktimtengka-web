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
    paths.forEach((path) => {
      if (revalidateLayout) {
        // Revalidate the entire layout tree if needed (for global changes)
        revalidatePath(path, 'layout')
      } else {
        revalidatePath(path)
      }
    })

    console.log(`[ISR] Revalidated paths: ${paths.join(', ')}`)
    return doc
  }
}

/**
 * Specific hook for items with slugs (Authors, Categories, etc.)
 */
export const revalidateWithSlug = (basePath: string): CollectionAfterChangeHook => {
  return ({ doc, previousDoc }) => {
    // Revalidate the specific item page
    if (doc.slug) {
      revalidatePath(`${basePath}/${doc.slug}`)
    }
    
    // Revalidate the old slug if it changed
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`${basePath}/${previousDoc.slug}`)
    }

    // Usually also want to revalidate the list page or homepage
    revalidatePath(basePath)
    revalidatePath('/')

    console.log(`[ISR] Revalidated slug-based paths for: ${doc.slug || doc.id}`)
    return doc
  }
}
