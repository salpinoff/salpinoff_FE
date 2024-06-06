import { PropsWithChildren, useEffect } from 'react';

import useQueryString from '@hooks/useQueryString';

import { MemberStatusCodes } from '@api/schema/member';

import useUserInfoDispatchContext from '../hooks/useUserInfoDispatchContext';

type Props = PropsWithChildren;

function InitialUserState({ children }: Props) {
  const { update } = useUserInfoDispatchContext();

  const [code] = useQueryString<`${MemberStatusCodes}`>('code', '100');
  const [defaultUserName] = useQueryString<string>('user', '');

  useEffect(() => {
    update({
      code: Number(code) as MemberStatusCodes,
      userName: defaultUserName,
    });
  }, [code, defaultUserName]);

  return children;
}

export default InitialUserState;
