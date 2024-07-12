'use client';

import { useRouter } from 'next/navigation';

import { LayoutGroup } from 'framer-motion';

import CharacterCanvas from '@components/CharacterCanvas';
import Button from '@components/common/Button';

import useModal from '@hooks/useModal';

import generateShareUrl from '@utils/client/generate-share-url';
import cn from '@utils/cn';

import { useMonster } from '@api/monster/query/hooks';

import { GuideMessage, AnimatedSpreadCard } from './components';
import ShareModal from '../../../../../components/modals/ShareModal';

export default function MonsterResultPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: monsterId } = params;

  const router = useRouter();

  const { error, isError, isFetching, status, fetchStatus, data } =
    useMonster(monsterId);

  const SHARE_URL = generateShareUrl(monsterId) ?? '';

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

  if (!data) {
    if (isFetching) return <>fetching...</>;

    // [TODO] 몬스터 생성 오류 OR 임의적 접근
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('error :: ', error);
  }

  const { BACKGROUND_COLOR, ...REST_DECOS } = data.decorations;

  return (
    <div className="mx-auto flex h-dvh w-full items-center justify-center bg-gradient-to-b from-cool-neutral-5 to-[#253047]">
      <div className="flex h-[573px] max-h-dvh flex-col items-center justify-between py-[20px]">
        {status === 'success' && fetchStatus === 'idle' && (
          <>
            <LayoutGroup>
              <GuideMessage />
              <AnimatedSpreadCard
                name={data.monsterName}
                // [TODO] BACKGROUND_COLOR 필수 여부 확인 필요
                color={BACKGROUND_COLOR ?? ''}
              >
                <CharacterCanvas
                  type={data.type}
                  items={Object.values(REST_DECOS)}
                  className={cn(
                    'h-full w-full',
                    data.type === 'mad' && ' -translate-y-[20px]',
                    data.type === 'sad' && ' -translate-y-[10px]',
                  )}
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
