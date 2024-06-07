import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { AxiosResponse } from 'axios';

import MONSTER_APIS from '@api/monster';
import { GetMonsterResponse } from '@api/monster/types';

export const idAtom = atom('');

export const monsterAtom = atomWithQuery((get) => ({
  retry: 1,
  queryKey: ['monster', get(idAtom)],
  queryFn: () => MONSTER_APIS.getMonsterById(get(idAtom)),
  select: (data: AxiosResponse<GetMonsterResponse>) => data.data,
}));
