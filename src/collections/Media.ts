import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Konten',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      label: 'Keterangan',
      type: 'textarea',
    },
    {
      name: 'credit',
      label: 'Kredit/Sumber',
      type: 'text',
      admin: {
        description: 'Nama fotografer atau sumber gambar',
      },
    },
    {
      name: 'category',
      label: 'Kategori Media',
      type: 'select',
      options: [
        { label: 'Foto', value: 'photo' },
        { label: 'Infografis', value: 'infographic' },
        { label: 'Ilustrasi', value: 'illustration' },
      ],
      defaultValue: 'photo',
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'featured',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
  },
}
