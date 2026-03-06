import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Judul Dokumen',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
    },
    {
      name: 'category',
      label: 'Kategori Dokumen',
      type: 'select',
      options: [
        { label: 'Press Release', value: 'press-release' },
        { label: 'Laporan', value: 'report' },
        { label: 'Surat', value: 'letter' },
        { label: 'Lainnya', value: 'other' },
      ],
      defaultValue: 'other',
    },
  ],
  upload: {
    mimeTypes: ['application/pdf'],
  },
}
