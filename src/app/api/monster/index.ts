import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

import {
  CreateMonsterRequest,
  CreateMonsterResponse,
  GetMonsterListResponse,
  GetMonsterRefResponse,
  GetMonsterResponse,
  GetMonstersListRequest,
  ModifyMonsterRequest,
  SendEncouragementRequest,
  UpdateInteractionCountRequest,
  UpdateInteractionCountResponse,
} from './types';

const MONSTER_APIS = {
  createMonster: async (data: CreateMonsterRequest) => {
    return apiInstance.post<CreateMonsterResponse>(
      API_URLS.MONSTER.CREATE_MONSTER,
      {
        ...data,
      },
    );
  },

  getMonsterById: async (monsterId: string | number) => {
    const data = await apiInstance.get<GetMonsterResponse>(
      API_URLS.MONSTER.GET_MONSTER_BY_ID(monsterId),
    );

    return data;
  },

  getMonsterList: async ({ page, size }: GetMonstersListRequest) => {
    const data = await apiInstance.get<GetMonsterListResponse>(
      API_URLS.MONSTER.GET_MONSTER_LIST(page, size),
    );

    return data;
  },

  getRefMonster: async () => {
    const data = await apiInstance
      .get<GetMonsterRefResponse>(API_URLS.MONSTER.GET_REF_MONSTER)
      .then((res) => res.data);

    return data;
  },

  modifyMonster: ({ monsterId, content }: ModifyMonsterRequest) => {
    return apiInstance.put(API_URLS.MONSTER.MODIFY_MONSTER(monsterId), {
      content,
    });
  },

  deleteMonster: (monsterId: string | number) => {
    return apiInstance.delete(API_URLS.MONSTER.DELETE_MONSTER(monsterId));
  },

  updateInteractionCount: async ({
    monsterId,
    interactionCount,
  }: UpdateInteractionCountRequest) => {
    const { data } = await apiInstance.post<UpdateInteractionCountResponse>(
      API_URLS.MONSTER.UPDATE_INTERACTION_COUNT(monsterId),
      {
        interactionCount,
      },
    );

    return data;
  },

  sendEncouragement: (
    monsterId: string | number,
    data: SendEncouragementRequest,
  ) => {
    return apiInstance.post(API_URLS.MONSTER.SEND_ENCOURAGEMENT(monsterId), {
      ...data,
    });
  },
};

export default MONSTER_APIS;
