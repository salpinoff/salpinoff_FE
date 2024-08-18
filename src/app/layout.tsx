import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import { Provider } from 'jotai';

import ModalProvider from '@providers/modal-provider';
import QueryProvider from '@providers/QueryProvider';

import { Pretendard } from '@utils/fonts';

import '../../build/css/_variables.css';
import './globals.css';

import BaseLayout from './layout/BaseLayout';

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: '퇴사몬',
  description: '스트레스 받을 땐, 참지말고 퇴사몬',
  openGraph: {
    siteName: '퇴사몬',
    title: {
      default: '퇴사몬',
      template: '퇴사몬 | %s',
    },
    description: '스트레스 받을 땐, 참지말고 퇴사몬',
    url: process.env.NEXT_PUBLIC_DOMAIN_NAME,
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <body>
        <QueryProvider>
          <Provider>
            <BaseLayout>{children}</BaseLayout>
            <ModalProvider />
          </Provider>
        </QueryProvider>
      </body>
      {/* Kakao SDK for JavaScript - v2.7.2 */}
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
