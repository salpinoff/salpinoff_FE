'use client';

import { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCsrfToken } from '@api/auth/base/csrf';
import AuthFactory from '@api/auth/query';

type Props = PropsWithChildren;

function CsrfTokenInitializer({ children }: Props) {
  useQuery({
    queryKey: AuthFactory.csrf.queryKey,
    queryFn: getCsrfToken,
  });

  return children;
}

export default CsrfTokenInitializer;
