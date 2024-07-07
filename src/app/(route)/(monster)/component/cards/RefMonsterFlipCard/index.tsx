'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import MonsterFlipCard from '@components/cards/MonsterFlipCard';
import CharacterCanvas from '@components/CharacterCanvas';
import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';
import ProgressBar from '@components/ProgressBar';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';

import MonsterQueryFactory, { MonsterKeys } from '@api/monster/query/factory';
import { GetMonsterRefResponse } from '@api/monster/types';

import { ActionMenu, StressLevelBadge } from '../_ui';

const CARD_WIDTH = 312;
const CARD_HEIGHT = 460;

export default function RefMonsterFlipCard() {
  const router = useRouter();

  const { data: monster } = useSuspenseQuery<
    GetMonsterRefResponse,
    AxiosError,
    ReturnType<typeof transformMonster<GetMonsterRefResponse>>,
    MonsterKeys['reference']['queryKey']
  >({
    ...MonsterQueryFactory.reference(),
    select: useCallback(
      (data: GetMonsterRefResponse) => Adapter.from(data).to(transformMonster),
      [],
    ),
  });

  const [flipped, setFlipped] = useState(false);

  const toggleCard = () => setFlipped((prev) => !prev);

  console.log('monster : ', monster);
  return (
    <MonsterFlipCard
      className="mx-auto"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flipped={flipped}
      color={monster.decorations.BACKGROUND_COLOR}
    >
      <MonsterFlipCard.ActionArea onClick={toggleCard}>
        <div className="relative m-auto h-[260px] w-[260px]">
          <CharacterCanvas
            className="h-full w-full"
            type={monster.type}
            status={monster.status}
          />
          <CharacterCanvas
            className="absolute h-full w-full"
            // [TODO] 이후 서버 아이템 BACKGROUND_COLOR 이외의 카테고리 허용 시 변경
            items={['laptop', 'coffee', 'glasses']}
          />
        </div>
      </MonsterFlipCard.ActionArea>
      <MonsterFlipCard.Content>
        <div className="flex items-center justify-between">
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
          <ActionMenu targetId={monster.monsterId} />
        </div>
        <ProgressBar
          value={monster.currentInteractionCount}
          max={monster.interactionCount}
          label="percent"
        />
      </MonsterFlipCard.Content>
      <MonsterFlipCard.Back>
        <div
          className="flex h-full w-full items-center justify-center"
          role="none"
          onClick={toggleCard}
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
        <Button
          variant="secondary"
          size="small"
          className="w-full"
          onClick={() => {
            router.push(`/monster/${monster.monsterId}/modify/story`);
          }}
        >
          내용 수정하기
        </Button>
      </MonsterFlipCard.Back>
    </MonsterFlipCard>
  );
}
