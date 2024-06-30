import { PropsWithChildren } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import OutlineCard from '@components/OutlineCard';

import SquareMonsterCard from 'src/app/(route)/(monster)/component/SquareMonsterCard';

const MotionSquareShadeCard = motion(OutlineCard);
const MotionSquareMonsterCard = motion(SquareMonsterCard);

type AnimatedSpreadCardProps = PropsWithChildren & {
  name: string;
  color: string;
};

export default function AnimatedSpreadCard({
  name,
  color,
  children,
}: AnimatedSpreadCardProps) {
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
          {children}
        </MotionSquareMonsterCard>
      </motion.section>
    </AnimatePresence>
  );
}
