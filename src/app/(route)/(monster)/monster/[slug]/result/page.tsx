'use client';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { LayoutGroup } from 'framer-motion';
import { find } from 'lodash';

import CharacterCanvas from '@components/CharacterCanvas';
import Button from '@components/common/Button';

import useModal from '@hooks/useModal';

import generateShareUrl from '@utils/client/generate-share-url';

import { useMonster } from '@api/monster/query/hooks';
import { GetMonsterResponse } from '@api/monster/types';
import { DecorationType, Emotion } from '@api/schema/monster';

import { GuideMessage, AnimatedSpreadCard } from './components';
import ShareModal from '../../../../../components/modals/ShareModal';

export default function MonsterResultPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: monsterId } = params;

  const router = useRouter();
  const [monster, setMonster] = useState<GetMonsterResponse | null>();

  const { error, isError, status, fetchStatus, data } = useMonster(monsterId);

  const SHARE_URL = generateShareUrl(monsterId) ?? '';

  useEffect(() => {
    if (data) {
      setMonster(data);
    }
  }, [data]);

  const handleDefer = () => {
    router.push('/');
  };

  const { openModal, closeModal } = useModal(() => (
    <ShareModal
      url={SHARE_URL}
      onShareByLink={() => {
        closeModal();
      }}
      onShareViaKakao={() => {
        closeModal();
      }}
    />
  ));

  if (!monsterId) {
    return <div>No monster ID provided in the URL</div>;
  }

  if (!monster) {
    // [TODO] 몬스터 생성 오류 OR 임의적 접근
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('error :: ', error);
  }

  // TODO 개선
  const color =
    find(monster.monsterDecorations, {
      decorationType: DecorationType.BACKGROUND_COLOR,
    })?.decorationValue || '';

  const CHARACTER_TYPE = monster.emotion === Emotion.ANGER ? 'mad' : 'sad';
  const CHARACTER_ITEMS = monster.monsterDecorations
    .map(
      (deco) =>
        deco.decorationType !== DecorationType.BACKGROUND_COLOR &&
        deco.decorationValue.toLowerCase(),
    )
    .filter(Boolean) as string[];

  return (
    <div className="mx-auto flex !h-dvh h-full w-full items-center justify-center bg-gradient-to-b from-cool-neutral-5 to-[#253047]">
      <div className="flex h-[573px] max-h-dvh flex-col items-center justify-between py-[20px]">
        {fetchStatus === 'fetching' && <>fetching...</>}
        {status === 'success' && fetchStatus === 'idle' && (
          <>
            <LayoutGroup>
              <GuideMessage />
              <AnimatedSpreadCard name={monster.monsterName} color={color}>
                <CharacterCanvas
                  type={CHARACTER_TYPE}
                  items={CHARACTER_ITEMS}
                  className="mb-[30px] h-full w-full"
                />
              </AnimatedSpreadCard>
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
