/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['i.imgur.com'] 
  },
  webpack: (config, { isServer }) => {
    // Remove the problematic babel plugin
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    });

    // Fix cache configuration
    const path = require('path');
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(__dirname, '.next/cache'),
      maxAge: 31536000000, // 1 year
      compression: 'gzip',
      name: isServer ? 'server' : 'client',
      version: '1.0.0'
    };

    return config;
  },
  // Add experimental features to optimize loading
  experimental: {
    optimizeFonts: true,
    optimizePackageImports: ['lucide-react'],
    scrollRestoration: true,
  },
  // Add page configurations
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Add font optimization
  optimizeFonts: true,
};

module.exports = nextConfig;