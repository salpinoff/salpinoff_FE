'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { sendGTMEvent } from '@next/third-parties/google';

import useAuth from '@hooks/api/useAuth';

import { getLocalItem, setLocalItem } from '@utils/local-storage';

import { getMonsterList } from '@api/monster';
import MonsterQueryFactory from '@api/monster/query/factory';

type Props = PropsWithChildren<{ name: string; disabled?: boolean }>;

function ScreenView({ name, children, disabled = false }: Props) {
  const { user, status } = useAuth();

  const { data: totalElements } = useQuery({
    enabled: status === 'authenticated',
    queryKey: [MonsterQueryFactory.list.queryKey, 'screen-view'],
    queryFn: () => getMonsterList({ page: 1, size: 10 }),
    select: (data) => data.data.totalElements,
  });

  const ensureLoginDate = () => {
    if (!getLocalItem('loginDate')) {
      setLocalItem('loginDate', new Date().toISOString());
    }

    return getLocalItem('loginDate');
  };

  useEffect(() => {
    if (disabled) return;
    if (status === 'loading') return;
    if (status === 'authenticated' && (!totalElements || !user)) return;

    const userProperties = {
      userId: user?.id,
      userJoinDate: user?.joinDate,
      numOfMonsters: totalElements || -1,
      lastLoginDate: ensureLoginDate(),
    };

    sendGTMEvent({
      event: 'view_screen',
      screenViewAt: new Date().toISOString(),
      screenName: name,
      ...(status === 'authenticated' && { ...userProperties }),
    });
  }, [disabled, status, totalElements, user]);

  return children;
}

export default ScreenView;
