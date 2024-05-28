/* eslint-disable no-console */
const kakaoInit = () => {
  if (typeof window !== 'undefined' && !window.Kakao?.isInitialized())
    window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
};

export const shareToKakao = (url: string) => {
  try {
    kakaoInit();
    window.Kakao?.Share.sendCustom({
      templateId: Number(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
      templateArgs: {
        REGI_WEB_DOMAIN: url,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
