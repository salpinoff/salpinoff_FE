import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { setAuthHeader } from '@api/api.config';
import { getSession, updateSession } from '@api/auth/base/session';
import AuthFactory from '@api/auth/query';
import { Session } from '@api/schema/token';

const useAuth = (): {
  status: 'loading' | Session['status'] | 'error';
  accessToken: string;
  update: () => void;
} => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationKey: ['updateToken'],
    mutationFn: updateSession,
    onSuccess: ({ data: { accessToken } }) => {
      queryClient.setQueryData(['authToken'], {
        accessToken,
        status: 'authenticated',
      });
    },
    onError: () => {
      // TODO. toast
      console.log('세션이 만료 되었습니다.');
      router.push('/signin');
    },
  });

  const { data: session, error } = useQuery({
    queryKey: AuthFactory.token.queryKey,
    queryFn: getSession,
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 5,
    select: (data) => data.data,
  });

  setAuthHeader(session?.accessToken || '');

  useEffect(() => {
    if (session && session.status === 'expired') {
      update();
    }
  }, [session]);

  return {
    status: (error && 'error') || session?.status || 'loading',
    accessToken: session?.accessToken || '',
    update,
  };
};

export default useAuth;
