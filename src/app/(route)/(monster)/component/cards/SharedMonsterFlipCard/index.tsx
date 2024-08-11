import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AxiosError, AxiosResponse } from 'axios';

import MonsterFlipCard from '@components/cards/MonsterFlipCard';
import Text from '@components/common/Text';
import ProgressBar from '@components/ProgressBar';

import useCanvas from '@hooks/useCanvas';
import useConfetti from '@hooks/useConfetti';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import cn from '@utils/cn';

import ConfettiMap from '@constant/confetti';

import MonsterQueryFactory, { MonsterKeys } from '@api/monster/query/factory';
import { GetMonsterResponse } from '@api/monster/types';

import HelperToast from './HelperToast';
import { MonsterCounterBox } from '../_ui';

type SharedMonsterFlipCardProps = {
  clear?: boolean;
  monsterId: string;
  onComplete: () => void;
};

const SUB_FLIP_CARD_WIDTH = 302;
const SUB_FLIP_CARD_HEIGHT = 450;

const CANVAS_WIDTH = SUB_FLIP_CARD_WIDTH;
const CANVAS_HEIGHT = SUB_FLIP_CARD_HEIGHT - 88;

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
];

export default function SharedMonsterFlipCard({
  clear = false,
  monsterId,
  onComplete,
}: SharedMonsterFlipCardProps) {
  const {
    data: {
      ownerName,
      monsterName,
      rating,
      content,
      interactionCount,
      interactionCountPerEncouragement: threshold,
      type,
      decorations,
    },
  } = useSuspenseQuery<
    AxiosResponse<GetMonsterResponse>,
    AxiosError,
    ReturnType<typeof transformMonster<GetMonsterResponse>>,
    MonsterKeys['detail']['queryKey']
  >({
    ...MonsterQueryFactory.detail(monsterId),
    retry: 1,
    retryDelay: 1000,
    select: useCallback(
      (data: AxiosResponse<GetMonsterResponse>) =>
        Adapter.from(data.data).to(transformMonster),
      [],
    ),
  });

  const canvasRef = useCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  const { addConfetti } = useConfetti(canvasRef);

  const [flipped, setFlipped] = useState(clear);
  const [totalCount, setTotalCount] = useState(clear ? threshold : 0);

  const { BACKGROUND_COLOR, ...restDecos } = decorations;

  const ITEMS = Object.values(restDecos);

  const handleClick: MouseEventHandler = (e) => {
    if (totalCount === threshold) {
      e.preventDefault();

      setFlipped((prev) => !prev);
    }
  };

  useEffect(() => {
    const { message, opts } = TOAST[+clear];
    toast(message, opts);
  }, [clear]);

  return (
    <MonsterFlipCard
      width={SUB_FLIP_CARD_WIDTH}
      height={SUB_FLIP_CARD_HEIGHT}
      color={BACKGROUND_COLOR}
      flipped={flipped}
      onClick={handleClick}
    >
      <MonsterFlipCard.ActionArea>
        <Text
          variant="label-2"
          weight="semibold"
          className="absolute left-0 right-0 mx-auto w-max p-16 text-cool-neutral-22"
        >
          {ownerName}님의 퇴사몬
        </Text>
        <MonsterCounterBox
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          items={ITEMS}
          type={type}
          clear={clear}
          startAt={totalCount}
          onCount={(count) => {
            setTotalCount((prev) => Math.min(prev + count, interactionCount));
            addConfetti(ConfettiMap[type]);
          }}
          endAt={threshold}
          onComplete={onComplete}
        />
        {/* Effect */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute left-0 top-0 h-full w-full select-none"
        />
        <HelperToast />
      </MonsterFlipCard.ActionArea>
      <MonsterFlipCard.Content>
        <div className="flex items-center gap-8">
          <Text
            className="flex rounded-6 bg-[#70737c47] px-8 py-4"
            component="span"
            variant="caption-2"
            color="neutral"
          >
            스트레스 {rating}
          </Text>
          <Text
            overflow="truncate"
            component="span"
            variant="body-1"
            weight="semibold"
            color="neutral"
          >
            {monsterName}
          </Text>
        </div>
        <ProgressBar
          value={totalCount}
          max={threshold}
          label="percent"
          reverse={type === 'mad'}
        />
      </MonsterFlipCard.Content>
      <MonsterFlipCard.Back>
        <Text
          className={cn(
            'm-auto max-h-full shrink',
            'whitespace-pre-wrap text-center leading-relaxed',
            'scroller overflow-y-scroll scrollbar-hide',
          )}
          component="p"
          variant="body-2"
          weight="regular"
          color="strong"
          wrap
        >
          {content}
        </Text>
      </MonsterFlipCard.Back>
    </MonsterFlipCard>
  );
}
