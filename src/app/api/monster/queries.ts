import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import MONSTER_APIS from '.';

import {
  SendEncouragementRequest,
  UpdateInteractionCountRequest,
  UpdateInteractionCountResponse,
} from './types';

export const useSendEncouragement = (
  id: string,
  options?: UseMutationOptions<unknown, unknown, SendEncouragementRequest>,
) =>
  useMutation({
    mutationFn: (data) => MONSTER_APIS.sendEncouragement(id, data),
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
