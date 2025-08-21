/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "nomadascolombiatravel.com",
      "cdn.sanity.io",
      // otros dominios
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/galeria',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
