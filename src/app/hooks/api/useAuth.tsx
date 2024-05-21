import { useQuery } from '@tanstack/react-query';

import { getSession } from '@api/auth/session';

const useAuth = () => {
  return useQuery({
    queryKey: ['authToken'],
    queryFn: getSession,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });
};

export default useAuth;
