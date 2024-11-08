import { useMutation, useQuery } from '@tanstack/react-query';

import { TypedUseQueryOptions } from '@lukemorales/query-key-factory';
import { AxiosError } from 'axios';
import { merge } from 'lodash';

import { getQueryClient } from '@utils/query/get-query-client';

import { modifyMonster } from '..';

import MonsterQueryFactory from './factory';
import { GetMonsterResponse, ModifyMonsterRequest } from '../types';

type TypedUseQueryOptionsWithoutKeyAndFn<T> = Omit<T, 'queryKey' | 'queryFn'>;

export const useMonster = <Data = GetMonsterResponse>(
  id: string,
  options?: TypedUseQueryOptionsWithoutKeyAndFn<
    TypedUseQueryOptions<typeof MonsterQueryFactory.detail, Data>
  >,
) => {
  return useQuery({
    ...options,
    ...MonsterQueryFactory.detail(id),
    enabled: !!id,
  });
};

export const useModifyMonster = (id: string) => {
  const queryClient = getQueryClient();

  return useMutation<unknown, AxiosError, ModifyMonsterRequest>({
    mutationFn: (data) => modifyMonster(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: MonsterQueryFactory.reference.queryKey,
        exact: true,
      });

      queryClient.setQueryData(
        MonsterQueryFactory.detail(id).queryKey,
        (oldData: object) =>
          merge(oldData, {
            data: variables,
          }),
      );
    },
  });
};
