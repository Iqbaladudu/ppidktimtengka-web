import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigasi',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headerMenu',
      label: 'Menu Header',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          label: 'Tipe',
          type: 'select',
          options: [
            { label: 'Link Internal', value: 'internal' },
            { label: 'Link Eksternal', value: 'external' },
            { label: 'Kategori', value: 'category' },
            { label: 'Rubrik', value: 'rubric' },
          ],
          required: true,
          defaultValue: 'internal',
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.type === 'internal' || siblingData?.type === 'external',
          },
        },
        {
          name: 'category',
          label: 'Kategori',
          type: 'relationship',
          relationTo: 'categories',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'category',
          },
        },
        {
          name: 'rubric',
          label: 'Rubrik',
          type: 'relationship',
          relationTo: 'rubrics',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'rubric',
          },
        },
        {
          name: 'openInNewTab',
          label: 'Buka di Tab Baru',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'children',
          label: 'Sub Menu',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
            },
            {
              name: 'category',
              label: 'Kategori',
              type: 'relationship',
              relationTo: 'categories',
            },
          ],
        },
      ],
    },
    {
      name: 'footerMenu',
      label: 'Menu Footer',
      type: 'array',
      fields: [
        {
          name: 'groupLabel',
          label: 'Label Grup',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'footerText',
      label: 'Teks Footer',
      type: 'richText',
    },
  ],
}
