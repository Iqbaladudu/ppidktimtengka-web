import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Umum',
          fields: [
            {
              name: 'siteName',
              label: 'Nama Situs',
              type: 'text',
              required: true,
            },
            {
              name: 'siteDescription',
              label: 'Deskripsi Situs',
              type: 'textarea',
            },
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Media Sosial',
          fields: [
            {
              name: 'socialLinks',
              label: 'Link Media Sosial',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Kontak',
          fields: [
            {
              name: 'contactEmail',
              label: 'Email',
              type: 'email',
            },
            {
              name: 'contactPhone',
              label: 'Telepon',
              type: 'text',
            },
            {
              name: 'contactAddress',
              label: 'Alamat',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'SEO Default',
          fields: [
            {
              name: 'defaultMetaTitle',
              label: 'Default Meta Title',
              type: 'text',
            },
            {
              name: 'defaultMetaDescription',
              label: 'Default Meta Description',
              type: 'textarea',
            },
            {
              name: 'defaultOgImage',
              label: 'Default Open Graph Image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
