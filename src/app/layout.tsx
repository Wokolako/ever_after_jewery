import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Somuchaura | Haute Gemstones & Diamonds',
  description: 'Consultant and verified ethical gemstone and high-value diamond supplier for independent fine jewellers.',
  openGraph: {
    title: 'Somuchaura | Haute Gemstones & Diamonds',
    description: 'Consultant and verified ethical gemstone and high-value diamond supplier for independent fine jewellers.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#1A1918] antialiased selection:bg-[#2C2A29] selection:text-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
