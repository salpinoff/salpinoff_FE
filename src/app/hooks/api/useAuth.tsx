import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { setAuthHeader } from '@api/api.config';
import { getSession, updateSession } from '@api/auth/session';

const useAuth = (): {
  status: 'loading' | 'authenticated' | 'unauthenticated' | 'error';
  accessToken: string;
  update: () => void;
} => {
  const queryClient = useQueryClient();

  const { data: session, error } = useQuery({
    queryKey: ['authToken'],
    queryFn: getSession,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분 동안 토큰이 신선하다고 간주
    gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
    select: (data) => data.data,
  });

  const { mutate: update } = useMutation({
    mutationKey: ['updateToken'],
    mutationFn: updateSession,
    onSuccess: ({ data: { accessToken } }) => {
      queryClient.setQueryData(['authToken'], {
        accessToken,
        status: 'authenticated',
      });
    },
  });

  setAuthHeader(session?.accessToken || '');

  return {
    status: (error && 'error') || session?.status || 'loading',
    accessToken: session?.accessToken || '',
    update,
  };
};

export default useAuth;
