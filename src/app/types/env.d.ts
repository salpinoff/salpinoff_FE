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
      AUTH_SECRET: string;
    }
  }
}
