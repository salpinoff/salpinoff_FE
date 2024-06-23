import { useContext } from 'react';

import { useAtom } from 'jotai';

import LogoSVG from '@public/icons/logo.svg';

import Button from '@components/common/Button';
import MonsterFlipCard from '@components/MonsterCard/FlipCard';

import { monsterAtom } from '@store/monsterAtom';

import { GuestContext } from '../context/guest.context';

type InteractionStepProps = {
  onCompeleteInteraction: () => void;
  goNext: () => void;
};

export default function InteractionStep({
  onCompeleteInteraction,
  goNext,
}: InteractionStepProps) {
  const [{ isPending, isError }] = useAtom(monsterAtom);
  const { clear } = useContext(GuestContext);

  // [TODO] Pending, Error 페이지 구현
  if (isPending)
    return <div className="h-full w-full text-white">Loading...</div>;

  if (isError) return <div className="h-full w-full text-white">Error</div>;

  return (
    <>
      <header className="flex w-full items-center justify-center">
        <LogoSVG width={115} height={20} />
      </header>
      <MonsterFlipCard onFlipped={onCompeleteInteraction} flip={clear} />
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
