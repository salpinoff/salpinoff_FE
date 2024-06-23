import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

import {
  UpdateInteractionCountRequest,
  UpdateInteractionCountResponse,
} from './types';

export const updateInteractionCount = async ({
  monsterId,
  interactionCount,
}: UpdateInteractionCountRequest) => {
  const { data } = await apiInstance.post<UpdateInteractionCountResponse>(
    API_URLS.MONSTER.UPDATE_INTERACTION_COUNT(monsterId),
    {
      interactionCount,
    },
  );

  return data;
};
