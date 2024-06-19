import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import MONSTER_APIS from '.';

import {
  ModifyMonsterRequest,
  SendEncouragementRequest,
  UpdateInteractionCountRequest,
  UpdateInteractionCountResponse,
} from './types';

export const useSendEncouragement = (
  id: string,
  options?: UseMutationOptions<unknown, AxiosError, SendEncouragementRequest>,
) =>
  useMutation({
    mutationFn: (data) => MONSTER_APIS.sendEncouragement(id, data),
    ...options,
  });

export const useModifyMonster = (
  id: string,
  options?: UseMutationOptions<unknown, AxiosError, ModifyMonsterRequest>,
) =>
  useMutation({
    mutationFn: (data) => MONSTER_APIS.modifyMonster(id, data),
    ...options,
  });

export const useUpdateInteraction = (
  options?: UseMutationOptions<
    UpdateInteractionCountResponse,
    unknown,
    UpdateInteractionCountRequest
  >,
) =>
  useMutation({
    mutationFn: MONSTER_APIS.updateInteractionCount,
    ...options,
  });
