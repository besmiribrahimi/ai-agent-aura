import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kosova Digital • Dyqani i Pajisjeve Elektronike & AI Inbox (Prishtinë)',
  description: 'Dyqani kryesor i pajisjeve elektronike origjinale me garanci në Prishtinë, Kosovë. Këste 0% dhe triazhim i menjëhershëm me AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAFBFD] text-slate-900 antialiased min-h-screen selection:bg-slate-900 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
