import { useParams } from 'next/navigation';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Button from '@components/common/Button';
import Header from '@components/Header';

import SharedMonsterFlipCard from 'src/app/(route)/(monster)/component/cards/SharedMonsterFlipCard';
import SharedMonsterFlipCardSkeleton from 'src/app/(route)/(monster)/component/cards/SharedMonsterFlipCard/Skeleton';

import { useGuestContext, useGuestUpdate } from '../context/guest.context';
import Error from '../error';

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

  const update = useGuestUpdate();

  return (
    <section className="bg-gradient flex h-full w-full flex-col items-center justify-between gap-[28px]">
      <Header>
        <Header.Logo size={32} />
      </Header>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={Error} onReset={reset}>
            <Suspense fallback={<SharedMonsterFlipCardSkeleton />}>
              <SharedMonsterFlipCard
                clear={clear}
                monsterId={slug}
                onComplete={() => {
                  update({ clear: true });
                  onCompeleteInteraction?.();
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <nav className="flex w-full p-[20px]">
        <Button
          className="w-full"
          size="large"
          variant="primary"
          onClick={goNext}
          disabled={!clear}
        >
          응원메세지 작성하기
        </Button>
      </nav>
    </section>
  );
}
