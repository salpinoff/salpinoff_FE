import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

import { SendEncouragementRequest } from './types';

export const sendEncouragement = (
  monsterId: string,
  data: SendEncouragementRequest,
) => {
  return apiInstance.post(API_URLS.MONSTER.SEND_ENCOURAGEMENT(monsterId), {
    ...data,
  });
};
