/* eslint-disable @typescript-eslint/no-unused-vars */

import { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useQueryString from '@hooks/useQueryString';

import { MemberStatusCode, MemberStatusCodes } from '@api/schema/member';

import type { UserInfo } from './context.type';

const initialUserInfo: UserInfo = {
  code: MemberStatusCode.New,
  userName: '',
  emotion: '',
  stress: 1,
  story: '',
  monsterName: '',
  decorations: [],
};

function UserInfoProvider({ children }: PropsWithChildren) {
  const [code] = useQueryString<`${MemberStatusCodes}`>('code', '100');
  const [userName] = useQueryString<string>('user', '');

  const method = useForm<UserInfo>({
    mode: 'all',
    defaultValues: {
      ...initialUserInfo,
      code: Number(code as `${MemberStatusCodes}`),
      userName,
    },
  });

  return <FormProvider {...method}>{children}</FormProvider>;
}

export { UserInfoProvider };
