import { cva } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';

import { BasicCard } from '@components/MonsterCard/BasicCard';

import cn from '@utils/cn';
import { findObjectInArray } from '@utils/find';

import { GetMonsterResponse } from '@api/monster/types';
import { DecorationType } from '@api/schema/monster';

const shadeStyles = cva('absolute border-[5px] bg-cool-neutral-7 opacity-35', {
  variants: {
    color: {
      GREEN: 'border-green-70',
      RED_ORANGE: 'border-red-orange-70',
      CYAN: 'border-cyan-70',
      LIGHT_BLUE: 'border-light-blue-70',
      VIOLET: 'border-violet-70',
    },
  },
});

export default function MonsterCard({
  monsterName,
  monsterDecorations,
}: Pick<GetMonsterResponse, 'monsterName' | 'monsterDecorations'>) {
  const color = findObjectInArray(
    monsterDecorations,
    'decorationType',
    DecorationType.BACKGROUND_COLOR,
  )?.decorationValue;

  const transition = {
    type: 'spring',
    bounce: 0.4,
    duration: 0.8,
  };

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
        {/* Shade */}
        <motion.div
          className={cn(
            'h-[240px] w-[240px] overflow-hidden rounded-[36px]',
            shadeStyles({
              color,
            }),
          )}
          style={{ originX: 0, originY: 1.65 }}
          variants={{
            onscreen: {
              y: -35,
              rotate: 6,
              transition,
            },
          }}
        />
        {/* Card */}
        <motion.div
          variants={{
            onscreen: {
              rotate: -10,
              transition,
            },
          }}
        >
          <BasicCard name={monsterName} color={color} />
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
