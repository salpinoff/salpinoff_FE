import { AxiosError } from 'axios';

import requestSignIn from '@api/auth/signin';

import { Providers } from '@type/auth';

const signIn = async (provider: Providers) => {
  return requestSignIn({ provider })
    .then(({ data: { url } }) => {
      window.location.href = url;
    })
    .catch((error: AxiosError<{ errorMessage: string }>) => {
      const errorMessage =
        error.response?.data.errorMessage || '잠시 후 다시 시도해주세요';

      //  TODO. toast 로 변경하기
      console.log(errorMessage);
    });
};

export default signIn;
