'use client';

import Script from 'next/script';

import { GoogleTagManager } from '@next/third-parties/google';

function Scripts() {
  return (
    <>
      {/* Kakao SDK for JavaScript - v2.7.2 */}
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        strategy="afterInteractive"
      />
      <GoogleTagManager gtmId="GTM-NHPRKRL6" />
    </>
  );
}

export default Scripts;
