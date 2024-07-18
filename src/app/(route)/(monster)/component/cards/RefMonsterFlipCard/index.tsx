'use client';

import { useRouter } from 'next/navigation';

import {
  MouseEventHandler,
  TouchEventHandler,
  useCallback,
  useState,
} from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import MonsterFlipCard from '@components/cards/MonsterFlipCard';
import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';
import MonsterCreationModal from '@components/modals/MonsterCreationModal';
import ProgressBar from '@components/ProgressBar';

import useModal from '@hooks/useModal';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import cn from '@utils/cn';

import { useUpdateInteraction } from '@api/interaction/query/hooks';
import MonsterQueryFactory, { MonsterKeys } from '@api/monster/query/factory';
import { GetMonsterRefResponse } from '@api/monster/types';

import { ActionMenu, MonsterCounterBox, StressLevelBadge } from '../_ui';

const CARD_WIDTH = 312;
const CARD_HEIGHT = 400;

export default function RefMonsterFlipCard() {
  const router = useRouter();

  const { data: monster } = useSuspenseQuery<
    GetMonsterRefResponse,
    AxiosError,
    ReturnType<typeof transformMonster<GetMonsterRefResponse>>,
    MonsterKeys['reference']['queryKey']
  >({
    ...MonsterQueryFactory.reference,
    select: useCallback(
      (data: GetMonsterRefResponse) => Adapter.from(data).to(transformMonster),
      [],
    ),
  });

  const { mutate: updateCount } = useUpdateInteraction(monster.monsterId);

  const { openModal, closeModal } = useModal(() => (
    <MonsterCreationModal onClose={closeModal} />
  ));

  const [clear, setClear] = useState(
    () => monster.currentInteractionCount >= monster.interactionCount,
  );
  const [flipped, setFlipped] = useState(false);
  const [totalCount, setTotalCount] = useState(monster.currentInteractionCount);

  const [prevPageX, setPrevPageX] = useState<number | null>(null);

  const { BACKGROUND_COLOR, ...restDecos } = monster.decorations;

  const ITEMS = Object.values(restDecos);

  const toggleCard = () => setFlipped((prev) => !prev);

  const handleModify: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/monster/${monster.monsterId}/modify/story`);
  };

  const handleTouchMove: TouchEventHandler = (event) => {
    const touch = event.touches[0]!;

    if (!prevPageX) {
      setPrevPageX(touch.pageX);
    } else if (Math.abs(touch.pageX - prevPageX) > 25) {
      toggleCard();
    }
  };

  const handleTouchEnd: TouchEventHandler = () => {
    setPrevPageX(null);
  };

  const handleMouseDown: MouseEventHandler = (event) => {
    setPrevPageX(event.pageX);
  };

  const handleMouseUp: MouseEventHandler = (event) => {
    if (!prevPageX) return;
    if (Math.abs(event.pageX - prevPageX) > 5) {
      toggleCard();
      setTimeout(() => setPrevPageX(null));
    } else {
      setPrevPageX(null);
    }
  };

  return (
    <MonsterFlipCard
      className="mx-auto"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flipped={flipped}
      color={BACKGROUND_COLOR}
      // Mobile
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // PC
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <MonsterFlipCard.ActionArea
        className="overflow-hidden p-0"
        style={{
          pointerEvents: prevPageX ? 'unset' : 'auto',
        }}
      >
        <MonsterCounterBox
          items={ITEMS}
          type={monster.type}
          clear={clear}
          startAt={totalCount}
          endAt={monster.interactionCount}
          onCount={(count) => {
            if (!prevPageX) {
              updateCount(count);
              setTotalCount((prev) =>
                Math.min(prev + count, monster.interactionCount),
              );
            }
          }}
          onComplete={() => {
            setClear(true);
          }}
        />
        {clear && (
          <div className="absolute bottom-0 left-0 right-0 w-full px-[16px] py-[12px]">
            <Button
              className="label-1-medium mx-auto w-full bg-[#17171985] text-cool-neutral-99"
              size="small"
              variant="secondary"
              onClick={() => openModal()}
            >
              새로운 퇴사몬 만들기
            </Button>
          </div>
        )}
      </MonsterFlipCard.ActionArea>
      <MonsterFlipCard.Content
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="flex items-center justify-between">
          <div className="pointer-event-none flex select-none items-center gap-8">
            <StressLevelBadge level={monster.ratingRange} />
            <BaseText
              overflow="truncate"
              component="span"
              variant="body-1"
              weight="semibold"
              color="neutral"
            >
              {monster.monsterName}
            </BaseText>
          </div>
          <ActionMenu targetId={monster.monsterId} />
        </div>
        <ProgressBar
          value={totalCount}
          max={monster.interactionCount}
          label="percent"
        />
      </MonsterFlipCard.Content>
      <MonsterFlipCard.Back onClick={toggleCard}>
        <BaseText
          className={cn(
            'my-auto flex h-full max-h-full w-full flex-initial items-center',
            'whitespace-pre-wrap text-center leading-relaxed',
            'overflow-y-auto scrollbar-hide',
          )}
          component="p"
          variant="body-2"
          weight="regular"
          color="strong"
          wrap
        >
          {monster.content}
        </BaseText>
        <Button
          variant="secondary"
          size="small"
          className="w-full flex-none"
          onClick={handleModify}
          aria-label="내용 수정하기"
        >
          내용 수정하기
        </Button>
      </MonsterFlipCard.Back>
    </MonsterFlipCard>
  );
}
