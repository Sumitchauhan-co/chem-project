import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    compress: true,
    
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'en.wikipedia.org',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images-of-elements.com',
                pathname: '**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'react-icons'],
    },
};

export default nextConfig;