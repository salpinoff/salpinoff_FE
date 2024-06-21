import { useMutation } from '@tanstack/react-query';

import { setAuthHeader } from '@api/api.config';
import requestDeleteToken from '@api/auth/token/delete-token';

import { PropsOfFn } from '@type/util';

import signOut from 'src/app/(route)/(auth)/signin/utils/signout';

type Props = PropsOfFn<typeof signOut>;

const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: (props: Props) => signOut(props),
    onMutate: async () => {
      return requestDeleteToken();
    },
    onSuccess: () => {
      setAuthHeader('');
    },
  });
};

export default useLogout;
