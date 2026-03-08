import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Palazzio Imóveis - Luxury CRM',
  description: 'Premium Real Estate Management System',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-[#f6f6f8] text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
