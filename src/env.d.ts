export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* COMMON */
      DOMAIN_NAME: string;

      /* AUTH */
      KAKAO_CALLBACK: string;
      KAKAO_CLIENT_ID: string;
    }
  }
}
