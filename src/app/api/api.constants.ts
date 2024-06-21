export const API_URLS = {
  AUTH: {
    BASE: {
      SESSION: '/api/auth/session',
      SIGNOUT: '/api/auth/signout',
      SIGNIN: {
        kakao: `/api/auth/signin/kakao`,
      },
    },
    API: {
      DELETE_TOKEN: `/members/logout`,
      REFRESH_TOKEN: '/members/token/refresh',
      USER_NICKNAME: '/members/my',
      GET_TOKEN: {
        kakao: `/members/login/kakao`,
      },
    },
  },
  MONSTER: {
    CREATE_MONSTER: '/monsters',
    GET_MONSTER_BY_ID: (monsterId: string | number) => `/monsters/${monsterId}`,
    GET_MONSTER_LIST: (page: number, size: number) =>
      `/monsters/my?page=${page}&size=${size}`,
    GET_REF_MONSTER: '/monsters/my/rep',
    MODIFY_MONSTER: (monsterId: string | number) => `/monsters/${monsterId}`,
    DELETE_MONSTER: (monsterId: string | number) => `/monsters/${monsterId}`,
    UPDATE_INTERACTION_COUNT: (monsterId: string | number) =>
      `/monsters/${monsterId}/interactions`,
    SEND_ENCOURAGEMENT: (monsterId: string | number) =>
      `/monsters/${monsterId}/encouragement`,
  },
};
