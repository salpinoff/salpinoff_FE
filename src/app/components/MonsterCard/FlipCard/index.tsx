'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import DownloadSVG from '@public/icons/download.svg';
import EditSVG from '@public/icons/edit.svg';
import ShareSVG from '@public/icons/share.svg';

import FlipCard from '@components/FlipCard';
import CardBase from '@components/MonsterCard/CardBase';

import { findObjectInArray } from '@utils/find';

import { monsterAtom } from '@store/monsterAtom';

import CounterBox from './CounterBox';
import Dropdown from './Dropdown';
import HiddenStory from './HiddenStory';
import OwnerInfo from './OwnerInfo';
import ProgressBar from './ProgressBar';
import StressLevelWithName from './StressLevelWithName';

type MonsterFlipCardProps = {
  flip?: boolean;
  owner?: boolean;
  onFlipped?: (arg?: unknown) => void;
};

const DROPDOWN_LIST = [
  {
    text: '저장하기',
    icon: <DownloadSVG />,
    onClick: () => {
      // [TODO]: 저장하기 기능 구현
    },
  },
  {
    text: '공유하기',
    icon: <ShareSVG />,
    onClick: () => {
      // [TODO]: 공유하기 로직 추가
    },
  },
  {
    text: '수정하기',
    icon: <EditSVG />,
    onClick: () => {
      // [TODO]: 수정하기 페이지 이동 로직 추가
    },
  },
];

export default function MonsterFlipCard({
  flip = false,
  owner = false,
  onFlipped,
}: MonsterFlipCardProps) {
  const [{ data: monster }] = useAtom(monsterAtom);
  const [flipped, setFlipped] = useState(flip);
  const [totalCount, setTotalCount] = useState(flip ? 999 : 0);

  const {
    ownerName = '',
    monsterName = '',
    content = '',
    ratingRange = '',
    interactionCountPerEncouragement: interactionCount = 0,
    monsterDecorations = [],
  } = monster ?? {};

  const findDecoration = findObjectInArray(
    monsterDecorations,
    'decorationType',
  );

  const COLOR = findDecoration?.('BACKGROUND_COLOR')?.decorationValue;

  const toggleCard = () => setFlipped((prev) => !prev);

  useEffect(() => {
    if (interactionCount && totalCount >= interactionCount) {
      setFlipped(true);
    }
  }, [interactionCount, totalCount, monster, setFlipped]);

  return (
    <FlipCard
      className="m-[5px] h-[460px] w-[312px]"
      flipped={flipped}
      onFlipped={onFlipped}
    >
      {/* Flip Card Front */}
      <CardBase
        type="flip"
        color={COLOR}
        className="flex h-full w-full flex-col justify-between overflow-visible"
      >
        {/* MonsterCard Main */}
        <div className="relative h-full w-full rounded-t-[28px] p-16">
          {!owner && <OwnerInfo name={ownerName} />}
          <CounterBox
            startAt={totalCount}
            endAt={interactionCount}
            onCount={setTotalCount}
            onComplete={toggleCard}
            {...(owner
              ? {}
              : { helperText: '화면을 연타하면 사연을 볼 수 있어요' })}
          >
            <Image
              src="/sample.png"
              width={227}
              height={192}
              alt="Sample Monster"
            />
          </CounterBox>
        </div>
        {/* MonsterCard Bottom */}
        <div className="flex h-[88px] w-full flex-col gap-12 rounded-b-[28px] bg-cool-neutral-7 px-20 py-12">
          <div className="flex items-center justify-between">
            <StressLevelWithName level={ratingRange} name={monsterName} />
            {owner && (
              <Dropdown offset={8} placement="top" list={DROPDOWN_LIST} />
            )}
          </div>
          <ProgressBar value={totalCount} max={interactionCount} />
        </div>
      </CardBase>

      {/* Flip Card Back */}
      <CardBase type="flip" color={COLOR} className="overflow-visible">
        <HiddenStory owner={owner} content={content} onClick={toggleCard} />
      </CardBase>
    </FlipCard>
  );
}
