import { useContext } from 'react';

import { userInfoContext } from '../context/userInfo.context';

const useUserInfoContext = () => {
  const context = useContext(userInfoContext);

  if (!context) {
    throw new Error(
      'Context MisMatch : this hook must be under UserInfoContext.Provider',
    );
  }

  return context;
};

export default useUserInfoContext;
