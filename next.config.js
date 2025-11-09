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
