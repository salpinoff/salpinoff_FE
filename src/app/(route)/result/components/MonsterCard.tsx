import Image from 'next/image';

import { cva } from 'class-variance-authority';
import { motion, Variants, AnimatePresence } from 'framer-motion';

import BaseText from '@components/common/Text/BaseText';

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

const monsterCardStyles = cva(
  'h-[240px] w-[240px] rounded-[36px] overflow-hidden',
  {
    variants: {
      background: {
        green: ['bg-green-70', 'outline-green-70'],
        'red-orange': ['bg-red-orange-70', 'outline-red-orange-70'],
        cyan: ['bg-cyan-70', 'outline-cyan-70'],
        'light-blue': ['bg-light-blue-70', 'outline-light-blue-70'],
        violet: ['bg-violet-70', 'outline-violet-70'],
      },
    },
  },
);

export default function MonsterCard({ name }: MonsterCardProps) {
  const background = 'violet';

  const cardVariants: Variants = {
    onscreen: {
      rotate: -10,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
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
        <motion.div
          className={cn(
            monsterCardStyles(),
            shadeStyles({
              background,
            }),
          )}
          style={{ originX: 0, originY: 1.65 }}
          variants={{
            onscreen: {
              y: -35,
              rotate: 6,
              transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
              },
            },
          }}
        />
        <motion.div
          className={cn(
            monsterCardStyles({ background }),
            'flex items-center justify-center border-[10px] border-cool-neutral-7 shadow-3 outline outline-[5px]',
          )}
          variants={cardVariants}
        >
          <Image
            src="/sample.png"
            width={200}
            height={200}
            alt="Sample Monster"
          />
          <div className="absolute bottom-0 flex h-[25px] items-center justify-center text-cool-neutral-7">
            <svg
              width="113"
              height="32"
              viewBox="0 0 113 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8887 7.95492L0.0595703 28.2537H112.06L96.2305 7.95492C92.4407 3.09497 86.6219 0.253662 80.4589 0.253662H31.6602C25.4972 0.253662 19.6785 3.09497 15.8887 7.95492Z"
                fill="currentColor"
              />
            </svg>
            <BaseText
              className="absolute w-[60%] text-center"
              component="span"
              variant="label-2"
              weight="semibold"
              color="normal"
              overflow="truncate"
              maxRows={1}
            >
              {name}
            </BaseText>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
