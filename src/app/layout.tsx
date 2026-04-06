import type { Metadata } from 'next';
import { Playfair_Display, Inter, Montserrat } from 'next/font/google';
import './globals.css';

// Configure fonts
const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800'],
    variable: '--font-playfair',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Fix Website Design | Cinematic Digital Agency Dubai',
    description: 'Premium web studio in Dubai crafting high-performance, conversion-focused websites for luxury brands.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`}>
            <head>
                {/* Font Awesome 6 (already there) */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
            </head>
            <body className="font-sans">{children}</body>
        </html>
    );
}