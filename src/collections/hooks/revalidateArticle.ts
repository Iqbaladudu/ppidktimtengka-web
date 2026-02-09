import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'
import type { Article } from '../../payload-types'

export const revalidateArticle: CollectionAfterChangeHook<Article> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.status === 'published') {
    // Revalidate individual article page
    revalidatePath(`/artikel/${doc.slug}`)
    
    // Revalidate article list page
    revalidatePath('/artikel')
    
    // Revalidate homepage (since it often has latest articles)
    revalidatePath('/')
    
    console.log(`[ISR] Revalidated paths for article: ${doc.slug}`)
  }

  // If the slug changed, revalidate the old slug too
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    revalidatePath(`/artikel/${previousDoc.slug}`)
  }

  return doc
}
