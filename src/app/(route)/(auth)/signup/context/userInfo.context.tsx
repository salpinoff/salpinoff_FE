import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';

type UserInfo = {
  nickname: string;
  emotion: 'angry' | 'depressed' | '';
  stress: number;
  story: string;
  monster: {
    name: string;
    background: string;
  };
};

type Reducer = (
  state: UserInfo,
  action: { payload: Partial<UserInfo> },
) => UserInfo;

type UserInfoContext = {
  userInfo: UserInfo;
  updater: Dispatch<{
    payload: Partial<UserInfo>;
  }>;
};

type Props = PropsWithChildren;

const initialUserInfo: UserInfo = {
  nickname: '',
  emotion: '',
  stress: 1,
  story: '',
  monster: {
    name: '',
    background: 'red',
  },
};

const userInfoReducer: Reducer = (state, action) => {
  return { ...state, ...action.payload };
};

const userInfoContext = createContext<UserInfoContext>({
  userInfo: initialUserInfo,
  updater: () => {},
});

const { Provider } = userInfoContext;

function UserInfoProvider({ children }: Props) {
  const [state, dispatch] = useReducer(userInfoReducer, initialUserInfo);

  return (
    <Provider
      value={{
        userInfo: state,
        updater: dispatch,
      }}
    >
      {children}
    </Provider>
  );
}

export { UserInfoProvider, userInfoContext };
