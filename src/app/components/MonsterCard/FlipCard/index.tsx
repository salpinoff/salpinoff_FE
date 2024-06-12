'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { AnimatePresence, motion } from 'framer-motion';

import BaseText from '@components/common/Text/BaseText';
import CardBase from '@components/MonsterCard/CardBase';

import { findObjectInArray } from '@utils/find';

import { monsterAtom } from '@store/monsterAtom';

import CounterBox from './CounterBox';
import Dropdown from './Dropdown';
import HiddenStory from './HiddenStory';
import ProgressBar from './ProgressBar';

type MonsterFlipCardProps = {
  isOwner?: boolean;
  onFlipped?: (arg?: unknown) => void;
};

export default function MonsterFlipCard({
  isOwner = false,
  onFlipped,
}: MonsterFlipCardProps) {
  const [{ data: monster }] = useAtom(monsterAtom);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const findDecoration = findObjectInArray(
    monster?.monsterDecorations || [],
    'decorationType',
  );

  const COLOR = findDecoration?.('BACKGROUND_COLOR')?.decorationValue;

  const handleCardToggle = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    if (monster) {
      if (totalCount >= monster?.interactionCountPerEncouragement) {
        setIsFlipped(true);

        if (onFlipped) onFlipped();
      }
    }
  }, [totalCount, monster, setIsFlipped]);

  return (
    <AnimatePresence>
      <div
        className="h-[460px] w-[312px]"
        style={{
          perspective: '1000px',
        }}
      >
        <motion.div
          className="h-full w-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.85, animationDirection: 'normal' }}
          onAnimationComplete={() => setIsAnimating(false)}
          style={{
            transition: 'transform 0.6',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Flip Card Front */}
          <CardBase
            type="flip"
            color={COLOR}
            className="absolute overflow-visible"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex h-full w-full flex-col justify-between">
              <div className="relative h-full w-full overflow-hidden rounded-t-[28px] p-16">
                <BaseText
                  component="h3"
                  variant="label-2"
                  weight="semibold"
                  className="mx-auto w-max text-cool-neutral-7"
                >
                  {monster?.ownerName}님의 퇴사몬
                </BaseText>

                <CounterBox
                  startAt={totalCount}
                  endAt={monster?.interactionCountPerEncouragement || 0}
                  onCount={setTotalCount}
                  onComplete={handleCardToggle}
                  {...(isOwner
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
              <div className="flex h-[88px] flex-col gap-12 rounded-b-[28px] bg-cool-neutral-7 p-20">
                <div className="flex items-center justify-between">
                  <div className="flex gap-8">
                    <div className="flex rounded-6 bg-[#70737c47] px-8 py-4">
                      <BaseText
                        component="span"
                        variant="caption-2"
                        color="neutral"
                      >
                        스트레스 {}
                      </BaseText>
                    </div>
                    <BaseText
                      overflow="truncate"
                      component="span"
                      variant="body-1"
                      weight="semibold"
                      color="neutral"
                    >
                      {monster?.monsterName}
                    </BaseText>
                  </div>
                  {isOwner && <Dropdown />}
                </div>
                <ProgressBar
                  value={totalCount}
                  max={monster?.interactionCountPerEncouragement}
                />
              </div>
            </div>
          </CardBase>

          {/* Flip Card Back */}
          <CardBase
            role="none" // DO NOT REMOVE!!!
            type="flip"
            color={COLOR}
            className="absolute overflow-visible"
            onClick={handleCardToggle}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <HiddenStory owner={isOwner}>{monster?.content}</HiddenStory>
          </CardBase>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
