import { useMutation } from '@tanstack/react-query';

import { setLocalItem } from '@utils/local-storage';

import requestSignIn from '@api/auth/base/signin';

import { Providers } from '@type/auth';

import type { AxiosError } from 'axios';

const useSignIn = (provider: Providers) => {
  return useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: () => requestSignIn({ provider }),
    onSuccess: ({ data: { url } }) => {
      window.location.href = url;

      setLocalItem('loginDate', new Date().toISOString());
    },
    onError: (error: AxiosError<{ errorMessage: string }>) => {
      const errorMessage =
        error.response?.data.errorMessage || '잠시 후 다시 시도해주세요';

      //  TODO. toast 로 변경하기
      console.log(errorMessage);
    },
  });
};

export default useSignIn;
