'use client';

import { useState, useEffect } from 'react';

import { LayoutGroup } from 'framer-motion';

import Button from '@components/common/Button';

import { useQueryString } from '@hooks/useQueryString';

import { Monster } from '@api/schema/monster';

import GuidMessage from './components/GuidMessage';
import MonsterCard from './components/MonsterCard';

type MonsterResultResponse = Omit<Monster, 'rating'>;

export default function SharePage() {
  const [monsterId] = useQueryString('monsterId');
  const [monster, setMonster] = useState<MonsterResultResponse>();

  useEffect(() => {
    // Temp
    if (monsterId) {
      setMonster({
        monsterId: 1,
        monsterName: '빡침몬',
        interactionCount: 100,
        currentInteractionCount: 60,
        emotion: 'DEPRESSION',
        content: '거 참 퇴사하기 딱 좋은 날씨네',
        monsterDecorations: [
          {
            decorationId: 1,
            decorationType: 'BACKGROUND_COLOR',
            decorationValue: 'BLUE',
          },
        ],
      });
    }
  }, [monsterId]);

  if (!monsterId) {
    return <div>No monster ID provided in the URL</div>;
  }

  if (!monster) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mx-auto flex h-dvh items-center justify-center bg-gradient-to-b from-cool-neutral-5 to-[#253047]">
      <div className="flex h-[573px] flex-col items-center justify-between">
        <LayoutGroup>
          <GuidMessage />
          <MonsterCard
            name={monster.monsterName}
            // decorations={monster.monsterDecorations}
          />
        </LayoutGroup>
        <footer className="flex flex-col">
          <Button size="medium">바로 공유하기</Button>
          <Button size="medium" variant="ghost">
            다음에 할래요
          </Button>
        </footer>
      </div>
    </main>
  );
}
