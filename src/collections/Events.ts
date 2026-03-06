import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    group: 'Konten',
    defaultColumns: ['title', 'eventType', 'eventDate', 'status', 'isFeatured'],
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
      label: 'Nama Acara',
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
      name: 'eventType',
      label: 'Jenis Acara',
      type: 'select',
      required: true,
      options: [
        { label: 'Webinar', value: 'webinar' },
        { label: 'Talk Show', value: 'talkshow' },
        { label: 'Seminar', value: 'seminar' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Konferensi', value: 'conference' },
        { label: 'Lainnya', value: 'other' },
      ],
      defaultValue: 'webinar',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      label: 'Ringkasan',
      type: 'textarea',
      admin: {
        description: 'Ringkasan singkat acara untuk preview',
      },
    },
    {
      name: 'description',
      label: 'Keterangan',
      type: 'richText',
      required: true,
    },

    // Date & Time
    {
      name: 'eventDate',
      label: 'Waktu Mulai',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Tanggal dan jam mulai acara',
      },
    },
    {
      name: 'eventEndDate',
      label: 'Waktu Selesai',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Tanggal dan jam selesai (opsional)',
      },
    },

    // Registration
    {
      name: 'registrationLink',
      label: 'Link Pendaftaran',
      type: 'text',
      admin: {
        description: 'URL formulir pendaftaran (Google Form, Eventbrite, dll)',
      },
    },

    // Images
    {
      name: 'featuredImage',
      label: 'Gambar Utama',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      label: 'Galeri Gambar',
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
      admin: {
        description: 'Poster, flyer, atau dokumentasi acara',
      },
    },

    // Documents
    {
      name: 'documents',
      label: 'Dokumen',
      type: 'array',
      fields: [
        {
          name: 'document',
          label: 'File PDF',
          type: 'upload',
          relationTo: 'documents',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          admin: {
            description: 'Contoh: Booklet, Materi, Rundown',
          },
        },
      ],
      admin: {
        description: 'Booklet, materi presentasi, atau dokumen lainnya',
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
      name: 'isFeatured',
      label: 'Acara Unggulan',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
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
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          label: 'Open Graph Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
