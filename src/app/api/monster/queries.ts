import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import { AxiosError, AxiosResponse } from 'axios';

import MONSTER_APIS from '.';

import MONSTER_KEYS from './keys';
import {
  GetMonsterResponse,
  ModifyMonsterRequest,
  SendEncouragementRequest,
  UpdateInteractionCountRequest,
  UpdateInteractionCountResponse,
} from './types';

type CustomUseQueryOption<T> = Omit<T, 'queryKey' | 'queryFn'>;

type CustomUseMutationOptions<T> = Omit<T, 'mutationFn'>;

export const useGetMonster = (
  id: string,
  options?: CustomUseQueryOption<
    UseQueryOptions<
      AxiosResponse<GetMonsterResponse>,
      AxiosError,
      GetMonsterResponse,
      ReturnType<typeof MONSTER_KEYS.detail>
    >
  >,
) =>
  useQuery({
    ...(options ?? {}),
    retry: 1,
    enabled: !!id,
    queryKey: MONSTER_KEYS.detail(id),
    queryFn: () => MONSTER_APIS.getMonsterById(id),
    select: (data) => data.data,
  });

export const useSendEncouragement = (
  id: string,
  options?: CustomUseMutationOptions<
    UseMutationOptions<unknown, AxiosError, SendEncouragementRequest>
  >,
) =>
  useMutation({
    ...(options ?? {}),
    mutationFn: (data) => MONSTER_APIS.sendEncouragement(id, data),
  });

export const useModifyMonster = (
  id: string,
  options?: CustomUseMutationOptions<
    UseMutationOptions<unknown, AxiosError, ModifyMonsterRequest>
  >,
) =>
  useMutation({
    ...(options ?? {}),
    mutationFn: (data) => MONSTER_APIS.modifyMonster(id, data),
  });

export const useUpdateInteraction = (
  options?: CustomUseMutationOptions<
    UseMutationOptions<
      UpdateInteractionCountResponse,
      unknown,
      UpdateInteractionCountRequest
    >
  >,
) =>
  useMutation({
    ...(options ?? {}),
    mutationFn: MONSTER_APIS.updateInteractionCount,
  });
