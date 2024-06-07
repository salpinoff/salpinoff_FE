import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import MONSTER_APIS from '.';

import {
  UpdateInteractionCountRequest,
  UpdateInteractionCountResponse,
} from './types';

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
