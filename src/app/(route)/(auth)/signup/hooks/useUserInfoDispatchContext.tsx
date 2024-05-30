import { useContext } from 'react';

import { userInfoDispatchContext } from '../context/userInfo.context';

const useUserInfoDispatchContext = () => {
  const context = useContext(userInfoDispatchContext);

  if (!context) {
    throw new Error(
      'Context MisMatch : this hook must be under UserInfoDispatchContext.Provider',
    );
  }

  return context;
};

export default useUserInfoDispatchContext;
