import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const viewport: Viewport = {
    themeColor: '#0f172a',
    width: 'device-width',
    initialScale: 1,
};

const siteUrl = process.env.NODE_ENV === 'production'
    ? 'https://chem-project-five.vercel.app'
    : 'http://localhost:3000';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Interactive Periodic Table | Chemistry Learning Tool',
        template: '%s | Chemistry Project'
    },
    description:
        'A comprehensive digital periodic table for chemistry students. Explore atomic mass, electron configurations, and element properties.',
    keywords: [
        'Chemistry Project',
        'Periodic Table of Elements',
        'Atomic Properties',
        'Chemical Elements Guide',
        'Next.js Chemistry App',
        'Science Education Tool',
        'Interactive Science Project'
    ],
    authors: [{ name: 'Sumit Chauhan' }],
    alternates: {
        canonical: '/', // Prevents duplicate content issues
    },
    openGraph: {
        title: 'Interactive Periodic Table | Chemistry Project',
        description:
            'Detailed chemical element data and interactive table for science students.',
        url: siteUrl,
        siteName: 'Chemistry Periodic Table',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Interactive Periodic Table Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Interactive Periodic Table | Chemistry Learning Tool',
        description: 'Explore the building blocks of the universe with this interactive periodic table.',
        images: ['/og-image.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Interactive Periodic Table',
        description: 'A digital tool to explore chemical elements, atomic masses, and properties.',
        operatingSystem: 'Any',
        applicationCategory: 'EducationApplication',
        browserRequirements: 'requires HTML5 support',
        author: {
            '@type': 'Person',
            name: 'Sumit Chauhan',
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
                <main className="flex-grow">{children}</main>

                <footer className="flex gap-2 justify-center items-center py-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
                    {/* Ensure logo.png actually exists in /public or this will break SEO audits */}
                    <img
                        className="h-5 w-5 invert dark:invert-0"
                        src="/logo.png"
                        alt="Chemistry Project Logo"
                    />
                    <p>
                        © {new Date().getFullYear()} Chemistry Project • Built
                        with Next.js
                    </p>
                </footer>
            </body>
        </html>
    );
}