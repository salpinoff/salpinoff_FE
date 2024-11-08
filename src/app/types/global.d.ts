export {};

declare global {
  interface WindowEventMap {
    signout: CustomEvent<{ detail: { type: 'signout' } }>;
  }
  interface Window {
    /* [Kakao JavaScript SDK Reference](https://developers.kakao.com/sdk/reference/js/release/Kakao.html) */
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        cleanup: () => void;
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
