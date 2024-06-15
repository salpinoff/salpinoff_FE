import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { AxiosResponse } from 'axios';

import MONSTER_APIS from '@api/monster';
import { GetMonsterResponse } from '@api/monster/types';

export const idAtom = atom('');

export const monsterAtom = atomWithQuery((get) => ({
  retry: 1,
  // gcTime: 1000 * 60 * 10,
  // staleTime: 1000 * 60 * 5,
  enabled: !!get(idAtom),
  queryKey: ['monster', get(idAtom)],
  queryFn: () => MONSTER_APIS.getMonsterById(get(idAtom)),
  select: (data: AxiosResponse<GetMonsterResponse>) => data.data,
}));
