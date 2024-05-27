import { useRouter } from 'next/navigation';

import { PropsOfFn } from '@type/util';

import useAuth from './api/useAuth';

const useWithAuth = (fallback?: () => unknown) => {
  const router = useRouter();
  const { status } = useAuth();

  return <T extends (props: PropsOfFn<T>) => void>(callback: T) => {
    return (props: PropsOfFn<T>) => {
      if (status !== 'authenticated') {
        if (fallback) {
          fallback();
        } else {
          router.push('/signin');
        }

        return;
      }

      callback(props);
    };
  };
};

export default useWithAuth;
