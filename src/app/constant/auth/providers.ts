const KakaoProvider = {
  id: 'kakao',
  clientId: process.env.KAKAO_CLIENT_ID,
  redirectUrl: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${process.env.KAKAO_CALLBACK}`,
  authorization: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN_NAME}${process.env.KAKAO_CALLBACK}&response_type=code`,
};

const providers = [KakaoProvider];

export { providers, KakaoProvider };
