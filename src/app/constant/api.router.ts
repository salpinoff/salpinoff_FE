const ROUTER = {
  AUTH: {
    SIGNIN: {
      kakao: `/api/auth/signin/kakao`,
    },
    SIGNOUT: {
      kakao: '/api/auth/signout/kakao',
    },
    INITIAL_TOKEN: {
      kakao: `/members/login/kakao`,
    },
    REFRESH_TOKEN: '/members/token/refresh',
    USER_NICKNAME: '/members/my',
  },
};

export default ROUTER;
