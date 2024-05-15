import { requestAuthentication, requestKakaoUserInfo } from '@api/auth/kakao';

const KakaoProvider = {
  id: 'kakao',
  clientId: process.env.KAKAO_CLIENT_ID,
  redirectUrl: `${process.env.DOMAIN_NAME}${process.env.KAKAO_CALLBACK}`,
  token: 'https://kauth.kakao.com/oauth/token',
  userInfo: 'https://kapi.kakao.com/v2/user/me',
  authorization: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.DOMAIN_NAME}${process.env.KAKAO_CALLBACK}&response_type=code`,
  async authentication(code: string) {
    return requestAuthentication({
      code,
      path: this.token,
      clientId: this.clientId,
      redirectUrl: this.redirectUrl,
    }).then(({ data: { access_token: accessToken } }) => {
      return requestKakaoUserInfo({ path: this.userInfo, accessToken });
    });
  },
};

const providers = [KakaoProvider];

export { providers, KakaoProvider };
