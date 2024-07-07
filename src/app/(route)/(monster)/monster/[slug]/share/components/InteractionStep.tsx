import { useParams } from 'next/navigation';

import { Suspense, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import LogoSVG from '@public/icons/logo.svg';

import Button from '@components/common/Button';

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
    <>
      <header className="flex w-full items-center justify-center">
        <LogoSVG width={115} height={20} />
      </header>
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

      <nav>
        <Button
          size="large"
          variant="primary"
          onClick={goNext}
          disabled={!clear}
        >
          응원메세지 작성하기
        </Button>
      </nav>
    </>
  );
}
