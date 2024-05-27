export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* COMMON */
      NEXT_PUBLIC_DOMAIN_NAME: string;
      NEXT_PUBLIC_API_DOMAIN_NAME: string;

      /* AUTH */
      KAKAO_CALLBACK: string;
      KAKAO_CLIENT_ID: string;

      /* KAKAO SHARE */
      readonly NEXT_PUBLIC_KAKAO_JS_KEY: string;
      readonly NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID: number;
    }
  }
  interface Window {
    /* [Kakao JavaScript SDK Reference](https://developers.kakao.com/sdk/reference/js/release/Kakao.html) */
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendCustom: (settings: {
          templateId: number;
          templateArgs?: object;
          installTalk?: boolean;
          serverCallbackArgs?: object | string;
        }) => void;
      };
    };
  }
}
