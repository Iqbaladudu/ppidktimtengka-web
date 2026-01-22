import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import { faker } from '@faker-js/faker/locale/id_ID'

// Lexical content helpers
function createHeadingNode(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    tag,
    children: [{ type: 'text', text }],
  }
}

function createParagraphNode(text: string) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', text }],
  }
}

function createBoldText(text: string) {
  return { type: 'text', text, format: 1 } // 1 = bold
}

function createItalicText(text: string) {
  return { type: 'text', text, format: 2 } // 2 = italic
}

function createLinkNode(text: string, url: string) {
  return {
    type: 'link',
    url,
    children: [{ type: 'text', text }],
  }
}

function createListNode(items: string[], type: 'bullet' | 'number' = 'bullet') {
  return {
    type: 'list',
    listType: type,
    children: items.map((item) => ({
      type: 'listitem',
      children: [{ type: 'text', text: item }],
    })),
  }
}

function createBlockquoteNode(text: string) {
  return {
    type: 'quote',
    children: [{ type: 'text', text }],
  }
}

function createCodeBlockNode(code: string, language = 'javascript') {
  return {
    type: 'code',
    language,
    children: [{ type: 'text', text: code }],
  }
}

// Generate rich Lexical content for testing
function generateRichContent() {
  const loremParagraphs = () => faker.lorem.paragraphs(2)

  // Helper to add required node fields
  const node = (obj: Record<string, unknown>) => ({
    ...obj,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })

  const textNode = (text: string, format = 0) => ({
    type: 'text',
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  })

  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [
        // Introduction paragraph with mixed formatting
        node({
          type: 'paragraph',
          textFormat: 0,
          children: [
            textNode(faker.lorem.sentence() + ' '),
            textNode(faker.lorem.words(3), 1), // bold
            textNode(' ' + faker.lorem.sentence() + ' '),
            textNode(faker.lorem.words(2), 2), // italic
            textNode('. ' + faker.lorem.paragraph()),
          ],
        }),

        // Heading 2
        node({
          type: 'heading',
          tag: 'h2',
          children: [textNode(faker.lorem.sentence(4))],
        }),

        // Regular paragraph
        node({
          type: 'paragraph',
          textFormat: 0,
          children: [textNode(loremParagraphs())],
        }),

        // Blockquote
        node({
          type: 'quote',
          children: [textNode(`"${faker.lorem.sentence()}" — ${faker.person.fullName()}`)],
        }),

        // Another heading
        node({
          type: 'heading',
          tag: 'h2',
          children: [textNode(faker.lorem.sentence(3))],
        }),

        node({
          type: 'paragraph',
          textFormat: 0,
          children: [textNode(faker.lorem.paragraph())],
        }),

        // Bullet list
        node({
          type: 'list',
          listType: 'bullet',
          start: 1,
          tag: 'ul',
          children: [
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence(),
          ].map((item) =>
            node({
              type: 'listitem',
              value: 1,
              children: [textNode(item)],
            }),
          ),
        }),

        node({
          type: 'paragraph',
          textFormat: 0,
          children: [textNode(faker.lorem.paragraph())],
        }),

        // Heading 3
        node({
          type: 'heading',
          tag: 'h3',
          children: [textNode(faker.lorem.sentence(3))],
        }),

        node({
          type: 'paragraph',
          textFormat: 0,
          children: [textNode(loremParagraphs())],
        }),

        // Numbered list
        node({
          type: 'list',
          listType: 'number',
          start: 1,
          tag: 'ol',
          children: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()].map(
            (item, idx) =>
              node({
                type: 'listitem',
                value: idx + 1,
                children: [textNode(item)],
              }),
          ),
        }),

        // Final heading
        node({
          type: 'heading',
          tag: 'h2',
          children: [textNode('Kesimpulan')],
        }),

        node({
          type: 'paragraph',
          textFormat: 0,
          children: [textNode(loremParagraphs())],
        }),

        // Final paragraph
        node({
          type: 'paragraph',
          textFormat: 0,
          children: [textNode('Untuk informasi lebih lanjut, hubungi tim redaksi.')],
        }),
      ],
    },
  }
}

async function seed() {
  console.log('🌱 Starting seed...')

  const payload = await getPayload({ config: await config })

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await payload.delete({ collection: 'articles', where: {} })
  await payload.delete({ collection: 'authors', where: {} })
  await payload.delete({ collection: 'categories', where: {} })
  await payload.delete({ collection: 'rubrics', where: {} })
  await payload.delete({ collection: 'tags', where: {} })
  await payload.delete({ collection: 'forms', where: {} })
  await payload.delete({ collection: 'form-submissions', where: {} })

  // Seed Contact Form
  console.log('📝 Creating contact form...')
  const contactForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Hubungi Kami',
      fields: [
        {
          name: 'name',
          label: 'Nama',
          required: true,
          blockType: 'text',
        },
        {
          name: 'email',
          label: 'Email',
          required: true,
          blockType: 'email',
        },
        {
          name: 'subject',
          label: 'Judul pesan',
          required: true,
          blockType: 'text',
        },
        {
          name: 'message',
          label: 'Isi Pesan',
          required: true,
          blockType: 'textarea',
        },
      ],
      submitButtonLabel: 'Kirim',
      confirmationType: 'message',
      confirmationMessage: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Terima kasih, pesan anda akan segera kami balas.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
          ],
          direction: null,
        },
      },
    },
  })
  console.log(`  ✓ Created form with ID: ${contactForm.id}`)

  // Seed Site Settings
  console.log('⚙️ Updating site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'PPIDK Timtengka',
      siteDescription: 'Sinergi Pelajar Indonesia Timur Tengah & Afrika',
      contactEmail: 'info@ppdktimtengka.org',
      contactPhone: '+62 812 3456 7890',
      contactAddress: 'Kairo, Mesir',
      contactFormId: String(contactForm.id),
    },
  })
  console.log('  ✓ Updated site settings')

  // Seed Authors
  console.log('👤 Creating authors...')
  const authorData = [
    { name: 'Ahmad Fauzi', role: 'editor' as const },
    { name: 'Siti Nurhaliza', role: 'journalist' as const },
    { name: 'Budi Santoso', role: 'columnist' as const },
    { name: 'Dewi Lestari', role: 'contributor' as const },
    { name: 'Rizky Pratama', role: 'journalist' as const },
  ]

  const authors = await Promise.all(
    authorData.map((author) =>
      payload.create({
        collection: 'authors',
        data: {
          name: author.name,
          slug: author.name.toLowerCase().replace(/\s+/g, '-'),
          email: faker.internet.email({ firstName: author.name.split(' ')[0] }),
          role: author.role,
          isActive: true,
          socialLinks: [
            { platform: 'twitter', url: `https://twitter.com/${faker.internet.username()}` },
            { platform: 'instagram', url: `https://instagram.com/${faker.internet.username()}` },
          ],
        },
      }),
    ),
  )
  console.log(`  ✓ Created ${authors.length} authors`)

  // Seed Categories
  console.log('📁 Creating categories...')
  const categoryData = [
    { name: 'Berita', color: '#3B82F6', description: 'Berita terkini dan aktual' },
    { name: 'Pendidikan', color: '#10B981', description: 'Informasi seputar pendidikan' },
    { name: 'Budaya', color: '#F59E0B', description: 'Budaya dan tradisi Indonesia' },
    { name: 'Opini', color: '#8B5CF6', description: 'Opini dan pandangan' },
    { name: 'Kegiatan', color: '#EC4899', description: 'Kegiatan organisasi' },
    { name: 'Teknologi', color: '#06B6D4', description: 'Teknologi dan inovasi' },
  ]

  const categories = await Promise.all(
    categoryData.map((cat, idx) =>
      payload.create({
        collection: 'categories',
        data: {
          name: cat.name,
          slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
          description: cat.description,
          color: cat.color,
          order: idx,
          isActive: true,
        },
      }),
    ),
  )
  console.log(`  ✓ Created ${categories.length} categories`)

  // Seed Rubrics
  console.log('📰 Creating rubrics...')
  const rubricData = [
    { name: 'Berita Utama', template: 'standard' as const, color: '#EF4444' },
    { name: 'Feature', template: 'longform' as const, color: '#3B82F6' },
    { name: 'Wawancara', template: 'interview' as const, color: '#10B981' },
    { name: 'Kolom', template: 'opinion' as const, color: '#8B5CF6' },
  ]

  const rubrics = await Promise.all(
    rubricData.map((rub) =>
      payload.create({
        collection: 'rubrics',
        data: {
          name: rub.name,
          slug: rub.name.toLowerCase().replace(/\s+/g, '-'),
          template: rub.template,
          color: rub.color,
          isActive: true,
        },
      }),
    ),
  )
  console.log(`  ✓ Created ${rubrics.length} rubrics`)

  // Seed Tags
  console.log('🏷️  Creating tags...')
  const tagNames = [
    'PPIDK',
    'Mahasiswa',
    'Indonesia',
    'Timur Tengah',
    'Kuliah',
    'Beasiswa',
    'Komunitas',
    'Event',
    'Workshop',
    'Seminar',
  ]

  const tags = await Promise.all(
    tagNames.map((name) =>
      payload.create({
        collection: 'tags',
        data: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
        },
      }),
    ),
  )
  console.log(`  ✓ Created ${tags.length} tags`)

  // Seed Articles
  console.log('📝 Creating articles...')

  const articleTitles = [
    'Mahasiswa Indonesia Raih Prestasi di Kompetisi Internasional',
    'Workshop Kewirausahaan untuk Diaspora Indonesia',
    'Menjaga Identitas Budaya di Negeri Orang',
    'Tips Sukses Kuliah di Luar Negeri',
    'Peran Komunitas dalam Mendukung Mahasiswa Baru',
    'Inovasi Teknologi dari Anak Bangsa',
    'Membangun Jaringan Profesional di Timur Tengah',
    'Cerita Inspiratif: Dari Beasiswa hingga Karir Cemerlang',
    'Kuliner Indonesia yang Dirindukan di Perantauan',
    'Kolaborasi Lintas Negara untuk Kemajuan Bersama',
    'Panduan Lengkap Mengurus Visa Pelajar',
    'Kegiatan Ramadhan Bersama Komunitas Indonesia',
  ]

  const statuses = ['published', 'published', 'published', 'published', 'draft'] as const

  for (let i = 0; i < articleTitles.length; i++) {
    const title = articleTitles[i]
    const author = authors[Math.floor(Math.random() * authors.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const rubric = rubrics[Math.floor(Math.random() * rubrics.length)]
    const articleTags = faker.helpers.arrayElements(tags, { min: 2, max: 4 })
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    const publishedAt =
      status === 'published' ? faker.date.recent({ days: 30 }).toISOString() : undefined

    await payload.create({
      collection: 'articles',
      draft: false,
      data: {
        title,
        slug: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        excerpt: faker.lorem.paragraph(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: generateRichContent() as any,
        author: author.id,
        categories: [category.id],
        rubric: rubric.id,
        tags: articleTags.map((t) => t.id),
        status,
        publishedAt,
        isFeatured: i < 3, // First 3 are featured
        isHeadline: i === 0, // First one is headline
        viewCount: faker.number.int({ min: 10, max: 5000 }),
        readingTime: faker.number.int({ min: 3, max: 15 }),
      },
    })

    console.log(`  ✓ Created article: "${title.substring(0, 40)}..."`)
  }

  console.log('\n✅ Seed completed successfully!')
  console.log(`
📊 Summary:
   - Authors: ${authors.length}
   - Categories: ${categories.length}
   - Rubrics: ${rubrics.length}
   - Tags: ${tags.length}
   - Articles: ${articleTitles.length}
  `)

  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
