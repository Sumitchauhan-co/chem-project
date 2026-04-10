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

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NODE_ENV === 'production'
            ? 'https://your-chemistry-project.vercel.app' //
            : 'http://localhost:3000',
    ),
    title: 'Interactive Periodic Table | Chemistry Learning Tool',
    description:
        'A comprehensive digital periodic table for chemistry students. Explore atomic mass, electron configurations, and element properties in real-time.',
    keywords: [
        'Chemistry Project',
        'Periodic Table of Elements',
        'Atomic Properties',
        'Chemical Elements Guide',
        'Next.js Chemistry App',
        'Science Education Tool',
    ],
    authors: [{ name: 'Sumit Chauhan' }],

    openGraph: {
        title: 'Interactive Periodic Table | Chemistry Project',
        description:
            'Detailed chemical element data and interactive table for science students.',
        type: 'website',
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
        '@type': 'EducationalOccupationalCredential',
        name: 'Interactive Periodic Table',
        description:
            'An interactive tool to study chemical elements and their properties.',
        educationalLevel: 'University',
        teaches: 'Chemistry and Atomic Physics',
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

                <footer className="py-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
                    <p>
                        © {new Date().getFullYear()} Chemistry Project • Built
                        with Next.js
                    </p>
                </footer>
            </body>
        </html>
    );
}
