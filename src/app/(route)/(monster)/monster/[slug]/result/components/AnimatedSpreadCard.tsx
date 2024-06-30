import { motion, AnimatePresence } from 'framer-motion';

import CharacterCanvas from '@components/CharacterCanvas';
import OutlineCard from '@components/OutlineCard';

import { findObjectInArray } from '@utils/find';

import { DecorationType, Emotion, Monster } from '@api/schema/monster';

import SquareMonsterCard from 'src/app/(route)/(monster)/component/SquareMonsterCard';

const MotionSquareShadeCard = motion(OutlineCard);
const MotionSquareMonsterCard = motion(SquareMonsterCard);

type AnimatedSpreadCardProps = {
  name: string;
  emotion: Monster['emotion'];
  decorations: Monster['monsterDecorations'];
};

export default function AnimatedSpreadCard({
  name,
  emotion,
  decorations,
}: AnimatedSpreadCardProps) {
  const transition = {
    type: 'spring',
    bounce: 0.4,
    duration: 0.8,
  };

  const color = findObjectInArray(
    decorations,
    'decorationType',
    DecorationType.BACKGROUND_COLOR,
  )?.decorationValue;

  const CHARACTER_TYPE = emotion === Emotion.ANGER ? 'mad' : 'sad';
  const CHARACTER_ITEMS = decorations
    .map(
      (deco) =>
        deco.decorationType !== DecorationType.BACKGROUND_COLOR &&
        deco.decorationValue.toLowerCase(),
    )
    .filter(Boolean) as string[];

  return (
    <AnimatePresence mode="wait">
      <motion.section
        layout
        layoutRoot
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="h-[240px] w-[240px]"
      >
        <MotionSquareShadeCard
          className="absolute aspect-square h-[240px] w-[240px] rounded-[36px] bg-cool-neutral-7 opacity-35"
          color={color}
          style={{ originX: 0, originY: 1.65 }}
          variants={{
            onscreen: {
              y: -35,
              rotate: 6,
              transition,
            },
          }}
        />
        <MotionSquareMonsterCard
          name={name}
          color={color}
          variants={{
            onscreen: {
              rotate: -10,
              transition,
            },
          }}
        >
          <CharacterCanvas
            type={CHARACTER_TYPE}
            items={CHARACTER_ITEMS}
            className="mb-[30px] h-full w-full"
          />
        </MotionSquareMonsterCard>
      </motion.section>
    </AnimatePresence>
  );
}
