'use client';

import { useRouter } from 'next/navigation';

import {
  MouseEventHandler,
  TouchEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Toaster, resolveValue } from 'react-hot-toast';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import MonsterFlipCard from '@components/cards/MonsterFlipCard';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import Toast from '@components/common/Toast';
import ProgressBar from '@components/ProgressBar';

import useCanvas from '@hooks/useCanvas';
import useConfetti from '@hooks/useConfetti';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import cn from '@utils/cn';

import { useUpdateInteraction } from '@api/interaction/query/hooks';
import MonsterQueryFactory, { MonsterKeys } from '@api/monster/query/factory';
import { GetMonsterRefResponse } from '@api/monster/types';

import {
  ActionMenu,
  MonsterCounterBox,
  StressLevelBadge,
  ClearedOverlay,
} from '../_ui';
import { ConfettiMap } from '../constants';

const REF_FLIP_CARD_WIDTH = 302;
const REF_FLIP_CARD_HEIGHT = 390;

const CANVAS_WIDTH = REF_FLIP_CARD_WIDTH;
const CANVAS_HEIGHT = REF_FLIP_CARD_HEIGHT - 88;

export default function RefMonsterFlipCard() {
  const router = useRouter();

  const { data: monster } = useSuspenseQuery<
    GetMonsterRefResponse,
    AxiosError,
    ReturnType<typeof transformMonster<GetMonsterRefResponse>>,
    MonsterKeys['reference']['queryKey']
  >({
    ...MonsterQueryFactory.reference,
    refetchOnMount: true,
    select: useCallback(
      (data: GetMonsterRefResponse) => Adapter.from(data).to(transformMonster),
      [],
    ),
  });

  const { mutate: updateCount } = useUpdateInteraction(monster.monsterId);

  const canvasRef = useCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  const { addConfetti } = useConfetti(canvasRef);

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

  const handleCount = (count: number) => {
    if (!prevPageX) {
      updateCount(count);
      addConfetti(ConfettiMap[monster.type]);
      setTotalCount((prev) => Math.min(prev + count, monster.interactionCount));
    }
  };

  useEffect(() => {
    setClear(() => monster.currentInteractionCount >= monster.interactionCount);

    setTotalCount((prev) =>
      monster.currentInteractionCount !== prev
        ? monster.currentInteractionCount
        : prev,
    );

    if (totalCount !== monster.currentInteractionCount && !clear)
      addConfetti(ConfettiMap[monster.type]);
  }, [monster]);

  return (
    <MonsterFlipCard
      className="m-auto"
      width={REF_FLIP_CARD_WIDTH}
      height={REF_FLIP_CARD_HEIGHT}
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
        className="aspect-square min-w-max"
        style={{
          pointerEvents: prevPageX ? 'unset' : 'auto',
        }}
      >
        <MonsterCounterBox
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          items={ITEMS}
          type={monster.type}
          clear={clear}
          startAt={totalCount}
          endAt={monster.interactionCount}
          onCount={handleCount}
          onComplete={() => {
            setClear(true);
          }}
        />
        {/* Effect */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute left-0 top-0 h-full w-full select-none"
        />
        {clear && <ClearedOverlay />}
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          containerClassName="toast-container"
          containerStyle={{
            position: 'absolute',
            bottom: 20,
          }}
          toastOptions={{
            duration: 2000,
          }}
        >
          {(t) => <Toast>{resolveValue(t.message, t)}</Toast>}
        </Toaster>
      </MonsterFlipCard.ActionArea>
      <MonsterFlipCard.Content>
        <div className="flex items-center justify-between">
          <div className="pointer-event-none flex select-none items-center gap-8">
            <StressLevelBadge level={monster.rating} />
            <Text
              overflow="truncate"
              component="span"
              variant="body-1"
              weight="semibold"
              color="neutral"
            >
              {monster.monsterName}
            </Text>
          </div>
          <ActionMenu
            monster={{
              monsterId: monster.monsterId,
              type: monster.type,
              status: monster.status,
              items: ITEMS,
              background: BACKGROUND_COLOR ?? '',
            }}
          />
        </div>
        <ProgressBar
          value={totalCount}
          max={monster.interactionCount}
          label="percent"
          reverse={monster.type === 'mad'}
        />
      </MonsterFlipCard.Content>
      <MonsterFlipCard.Back>
        <Text
          className={cn(
            'max-h-ful m-auto flex shrink',
            'whitespace-pre-wrap text-center leading-relaxed',
            'scroller overflow-y-auto',
          )}
          component="p"
          variant="body-2"
          weight="regular"
          color="strong"
          wrap
        >
          {monster.content}
        </Text>
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
