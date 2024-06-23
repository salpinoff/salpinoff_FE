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
} from './types';

export const createMonster = async (data: CreateMonsterRequest) => {
  return apiInstance.post<CreateMonsterResponse>(
    API_URLS.MONSTER.CREATE_MONSTER,
    {
      ...data,
    },
  );
};

export const getMonsterById = async (monsterId: string) => {
  const data = await apiInstance.get<GetMonsterResponse>(
    API_URLS.MONSTER.GET_MONSTER_BY_ID(monsterId),
  );

  return data;
};

export const modifyMonster = (
  monsterId: string,
  data: ModifyMonsterRequest,
) => {
  return apiInstance.put(API_URLS.MONSTER.MODIFY_MONSTER(monsterId), {
    ...data,
  });
};

export const deleteMonster = (monsterId: string) => {
  return apiInstance.delete(API_URLS.MONSTER.DELETE_MONSTER(monsterId));
};

export const getMonsterList = async ({
  page,
  size,
}: GetMonstersListRequest) => {
  const data = await apiInstance.get<GetMonsterListResponse>(
    API_URLS.MONSTER.GET_MONSTER_LIST(page, size),
  );

  return data;
};

export const getRefMonster = async () => {
  const data = await apiInstance
    .get<GetMonsterRefResponse>(API_URLS.MONSTER.GET_REF_MONSTER)
    .then((res) => res.data);

  return data;
};
