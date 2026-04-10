import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // devIndicators: false
    images: {
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
                hostname: 'images-of-elements.com', // Added this for Nobelium and others
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
