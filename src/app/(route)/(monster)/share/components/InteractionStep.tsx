import { useEffect, useRef } from 'react';

import { useAtom } from 'jotai';

import LogoSVG from '@public/icons/logo.svg';

import Button from '@components/common/Button';
import MonsterFlipCard from '@components/MonsterCard/FlipCard';

import { monsterAtom } from '@store/monsterAtom';

type InteractionStepProps = {
  goToEncouragement: () => void;
};

export default function InteractionStep({
  goToEncouragement,
}: InteractionStepProps) {
  const [{ isPending, isError }] = useAtom(monsterAtom);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  });

  // [TODO] Pending, Error 페이지 구현
  if (isPending)
    return <div className="h-full w-full text-white">Loading...</div>;

  if (isError) return <div className="h-full w-full text-white">Error</div>;

  const handleFlipped = () => {
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  return (
    <>
      <header className="flex w-full items-center justify-center">
        <LogoSVG />
      </header>
      <MonsterFlipCard onFlipped={handleFlipped} />
      <nav>
        <Button
          ref={buttonRef}
          onClick={goToEncouragement}
          variant="primary"
          size="large"
        >
          응원메세지 작성하기
        </Button>
      </nav>
    </>
  );
}
