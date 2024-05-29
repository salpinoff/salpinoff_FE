/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';

import { PropsOfFn } from '@type/util';

import useAuth from './api/useAuth';

const useWithAuth = (fallback?: () => unknown) => {
  const router = useRouter();
  const { status } = useAuth();

  return <T extends (props: PropsOfFn<T>) => any>(callback: T) => {
    return (props: PropsOfFn<T>): ReturnType<T> | void => {
      if (status === 'unauthenticated') {
        if (fallback) {
          fallback();
        } else {
          router.push('/signin');
        }

        return;
      }

      return callback(props);
    };
  };
};

export default useWithAuth;
