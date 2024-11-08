import { PropsWithChildren, ReactNode, Suspense } from 'react';

import useAuth from '@hooks/api/useAuth';

type Props = PropsWithChildren<{
  fallback?: ReactNode;
}>;

function AuthSuspense({ children, fallback }: Props) {
  const { status } = useAuth();

  return status === 'authenticated' ? (
    <Suspense fallback={fallback}>{children}</Suspense>
  ) : null;
}

export default AuthSuspense;
