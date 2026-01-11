import type { CollectionConfig } from 'payload'

export const Rubrics: CollectionConfig = {
  slug: 'rubrics',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'template', 'isActive'],
    group: 'Konten',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Rubrik',
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
            if (!value && data?.name) {
              return data.name
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
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
    },
    {
      name: 'color',
      label: 'Warna',
      type: 'text',
      admin: {
        description: 'Kode warna hex (contoh: #10B981)',
      },
    },
    {
      name: 'template',
      label: 'Template',
      type: 'select',
      options: [
        { label: 'Standar', value: 'standard' },
        { label: 'Long-form', value: 'longform' },
        { label: 'Wawancara', value: 'interview' },
        { label: 'Opini', value: 'opinion' },
      ],
      defaultValue: 'standard',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      label: 'Aktif',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
