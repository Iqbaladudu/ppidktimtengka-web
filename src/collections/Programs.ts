import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'schedule', 'featured'],
    group: 'Konten',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Nama Program',
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
      name: 'emoji',
      label: 'Emoji',
      type: 'text',
      admin: {
        description: 'Emoji icon for the program (e.g., 💼)',
      },
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      options: [
        { label: 'Karir', value: 'Karir' },
        { label: 'Evaluasi', value: 'Evaluasi' },
        { label: 'Penghargaan', value: 'Penghargaan' },
        { label: 'Kaderisasi', value: 'Kaderisasi' },
        { label: 'Minat Bakat', value: 'Minat Bakat' },
        { label: 'Literasi', value: 'Literasi' },
        { label: 'Keagamaan', value: 'Keagamaan' },
        { label: 'Informasi', value: 'Informasi' },
        { label: 'Networking', value: 'Networking' },
        { label: 'Sosial', value: 'Sosial' },
      ],
      required: true,
    },
    {
      name: 'schedule',
      label: 'Jadwal',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., Tahunan (Oktober), Mingguan',
      },
    },
    {
      name: 'attendees',
      label: 'Estimasi Peserta',
      type: 'text',
      admin: {
        description: 'e.g., 2000+',
      },
    },
    {
      name: 'color',
      label: 'Warna Gradient',
      type: 'select',
      options: [
        { label: 'Blue', value: 'from-blue-500 to-blue-600' },
        { label: 'Purple', value: 'from-purple-500 to-violet-600' },
        { label: 'Amber/Orange', value: 'from-amber-500 to-orange-600' },
        { label: 'Emerald/Teal', value: 'from-emerald-500 to-teal-600' },
        { label: 'Pink/Rose', value: 'from-pink-500 to-rose-600' },
        { label: 'Cyan/Blue', value: 'from-cyan-500 to-blue-600' },
        { label: 'Green/Emerald', value: 'from-green-500 to-emerald-600' },
        { label: 'Indigo/Purple', value: 'from-indigo-500 to-purple-600' },
        { label: 'Slate', value: 'from-slate-500 to-slate-600' },
        { label: 'Red/Rose', value: 'from-red-500 to-rose-600' },
      ],
      defaultValue: 'from-blue-500 to-blue-600',
    },
    {
      name: 'featured',
      label: 'Program Unggulan',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
