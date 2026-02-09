import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  allowedDevOrigins: ['192.168.1.8', 'localhost:3000'],
}

if (process.env.R2_PUBLIC_DOMAIN) {
  try {
    const url = new URL(
      process.env.R2_PUBLIC_DOMAIN.startsWith('http')
        ? process.env.R2_PUBLIC_DOMAIN
        : `https://${process.env.R2_PUBLIC_DOMAIN}`,
    )
    nextConfig.images.remotePatterns.push({
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
    })
  } catch {
    // ignore invalid urls
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
