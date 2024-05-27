'use client';

import { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@utils/query';

type Props = PropsWithChildren;

function QueryProvider({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
