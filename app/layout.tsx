// app/layout.tsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Resume Match',
    description: 'AI-powered resume generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <style>{`
                    @media print {
                        @page { margin: 0; }
                        body { margin: 0; }
                    }
                `}</style>
            </head>
            <body className={`${inter.className} print:!p-0 print:!m-0`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <UserProvider>{children}</UserProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
