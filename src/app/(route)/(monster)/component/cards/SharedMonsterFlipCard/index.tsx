import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { toast, Toaster, resolveValue } from 'react-hot-toast';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AxiosError, AxiosResponse } from 'axios';
import { motion } from 'framer-motion';

import MonsterFlipCard from '@components/cards/MonsterFlipCard';
import BaseText from '@components/common/Text/BaseText';
import ProgressBar from '@components/ProgressBar';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';

import MonsterQueryFactory, { MonsterKeys } from '@api/monster/query/factory';
import { GetMonsterResponse } from '@api/monster/types';

import { MonsterCounterBox, StressLevelBadge } from '../_ui';

type SharedMonsterFlipCardProps = {
  clear?: boolean;
  monsterId: string;
  onComplete: () => void;
};

const CARD_WIDTH = 312;
const CARD_HEIGHT = 460;

const ACTION_HELPER_TEXT = '화면을 연타하면 사연을 볼 수 있어요';
const CLEAR_HELPER_TEXT = '숨겨진 사연이 열렸어요, 한번 더 탭하세요!';

export default function SharedMonsterFlipCard({
  clear,
  monsterId,
  onComplete,
}: SharedMonsterFlipCardProps) {
  const { data: monster } = useSuspenseQuery<
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

  const [flipped, setFlipped] = useState(false);
  const [totalCount, setTotalCount] = useState(
    clear ? monster.interactionCountPerEncouragement : 0,
  );

  const { BACKGROUND_COLOR, ...restDecos } = monster.decorations;

  const ariaProps = {
    role: 'status',
    'aria-live': 'polite',
  } as const;

  const ITEMS = Object.values(restDecos);

  const toggleCard = () => setFlipped((prev) => !prev);

  const handleClick: MouseEventHandler = (e) => {
    if (totalCount >= monster.interactionCountPerEncouragement) {
      e.preventDefault();
      toggleCard();
    }
  };

  useEffect(() => {
    if (!clear)
      toast(ACTION_HELPER_TEXT, {
        id: 'initial',
        ariaProps,
      });
    else {
      toggleCard();
    }
  }, []);

  useEffect(() => {
    if (
      monster &&
      !clear &&
      totalCount === monster.interactionCountPerEncouragement
    ) {
      toast(CLEAR_HELPER_TEXT, {
        id: 'complete',
        ariaProps,
      });
    }
  });

  return (
    <MonsterFlipCard
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      color={BACKGROUND_COLOR}
      flipped={flipped}
      onClick={handleClick}
    >
      <MonsterFlipCard.ActionArea className="overflow-hidden p-0">
        <BaseText
          variant="label-2"
          weight="semibold"
          className="absolute left-0 right-0 mx-auto w-max p-16 text-cool-neutral-22"
        >
          {monster.ownerName}님의 퇴사몬
        </BaseText>
        <MonsterCounterBox
          items={ITEMS}
          type={monster.type}
          clear={clear}
          startAt={totalCount}
          onCount={setTotalCount}
          endAt={monster.interactionCountPerEncouragement}
          onComplete={onComplete}
        />
        <Toaster
          containerStyle={{
            position: 'absolute',
          }}
          position="bottom-center"
        >
          {(t) => (
            <motion.div
              className="h-max w-max rounded-circular bg-[#171719bd] px-[16px] py-[6px]"
              initial={{
                y: 20,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                },
              }}
            >
              <BaseText
                component="span"
                variant="label-2"
                weight="medium"
                color="normal"
              >
                {resolveValue(t.message, t)}
              </BaseText>
            </motion.div>
          )}
        </Toaster>
      </MonsterFlipCard.ActionArea>
      <MonsterFlipCard.Content>
        <div className="flex items-center gap-8">
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
        <ProgressBar
          value={totalCount}
          max={monster.interactionCountPerEncouragement}
          label="percent"
        />
      </MonsterFlipCard.Content>
      <MonsterFlipCard.Back>
        <div
          className="flex h-full w-full items-center justify-center"
          role="none"
        >
          <BaseText
            className="my-auto flex max-h-full overflow-y-auto text-center"
            component="p"
            variant="body-2"
            weight="medium"
            color="strong"
            wrap
          >
            {monster.content}
          </BaseText>
        </div>
      </MonsterFlipCard.Back>
    </MonsterFlipCard>
  );
}
