const API_BASE = '/api';
const AUTH_BASE = `${API_BASE}/auth`;
const MONSTER_BASE = '/monsters';
const MEMBER_BASE = '/members';

export const API_URLS = {
  AUTH: {
    BASE: {
      CSRF: `${AUTH_BASE}/csrf`,
      SESSION: `${AUTH_BASE}/session`,
      SIGNOUT: `${AUTH_BASE}/signout`,
      SIGNIN: {
        kakao: `${AUTH_BASE}/signin/kakao`,
      },
    },
    API: {
      DELETE_TOKEN: `${MEMBER_BASE}/logout`,
      REFRESH_TOKEN: `${MEMBER_BASE}/token/refresh`,
      USER_NICKNAME: `${MEMBER_BASE}/my`,
      GET_TOKEN: {
        kakao: `${MEMBER_BASE}/login/kakao`,
      },
    },
  },
  MONSTER: {
    CREATE_MONSTER: MONSTER_BASE,
    GET_MONSTER_BY_ID: (monsterId: string) => `${MONSTER_BASE}/${monsterId}`,
    GET_MONSTER_LIST: (page: number, size: number) =>
      `${MONSTER_BASE}/my?page=${page}&size=${size}`,
    GET_REF_MONSTER: `${MONSTER_BASE}/my/rep`,
    MODIFY_MONSTER: (monsterId: string) => `${MONSTER_BASE}/${monsterId}`,
    DELETE_MONSTER: (monsterId: string) => `${MONSTER_BASE}/${monsterId}`,
    UPDATE_INTERACTION_COUNT: (monsterId: string) =>
      `${MONSTER_BASE}/${monsterId}/interactions`,
    SEND_ENCOURAGEMENT: (monsterId: string) =>
      `${MONSTER_BASE}/${monsterId}/encouragement`,
  },
} as const;

export const WITHOUT_AUTH = [
  {
    regexp: new RegExp(`^${API_URLS.AUTH.API.REFRESH_TOKEN}$`, 'g'),
    method: 'all',
  },
  {
    regexp: new RegExp(`^${API_URLS.AUTH.API.GET_TOKEN.kakao}$`, 'g'),
    method: 'post',
  },
  { regexp: /^\/monsters\/\d+$/g, method: 'get' },
  { regexp: /^\/monsters\/\d+\/encouragement$/g, method: 'all' },
];
