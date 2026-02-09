import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { s3Storage } from '@payloadcms/storage-s3'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { Rubrics } from './collections/Rubrics'
import { Tags } from './collections/Tags'
import { Articles } from './collections/Articles'
import { Programs } from './collections/Programs'
import { Missions } from './collections/Missions'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | PPIDK Timtengka',
    },
  },
  collections: [Users, Media, Authors, Categories, Rubrics, Tags, Articles, Programs, Missions],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        labels: {
          singular: 'Formulir',
          plural: 'Formulir',
        },
        admin: {
          group: 'Konten',
        },
      },
      formSubmissionOverrides: {
        labels: {
          singular: 'Data Masuk',
          plural: 'Data Masuk',
        },
        admin: {
          group: 'Admin',
        },
      },
    }),
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          prefix: 'media',
        },
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
      },
    }),
  ],
})
