const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:7100/graphql', // Proxy to Backend
      },
    ];
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.serpa.cloud',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
