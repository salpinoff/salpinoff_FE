import { useMutation } from '@tanstack/react-query';

import { merge } from 'lodash';

import { getQueryClient } from '@utils/query/get-query-client';

import MonsterQueryFactory from '@api/monster/query/factory';

import { updateInteractionCount } from '..';

export const useUpdateInteraction = (id: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ['updateInteractionCount'],
    mutationFn: (interactionCount: number) =>
      updateInteractionCount({
        monsterId: id,
        interactionCount,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(
        MonsterQueryFactory.reference.queryKey,
        (oldData: object) => merge(oldData, data),
      );
    },
    onError(error) {
      console.log(error);
    },
  });
};
