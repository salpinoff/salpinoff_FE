import { useContext } from 'react';

import { userInfoContext } from '../context/userInfo.context';

const useUserInfoContext = () => {
  const userInfo = useContext(userInfoContext);

  if (!userInfo) {
    throw new Error(
      'Context MisMatch : this hook must be under UserInfoContext.Provider',
    );
  }

  const { userInfo: state, updater } = userInfo;

  return { state, updater };
};

export default useUserInfoContext;
