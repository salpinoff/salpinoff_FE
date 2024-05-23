'use client';

import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@utils/query';

type Props = PropsWithChildren<{ client?: QueryClient }>;

function QueryProvider({ children, client }: Props) {
  const queryClient = client || getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
