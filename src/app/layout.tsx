import type { Metadata, Viewport } from 'next';

import { Pretendard } from './utils/fonts';

import '../../build/css/_variables.css';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
