'use client';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { LayoutGroup } from 'framer-motion';

import Button from '@components/common/Button';

import useModal from '@hooks/useModal';

import { useGetMonster } from '@api/monster/queries';
import { GetMonsterResponse } from '@api/monster/types';

import { GuideMessage, ShareModal, MonsterCard } from './components';
import {
  copyToClipboard,
  generateShareUrl,
  isValidURL,
  shareToKakao,
} from './lib';

export default function MonsterResultPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: monsterId } = params;

  const router = useRouter();
  const [monster, setMonster] = useState<GetMonsterResponse | null>();

  const { error, isError, status, fetchStatus, data } = useGetMonster(
    monsterId,
    {
      meta: {
        errorMessage: '몬스터의 정보를 가져오는데 실패했어요!',
      },
    },
  );

  const SHARE_URL = generateShareUrl(monsterId);

  const shareLink = async () => {
    if (SHARE_URL && isValidURL(SHARE_URL)) {
      // const success = await copyToClipboard(SHARE_URL);
      // toast(success ? '링크를 복사했어요.' : '링크를 복사할 수 없어요.');

      await copyToClipboard(SHARE_URL);
    }
  };

  const shareKakao = () => {
    if (SHARE_URL && isValidURL(SHARE_URL)) {
      shareToKakao(SHARE_URL);
    }
  };

  useEffect(() => {
    if (data) {
      setMonster(data);
    }
  }, [data]);

  const handleDefer = () => router.push('/');

  const { openModal, closeModal } = useModal(() => (
    <ShareModal
      onShareByLink={() => {
        shareLink();
        closeModal();
      }}
      onShareViaKakao={() => {
        shareKakao();
        closeModal();
      }}
    />
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
    <div className="mx-auto flex h-full w-full items-center justify-center bg-gradient-to-b from-cool-neutral-5 to-[#253047]">
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
              <Button size="medium" onClick={() => openModal()}>
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
    </div>
  );
}
