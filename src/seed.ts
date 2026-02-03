import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import { faker } from '@faker-js/faker/locale/id_ID'
import path from 'path'
import fs from 'fs'

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

// Generate SVG Buffer
function generateSvgBuffer(text: string, color: string) {
  const svg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`
  return Buffer.from(svg)
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
  await payload.delete({ collection: 'media', where: {} })
  await payload.delete({ collection: 'missions', where: {} })
  await payload.delete({ collection: 'programs', where: {} })

  // Seed Media
  console.log('🖼️  Creating media...')
  const mediaItems = []
  const colors = ['#1a365d', '#2d3748', '#2c5282', '#276749', '#c53030', '#b7791f']
  
  for (let i = 0; i < 10; i++) {
    const color = colors[i % colors.length]
    const text = `Sample Image ${i + 1}`
    const buffer = generateSvgBuffer(text, color)
    
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: text,
        caption: `This is a caption for ${text}`,
        category: 'photo',
      },
      file: {
        data: buffer,
        mimetype: 'image/svg+xml',
        name: `sample-${i + 1}.svg`,
        size: buffer.length,
      },
    })
    mediaItems.push(media)
  }
  console.log(`  ✓ Created ${mediaItems.length} media items`)

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

  // Seed Missions
  console.log('🎯 Creating missions...')
  const missionData = [
    {
      title: 'Kemandirian Ekonomi',
      description: 'Menciptakan ekosistem ekonomi yang mandiri bagi pelajar Indonesia di kawasan Timur Tengah dan Afrika melalui pelatihan kewirausahaan dan pemberdayaan potensi lokal.',
      iconName: 'Compass',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Prestasi Akademik',
      description: 'Mendorong peningkatan kualitas akademik mahasiswa Indonesia melalui program bimbingan, seminar internasional, dan publikasi karya ilmiah.',
      iconName: 'BookOpen',
      color: 'from-cyan-500 to-teal-600',
    },
    {
      title: 'Jaringan Global',
      description: 'Memperluas jaringan kerjasama antar pelajar dan institusi di kawasan Timur Tengah, Afrika, dan Indonesia untuk kolaborasi yang berkelanjutan.',
      iconName: 'Globe',
      color: 'from-emerald-500 to-green-600',
    },
    {
      title: 'Pengabdian Sosial',
      description: 'Mengimplementasikan nilai-nilai kepedulian sosial melalui program kemanusiaan dan pemberdayaan masyarakat di negara tempat studi.',
      iconName: 'Heart',
      color: 'from-rose-500 to-pink-600',
    },
  ] as const

  const missions = await Promise.all(
    missionData.map((mission, idx) =>
      payload.create({
        collection: 'missions',
        data: {
          ...mission,
          order: idx + 1,
        },
      }),
    ),
  )
  console.log(`  ✓ Created ${missions.length} missions`)

  // Seed Programs
  console.log('📅 Creating programs...')
  const programData = [
    {
      title: 'Simposium Kawasan Timtengka',
      description: 'Pertemuan tahunan pelajar Indonesia se-Timur Tengah dan Afrika untuk membahas isu-isu strategis kawasan dan peran pelajar.',
      emoji: '🌍',
      category: 'Networking',
      schedule: 'Tahunan (Juli)',
      attendees: '500+',
      color: 'from-blue-500 to-blue-600',
      featured: true,
    },
    {
      title: 'Timtengka Career Fair',
      description: 'Bursa kerja khusus bagi lulusan Timur Tengah dan Afrika yang menghubungkan alumni dengan perusahaan multinasional.',
      emoji: '💼',
      category: 'Karir',
      schedule: 'Tahunan (Desember)',
      attendees: '1000+',
      color: 'from-purple-500 to-violet-600',
      featured: true,
    },
    {
      title: 'Kajian Strategis Online',
      description: 'Diskusi rutin bulanan membahas dinamika politik dan sosial di kawasan Timur Tengah bersama pakar.',
      emoji: '📚',
      category: 'Literasi',
      schedule: 'Bulanan',
      attendees: '200+',
      color: 'from-emerald-500 to-teal-600',
      featured: false,
    },
    {
      title: 'Timtengka Peduli',
      description: 'Program penggalangan dana dan bantuan sosial untuk masyarakat yang membutuhkan di kawasan konflik.',
      emoji: '🤝',
      category: 'Sosial',
      schedule: 'Insidental',
      attendees: 'Donatur & Relawan',
      color: 'from-red-500 to-rose-600',
      featured: true,
    },
  ] as const

  const programs = await Promise.all(
    programData.map((prog) =>
      payload.create({
        collection: 'programs',
        data: prog,
      }),
    ),
  )
  console.log(`  ✓ Created ${programs.length} programs`)

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
    { name: 'Berita', color: '#3B82F6', description: 'Berita terkini dan aktual dari kawasan' },
    { name: 'Pendidikan', color: '#10B981', description: 'Informasi beasiswa dan kampus' },
    { name: 'Budaya', color: '#F59E0B', description: 'Ragam budaya Indonesia dan Timur Tengah' },
    { name: 'Opini', color: '#8B5CF6', description: 'Buah pemikiran pelajar Indonesia' },
    { name: 'Kajian', color: '#EC4899', description: 'Analisis mendalam isu strategis' },
    { name: 'Teknologi', color: '#06B6D4', description: 'Inovasi dan perkembangan digital' },
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
    { name: 'Laporan Utama', template: 'standard' as const, color: '#EF4444' },
    { name: 'Sosok', template: 'interview' as const, color: '#3B82F6' },
    { name: 'Catatan Kairo', template: 'opinion' as const, color: '#10B981' },
    { name: 'Resensi Buku', template: 'standard' as const, color: '#8B5CF6' },
    { name: 'Jelajah', template: 'longform' as const, color: '#F59E0B' },
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
    'Mesir',
    'Arab Saudi',
    'Turki',
    'Yaman',
    'Sudan',
    'Maroko',
    'Mahasiswa',
    'Beasiswa',
    'Diplomasi',
    'Sejarah',
    'Sastra',
    'Ekonomi Syariah',
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
    'Diplomasi Kuliner: Memperkenalkan Masakan Nusantara di Kairo',
    'Jejak Ulama Nusantara di Tanah Haram: Sebuah Napak Tilas',
    'Tantangan Mahasiswa Indonesia Menghadapi Musim Dingin di Ankara',
    'Peluang Ekonomi Syariah di Afrika Utara: Perspektif Mahasiswa',
    'Festival Budaya Indonesia Pukau Ribuan Warga Khartoum',
    'Wawancara Eksklusif: Dubes RI untuk Mesir Bicara Soal Pendidikan',
    'Tips Lolos Seleksi Beasiswa Timur Tengah Tahun Ini',
    'Membangun Startup di Negeri Piramida: Kisah Sukses Alumni',
    'Peran PPI dalam Menjaga Kondusivitas WNI di Wilayah Konflik',
    'Review Buku: "Menemukan Kembali Islam yang Hilang"',
    'Puasa di Negeri Orang: Rindu Kolak dan Suara Bedug',
    'Sinergi Pelajar ASEAN di Madinah: Menguatkan Ukhuwah',
    'Mengenal Lebih Dekat Arsitektur Islam di Maroko',
    'Geliat Literasi Mahasiswa Indonesia di Yaman',
    'Catatan Perjalanan: Menembus Padang Pasir Sahara',
  ]

  const statuses = ['published', 'published', 'published', 'published', 'draft'] as const

  for (let i = 0; i < articleTitles.length; i++) {
    const title = articleTitles[i]
    const author = authors[Math.floor(Math.random() * authors.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const rubric = rubrics[Math.floor(Math.random() * rubrics.length)]
    const articleTags = faker.helpers.arrayElements(tags, { min: 2, max: 4 })
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const featuredImage = mediaItems[i % mediaItems.length] // Rotate through media items

    const publishedAt =
      status === 'published' ? faker.date.recent({ days: 60 }).toISOString() : undefined

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
        featuredImage: featuredImage.id,
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
   - Media: ${mediaItems.length}
   - Missions: ${missions.length}
   - Programs: ${programs.length}
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
