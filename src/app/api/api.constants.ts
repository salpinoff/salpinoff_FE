export const API_URLS = {
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
  },
};
