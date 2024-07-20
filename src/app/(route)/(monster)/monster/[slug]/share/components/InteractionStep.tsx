import { useParams } from 'next/navigation';

import { Suspense, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';
import Header from '@components/Header';

import SharedMonsterFlipCard from 'src/app/(route)/(monster)/component/cards/SharedMonsterFlipCard';
import SharedMonsterFlipCardSkeleton from 'src/app/(route)/(monster)/component/cards/SharedMonsterFlipCard/Skeleton';

import { GuestContext } from '../context/guest.context';
import Error from '../error';

type InteractionStepProps = {
  onCompeleteInteraction: () => void;
  goNext: () => void;
};

export default function InteractionStep({
  onCompeleteInteraction,
  goNext,
}: InteractionStepProps) {
  const { slug } = useParams<{ slug: string }>();
  const { clear } = useContext(GuestContext);

  return (
    <section className="flex h-full w-full flex-col items-center justify-between gap-[28px] bg-gradient-to-b from-cool-neutral-5 to-[#253047] px-[20px] pb-[20px]">
      <div className="h-dvh">
        <Header className="mb-[20px] justify-center">
          <Header.Logo size={32} />
        </Header>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={Error} onReset={reset}>
              <Suspense fallback={<SharedMonsterFlipCardSkeleton />}>
                <SharedMonsterFlipCard
                  clear={clear}
                  monsterId={slug}
                  onComplete={onCompeleteInteraction}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
      <nav>
        <Button
          size="large"
          variant="primary"
          onClick={goNext}
          disabled={!clear}
        >
          <BaseText variant="body-2" weight="semibold">
            응원메세지 작성하기
          </BaseText>
        </Button>
      </nav>
    </section>
  );
}
