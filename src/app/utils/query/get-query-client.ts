import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });
};

const getQueryClient = cache(() => makeQueryClient());

export { makeQueryClient, getQueryClient };
