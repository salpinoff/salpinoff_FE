import { cva } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';

import { BasicCard } from '@components/MonsterCard/BasicCard';

import cn from '@utils/cn';

type MonsterCardProps = {
  name: string;
  // decorations: unknown[];
};

const shadeStyles = cva('absolute border-[5px] bg-cool-neutral-7 opacity-35', {
  variants: {
    background: {
      green: 'border-green-70',
      'red-orange': 'border-red-orange-70',
      cyan: 'border-cyan-70',
      'light-blue': 'border-light-blue-70',
      violet: 'border-violet-70',
    },
  },
});

export default function MonsterCard({ name }: MonsterCardProps) {
  const background = 'violet';

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
              background,
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
          <BasicCard name={name} color={background} />
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
