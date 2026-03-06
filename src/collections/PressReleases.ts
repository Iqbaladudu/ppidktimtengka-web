import type { CollectionConfig } from 'payload'

export const PressReleases: CollectionConfig = {
  slug: 'press-releases',
  admin: {
    useAsTitle: 'title',
    group: 'Konten',
    defaultColumns: ['title', 'author', 'status', 'publishedAt'],
    listSearchableFields: ['title', 'excerpt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
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
        // Auto-generate slug from title
        if (data?.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
  fields: [
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
        description: 'Ringkasan singkat press release',
      },
    },
    {
      name: 'content',
      label: 'Konten',
      type: 'richText',
      required: true,
    },
    {
      name: 'document',
      label: 'Dokumen PDF',
      type: 'upload',
      relationTo: 'documents',
      admin: {
        description: 'Unggah file PDF press release',
      },
    },
    {
      name: 'featuredImage',
      label: 'Gambar Utama',
      type: 'upload',
      relationTo: 'media',
    },

    // Relationships
    {
      name: 'author',
      label: 'Penulis',
      type: 'relationship',
      relationTo: 'authors',
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

    // Publishing
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
            if (data?.status === 'published' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },

    // SEO
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
            description: 'Kosongkan untuk menggunakan judul',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Kosongkan untuk menggunakan ringkasan',
          },
        },
      ],
    },
  ],
}
