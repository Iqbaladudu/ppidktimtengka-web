import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'publishedAt', 'isFeatured'],
    listSearchableFields: ['title', 'excerpt'],
  },
  access: {
    read: ({ req }) => {
      // Allow admin users to read all articles
      if (req.user) return true
      // Public can only read published articles
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Calculate reading time based on content
        if (data?.content) {
          const plainText = JSON.stringify(data.content)
          const wordCount = plainText.split(/\s+/).length
          const readingTime = Math.ceil(wordCount / 200) // Average reading speed
          data.readingTime = readingTime
        }
        return data
      },
    ],
  },
  fields: [
    // Main content fields
    {
      name: 'title',
      label: 'Judul',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      label: 'Ringkasan',
      type: 'textarea',
      admin: {
        description: 'Ringkasan singkat artikel untuk preview',
      },
    },
    {
      name: 'content',
      label: 'Konten',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      label: 'Gambar Utama',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      label: 'Galeri Foto',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Gambar',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Keterangan',
          type: 'text',
        },
      ],
    },

    // Relationships
    {
      name: 'author',
      label: 'Penulis',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      label: 'Kategori',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'rubric',
      label: 'Rubrik',
      type: 'relationship',
      relationTo: 'rubrics',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    // Publishing fields
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Terbit', value: 'published' },
        { label: 'Arsip', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      label: 'Tanggal Terbit',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            // Auto-set publishedAt when status changes to published
            if (data?.status === 'published' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'isFeatured',
      label: 'Artikel Unggulan',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isHeadline',
      label: 'Berita Utama',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },

    // Analytics
    {
      name: 'viewCount',
      label: 'Jumlah Dilihat',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'readingTime',
      label: 'Waktu Baca (menit)',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },

    // SEO fields
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
          admin: {
            description: 'Kosongkan untuk menggunakan judul artikel',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Kosongkan untuk menggunakan ringkasan artikel',
          },
        },
        {
          name: 'ogImage',
          label: 'Open Graph Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Kosongkan untuk menggunakan gambar utama',
          },
        },
      ],
    },
  ],
}
