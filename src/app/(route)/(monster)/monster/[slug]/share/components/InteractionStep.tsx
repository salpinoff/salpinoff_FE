import { useParams } from 'next/navigation';

import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import toast from 'react-hot-toast';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Button from '@components/common/Button';
import Header from '@components/Header';

import EncouragementTooltip from './EncouragementTooltip';
import SharedMonsterFlipCard from '../../../../component/cards/SharedMonsterFlipCard';
import SharedMonsterFlipCardSkeleton from '../../../../component/cards/SharedMonsterFlipCard/Skeleton';
import { useGuestContext, useGuestUpdate } from '../context/guest.context';
import Error from '../error';

const TOAST = [
  {
    message: '화면을 연타하면 사연을 볼 수 있어요',
    opts: {
      id: 'init-toast',
    },
  },
  {
    message: '숨겨진 사연이 열렸어요, 한번 더 탭하세요!',
    opts: {
      id: 'clear-toast',
    },
  },
] as const;

type InteractionStepProps = {
  onCompeleteInteraction?: () => void;
  goNext: () => void;
};

export default function InteractionStep({
  onCompeleteInteraction,
  goNext,
}: InteractionStepProps) {
  const { slug } = useParams<{ slug: string }>();
  const { clear } = useGuestContext();

  const [open, setOpen] = useState(false);

  const update = useGuestUpdate();

  const setGuide = (isClear: boolean = false) => {
    const { message, opts } = TOAST[+isClear];
    toast(message, opts);
  };

  return (
    <section className="bg-gradient flex h-full w-full flex-col items-center justify-between gap-[28px]">
      <Header>
        <Header.Logo size={32} />
      </Header>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <Suspense fallback={<SharedMonsterFlipCardSkeleton />}>
            <ErrorBoundary FallbackComponent={Error} onReset={reset}>
              <SharedMonsterFlipCard
                clear={clear}
                monsterId={slug}
                onLoad={() => {
                  if (!clear) setGuide();
                }}
                onFlipped={() => {
                  setOpen(true);
                }}
                onComplete={() => {
                  if (!clear) {
                    update({ clear: true });
                    setGuide(true);
                    onCompeleteInteraction?.();
                  }
                }}
              />
            </ErrorBoundary>
          </Suspense>
        )}
      </QueryErrorResetBoundary>
      <nav className="relative flex w-full p-[20px]">
        {open && <EncouragementTooltip />}
        <Button
          className="w-full"
          size="large"
          variant="primary"
          onClick={goNext}
          disabled={!clear}
        >
          응원 메시지 작성하기
        </Button>
      </nav>
    </section>
  );
}
