'use client';

import { useEffect, useRef } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import Button from '@components/common/Button';
import MonsterFlipCard from '@components/MonsterCard/FlipCard';

import useQueryString from '@hooks/useQueryString';

import { useUpdateInteraction } from '@api/monster/queries';

import { idAtom, monsterAtom } from '@store/monsterAtom';

export default function SharePage() {
  const [monsterId] = useQueryString('monsterId');

  const [{ isPending, isError, data: monster }] = useAtom(monsterAtom);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const setId = useSetAtom(idAtom);

  const { mutate } = useUpdateInteraction({
    // [TODO]: toast
    onSuccess: () => {},
    onError(error) {
      console.log('응원 보내기에 실패했어요.', error);
    },
  });

  useEffect(() => {
    setId(monsterId);

    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }

    return () => setId('');
  }, [monsterId]);

  // [TODO] Pending, Error 페이지 구현
  if (isPending)
    return <div className="h-full w-full text-white">Loading...</div>;

  if (isError) return <div className="h-full w-full text-white">Error</div>;

  const handleFlipped = () => {
    const { interactionCountPerEncouragement: interactionCount } = monster;

    /** onSuccess시에만 처리가 필요할까요? */
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }

    mutate({
      monsterId,
      interactionCount,
    });
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-between gap-[28px] p-20">
      <MonsterFlipCard onFlipped={handleFlipped} />
      <Button ref={buttonRef} variant="primary" size="large" disabled>
        응원메세지 작성하기
      </Button>
    </section>
  );
}
