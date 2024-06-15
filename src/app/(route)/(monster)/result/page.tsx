'use client';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { LayoutGroup } from 'framer-motion';

import Button from '@components/common/Button';

import useModal from '@hooks/useModal';
import useQueryString from '@hooks/useQueryString';

import MONSTER_APIS from '@api/monster';
import { GetMonsterResponse } from '@api/monster/types';

import GuideMessage from './components/GuideMessage';
import MonsterCard from './components/MonsterCard';
import ShareModal from './components/ShareModal';

export default function ResultSharePage() {
  const router = useRouter();
  const [monsterId] = useQueryString('monsterId');
  const [monster, setMonster] = useState<GetMonsterResponse | null>();

  const { error, isError, status, fetchStatus, data } = useQuery({
    queryKey: ['result', monsterId],
    queryFn: () => MONSTER_APIS.getMonsterById(monsterId),
    enabled: !!monsterId,
    retry: 1,
    meta: {
      errorMessage: '몬스터의 정보를 가져오는데 실패했어요!',
    },
  });

  useEffect(() => {
    if (data) {
      setMonster(data.data);
    }
  }, [data]);

  const handleDefer = () => router.push('/');

  const { openModal, closeModal } = useModal(() => (
    <ShareModal monsterId={monsterId} closeModal={closeModal} />
  ));

  if (!monsterId) {
    return <div>No monster ID provided in the URL</div>;
  }

  if (!monster) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('error :: ', error);
  }

  return (
    <main className="mx-auto flex h-dvh items-center justify-center bg-gradient-to-b from-cool-neutral-5 to-[#253047]">
      <div className="flex h-[573px] max-h-dvh flex-col items-center justify-between py-[20px]">
        {fetchStatus === 'fetching' && <>fetching...</>}
        {status === 'success' && fetchStatus === 'idle' && (
          <>
            <LayoutGroup>
              <GuideMessage />
              <MonsterCard
                monsterName={monster.monsterName}
                monsterDecorations={monster.monsterDecorations}
              />
            </LayoutGroup>
            <footer className="flex flex-col">
              <Button size="medium" onClick={openModal}>
                바로 공유하기
              </Button>
              <Button size="medium" variant="ghost" onClick={handleDefer}>
                다음에 할래요
              </Button>
            </footer>
          </>
        )}

        {error && <>error</>}
      </div>
    </main>
  );
}
