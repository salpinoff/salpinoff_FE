import { useEffect, useState } from 'react';

import {
  getSessionItem,
  removeSessionItem,
  setSessionItem,
} from '@utils/session-storage';

import { Session } from '@api/schema/token';

type User = {
  id: number;
  name: string;
};

const useUserInfo = (session: Session | undefined) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!session || session.status === 'unauthenticated') return;

    const {
      userInfo: { username, memberId },
    } = session;

    if (!getSessionItem('userInfo')) {
      setSessionItem('userInfo', { name: username, id: memberId });
    }

    const userInfo = getSessionItem<User>('userInfo');
    setUser({ name: userInfo?.name || '', id: userInfo?.id || 0 });
  }, [session]);

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
