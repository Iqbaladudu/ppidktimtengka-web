import type { CollectionConfig } from 'payload'
import { revalidateCollection } from './hooks/revalidateCollection'

export const Missions: CollectionConfig = {
  slug: 'missions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    group: 'Konten',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollection(['/about', '/'])],
  },
  fields: [
    {
      name: 'title',
      label: 'Judul Misi',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
      required: true,
    },
    {
      name: 'iconName',
      label: 'Nama Icon (Lucide)',
      type: 'select',
      options: [
        { label: 'Users', value: 'Users' },
        { label: 'Compass', value: 'Compass' },
        { label: 'Target', value: 'Target' },
        { label: 'Globe', value: 'Globe' },
        { label: 'Heart', value: 'Heart' },
        { label: 'Sparkles', value: 'Sparkles' },
        { label: 'Zap', value: 'Zap' },
        { label: 'BookOpen', value: 'BookOpen' },
      ],
      required: true,
      admin: {
        description: 'Select the Lucide icon to display.',
      },
    },
    {
      name: 'color',
      label: 'Warna Gradient',
      type: 'select',
      options: [
        { label: 'Blue', value: 'from-blue-500 to-blue-600' },
        { label: 'Cyan/Teal', value: 'from-cyan-500 to-teal-600' },
        { label: 'Emerald/Green', value: 'from-emerald-500 to-green-600' },
        { label: 'Amber/Orange', value: 'from-amber-500 to-orange-600' },
        { label: 'Rose/Pink', value: 'from-rose-500 to-pink-600' },
      ],
      required: true,
    },
    {
      name: 'order',
      label: 'Urutan',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
