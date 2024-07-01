import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { toast, Toaster, resolveValue } from 'react-hot-toast';

import { useAtom } from 'jotai';

import { motion } from 'framer-motion';
import { debounce, find } from 'lodash';

import LogoSVG from '@public/icons/logo.svg';

import MonsterFlipCard from '@components/cards/MonsterFlipCard';
import CharacterCanvas from '@components/CharacterCanvas';
import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';
import CounterBox from '@components/CounterBox';
import ProgressBar from '@components/ProgressBar';

import { DecorationType, Emotion } from '@api/schema/monster';

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
  const [{ isPending, isError, data: monster }] = useAtom(monsterAtom);
  const { clear } = useContext(GuestContext);

  const [flipped, setFlipped] = useState(clear);
  const [totalCount, setTotalCount] = useState(clear ? 999 : 0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleCard = () => setFlipped((prev) => !prev);

  const handleClick: MouseEventHandler = (e) => {
    if (clear) {
      e.preventDefault();
      toggleCard();
    }
  };

  const handleMouseDown = debounce(() => setIsMouseDown(true), 5000, {
    leading: true,
    trailing: false,
  });

  const handleMouseUp = debounce(() => setIsMouseDown(false), 1000, {
    leading: false,
    trailing: true,
  });

  useEffect(() => {
    toast('화면을 연타하면 사연을 볼 수 있어요', {
      id: 'initial',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  }, []);

  useEffect(() => {
    if (
      monster &&
      !clear &&
      totalCount === monster.interactionCountPerEncouragement
    ) {
      toast('숨겨진 사연이 열렸어요, 한번 더 탭하세요!', {
        id: 'complete',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  });

  // [TODO] Pending, Error 페이지 구현
  if (isPending)
    return <div className="h-full w-full text-white">Loading...</div>;

  if (isError) return <div className="h-full w-full text-white">Error</div>;

  const COLOR =
    find(monster.monsterDecorations, {
      decorationType: DecorationType.BACKGROUND_COLOR,
    })?.decorationValue || '';

  const CHARACTER_TYPE = monster.emotion === Emotion.ANGER ? 'mad' : 'sad';

  return (
    <>
      <header className="flex w-full items-center justify-center">
        <LogoSVG width={115} height={20} />
      </header>
      <MonsterFlipCard
        width={312}
        height={460}
        color={COLOR}
        flipped={flipped}
        onClick={handleClick}
      >
        <MonsterFlipCard.ActionArea>
          <CounterBox
            startAt={totalCount}
            endAt={monster.interactionCountPerEncouragement}
            onCount={setTotalCount}
            onComplete={onCompeleteInteraction}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div className="h-[260px] w-[260px] pb-[32px]">
              <CharacterCanvas
                className="h-full w-full"
                type={CHARACTER_TYPE}
                status={clear || isMouseDown ? 'after' : 'before'}
              />
              <CharacterCanvas
                className="absolute h-full w-full"
                // [TODO] 이후 서버 아이템 BACKGROUND_COLOR 이외의 카테고리 허용 시 변경
                items={['laptop', 'coffee', 'glasses']}
              />
            </div>
          </CounterBox>
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
            <BaseText
              className="flex rounded-6 bg-[#70737c47] px-8 py-4"
              component="span"
              variant="caption-2"
              color="neutral"
            >
              스트레스 {monster.ratingRange}
            </BaseText>
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
