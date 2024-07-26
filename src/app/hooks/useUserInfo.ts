import { useEffect, useState } from 'react';

import jwtParse from '@utils/jwt-parse';
import {
  getSessionItem,
  removeSessionItem,
  setSessionItem,
} from '@utils/session-storage';

type User = {
  name: string;
};

const useUserInfo = (accessToken: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    if (!getSessionItem('userInfo')) {
      setSessionItem('userInfo', { name: jwtParse(accessToken).username });
    }

    const userInfo = getSessionItem<User>('userInfo');
    setUser({ name: userInfo?.name || '' });
  }, [accessToken]);

  useEffect(() => {
    const handleSignout = () => {
      setUser(null);
      removeSessionItem('userInfo');
    };

    window.addEventListener('signout', handleSignout);

    return () => {
      window.removeEventListener('signout', handleSignout);
    };
  }, []);

  return user;
};

export default useUserInfo;
