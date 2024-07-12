import { useMutation, useQuery } from '@tanstack/react-query';

import { AxiosError, AxiosResponse } from 'axios';
import { merge } from 'lodash';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import { getQueryClient } from '@utils/query/get-query-client';

import { modifyMonster } from '..';

import MonsterQueryFactory, { MonsterKeys } from './factory';
import { GetMonsterResponse, ModifyMonsterRequest } from '../types';

export const useMonster = (id: string) => {
  return useQuery<
    AxiosResponse<GetMonsterResponse>,
    AxiosError,
    ReturnType<typeof transformMonster<GetMonsterResponse>>,
    MonsterKeys['detail']['queryKey']
  >({
    ...MonsterQueryFactory.detail(id),
    enabled: !!id,
    select: (data) => Adapter.from(data.data).to(transformMonster),
  });
};

export const useModifyMonster = (id: string) => {
  const queryClient = getQueryClient();

  return useMutation<unknown, AxiosError, ModifyMonsterRequest>({
    mutationFn: (data) => modifyMonster(id, data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        MonsterQueryFactory.reference.queryKey,
        (oldData: object) =>
          merge(oldData, {
            data: variables,
          }),
      );
    },
  });
};
