import { PropsWithChildren } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import OutlineCard from '@components/cards/OutlineCard';

import SquareMonsterCard from 'src/app/(route)/(monster)/component/cards/SquareMonsterCard';

const MotionSquareShadeCard = motion(OutlineCard);
const MotionSquareMonsterCard = motion(SquareMonsterCard);

type AnimatedSpreadCardProps = PropsWithChildren & {
  name: string;
  color?: string;
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
        className="my-[55px] h-[240px] w-[240px]"
      >
        <MotionSquareShadeCard
          className="absolute aspect-square rounded-[36px] bg-cool-neutral-7 opacity-35 will-change-transform"
          color={color}
          width={240}
          height={240}
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
          className="will-change-transform"
          name={name}
          color={color}
          width={240}
          height={240}
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
