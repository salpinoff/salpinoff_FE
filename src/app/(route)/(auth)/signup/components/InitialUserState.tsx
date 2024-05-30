import { useSearchParams } from 'next/navigation';

import { PropsWithChildren, useEffect } from 'react';

import useUserInfoDispatchContext from '../hooks/useUserInfoDispatchContext';

type Props = PropsWithChildren;

function InitialUserState({ children }: Props) {
  const { update } = useUserInfoDispatchContext();

  const searchParams = useSearchParams();
  const code = (Number(searchParams.get('code')) as 100 | 101 | 102) || 100;
  const defaultUserName = searchParams.get('userName') || '';

  useEffect(() => {
    update({ code, nickname: defaultUserName });
  }, [code, defaultUserName]);

  return children;
}

export default InitialUserState;
