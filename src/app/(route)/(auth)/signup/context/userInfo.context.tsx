/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';

import { Member, MemberStatusCode } from '@api/schema/member';
import { Monster, Decoration } from '@api/schema/monster';

// Mapped
type UserInfo = {
  // Member Info
  code: (typeof MemberStatusCode)[keyof typeof MemberStatusCode];
  nickname: Member['username'];
  // Monster Info
  // ! 해당 부분은 구조의 논의가 필요할 것 같습니다!
  emotion: Monster['emotion'] | '';
  stress: Monster['rating'];
  story: Monster['content'];
  monster: {
    name: Monster['monsterName'];
    decorations: Omit<Decoration, 'decorationId'>[];
  };
};

type UserInfoAction = { payload: Partial<UserInfo> };

const initialUserInfo: UserInfo = {
  code: MemberStatusCode.New,
  nickname: '',
  emotion: '',
  stress: 1,
  story: '',
  monster: {
    name: '',
    decorations: [],
  },
};

const userInfoReducer = (state: UserInfo, action: UserInfoAction): UserInfo => {
  return { ...state, ...action.payload };
};

const userInfoContext = createContext<UserInfo>(initialUserInfo);

const userInfoDispatchContext = createContext({
  update: (payload: Partial<UserInfo>) => {},
});

function UserInfoProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(userInfoReducer, initialUserInfo);

  const update = useCallback(
    (payload: Partial<UserInfo>) => {
      return dispatch({
        payload,
      });
    },
    [dispatch],
  );

  const memoizedValue = useMemo(() => ({ update }), [update]);

  return (
    <userInfoContext.Provider value={state}>
      <userInfoDispatchContext.Provider value={memoizedValue}>
        {children}
      </userInfoDispatchContext.Provider>
    </userInfoContext.Provider>
  );
}

export { UserInfoProvider, userInfoContext, userInfoDispatchContext };
