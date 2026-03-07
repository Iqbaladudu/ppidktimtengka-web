import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'
import type { Article } from '../../payload-types'

export const revalidateArticle: CollectionAfterChangeHook<Article> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  try {
    if (doc.status === 'published') {
      revalidatePath(`/artikel/${doc.slug}`)
      revalidatePath('/artikel')
      revalidatePath('/')
      console.log(`[ISR] Revalidated paths for article: ${doc.slug}`)
    }
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/artikel/${previousDoc.slug}`)
    }
  } catch {
    // no-op outside Next.js runtime
  }
  return doc
}
