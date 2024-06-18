import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { AxiosResponse } from 'axios';

import { getQueryClient } from '@utils/query';

import MONSTER_APIS from '@api/monster';
import { GetMonsterResponse } from '@api/monster/types';

export const idAtom = atom('');

export const monsterAtom = atomWithQuery<
  AxiosResponse<GetMonsterResponse>,
  unknown,
  GetMonsterResponse
>(
  (get) => ({
    retry: 1,
    staleTime: 1000 * 60 * 5,
    enabled: !!get(idAtom),
    queryKey: ['monster', get(idAtom)],
    queryFn: () => MONSTER_APIS.getMonsterById(get(idAtom)),
    select: (data) => data.data,
  }),
  () => getQueryClient(),
);
