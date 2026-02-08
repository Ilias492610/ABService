const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'logos-world.net' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'slelguoygbfzlpylpxfs.supabase.co' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'abservice24.be' }],
        destination: 'https://www.abservice24.be/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'abservice.be' }],
        destination: 'https://www.abservice24.be/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.abservice.be' }],
        destination: 'https://www.abservice24.be/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/plausible/js/script.js',
        destination: 'https://plausible.io/js/script.js',
      },
      {
        source: '/plausible/api/event',
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
};

module.exports = nextConfig;
