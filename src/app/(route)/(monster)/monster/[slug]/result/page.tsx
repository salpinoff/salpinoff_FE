'use client';

import { useRouter } from 'next/navigation';

import toast, { Toaster, resolveValue } from 'react-hot-toast';

import { LayoutGroup } from 'framer-motion';

import CharacterCanvas from '@components/CharacterCanvas';
import Button from '@components/common/Button';
import Toast from '@components/common/Toast';
import ScreenView from '@components/logging/ScreenView';

import useModal from '@hooks/useModal';

import { Adapter } from '@utils/client/adapter';
import generateShareUrl from '@utils/client/generate-share-url';
import transformMonster from '@utils/client/transform-monster';
import cn from '@utils/cn';
import { getSessionItem } from '@utils/session-storage';

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

  const { error, isError, isFetching, status, fetchStatus, data } = useMonster(
    monsterId,
    {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      select: (data) => Adapter.from(data.data).to(transformMonster),
      staleTime: 1000 * 60 * 30,
    },
  );

  const SHARE_URL = generateShareUrl(monsterId) ?? '';

  const handleDefer = () => {
    toast.remove();
    router.push('/');
  };

  const { openModal, closeModal } = useModal(() => (
    <ShareModal
      url={SHARE_URL}
      onShareByLink={() => {
        closeModal();
        toast('링크가 클립보드에 복사되었어요!');
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
  const prevUrl = getSessionItem<string>('prevUrl') || '';

  return (
    <ScreenView
      name={prevUrl.includes('/monster/produce') ? 'signup_7' : 'make_6'}
    >
      <div className="mx-auto flex h-full w-full items-center justify-center bg-gradient-to-b from-cool-neutral-5 to-[#253047]">
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
                    width={560}
                    height={560}
                    type={data.type}
                    items={Object.values(REST_DECOS)}
                    className={cn(
                      'h-full w-full',
                      data.type === 'sad' && ' -translate-y-[10px]',
                    )}
                  />
                </AnimatedSpreadCard>
              </LayoutGroup>
              <footer className="flex flex-col">
                <Button
                  id="btn_share"
                  size="medium"
                  onClick={() => openModal()}
                >
                  바로 공유하기
                </Button>
                <Button
                  id="btn_gomain"
                  className="font-normal"
                  size="medium"
                  variant="ghost"
                  onClick={handleDefer}
                >
                  메인으로 이동하기
                </Button>
              </footer>
              <Toaster
                position="bottom-center"
                reverseOrder={false}
                containerClassName="toast-container"
                containerStyle={{
                  bottom: 20,
                }}
              >
                {(t) => <Toast>{resolveValue(t.message, t)}</Toast>}
              </Toaster>
            </>
          )}
          {isError && <>error</>}
        </div>
      </div>
    </ScreenView>
  );
}
