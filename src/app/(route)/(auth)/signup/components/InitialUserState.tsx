import { useSearchParams } from 'next/navigation';

import { PropsWithChildren, useEffect } from 'react';

import useUserInfoContext from '../hooks/useUserInfoContext';

type Props = PropsWithChildren;

function InitialUserState({ children }: Props) {
  const { updater } = useUserInfoContext();

  const searchParams = useSearchParams();
  const code = (Number(searchParams.get('code')) as 100 | 101 | 102) || 100;
  const defaultUserName = searchParams.get('user') || '';

  useEffect(() => {
    updater({ payload: { code, nickname: defaultUserName } });
  }, [code, defaultUserName]);

  return children;
}

export default InitialUserState;
