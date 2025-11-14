/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.exercisedb.dev',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig