'use server';

import { converHeaderToRecord } from '@utils/server/convert-header-to-record';

import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

const requestDeleteToken = () => {
  const path = API_URLS.AUTH.API.DELETE_TOKEN;
  const requestHeader = converHeaderToRecord();

  return apiInstance.post(path, null, { headers: requestHeader });
};

export default requestDeleteToken;
