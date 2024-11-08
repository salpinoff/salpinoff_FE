import { PropsWithChildren, useMemo } from 'react';

import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';

import { motion } from 'framer-motion';
import { debounce } from 'lodash';

import Text from '@components/common/Text';

import cn from '@utils/cn';

export type CounterBoxProps = PropsWithChildren & {
  startAt: number;
  endAt: number;
  step?: number;
  delay?: number;
  helperText?: string;
  onCount: (count: number) => void;
  onComplete?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};

const countAtom = atomWithReset<number>(0);

const readWriteAtom = atom(
  (get) => get(countAtom),
  (get, set, step: number) => set(countAtom, get(countAtom) + step),
);

export default function CounterBox({
  children,
  startAt,
  endAt,
  step = 1,
  delay = 300,
  helperText,
  onCount,
  onComplete,
  onMouseDown,
  onMouseUp,
}: CounterBoxProps) {
  const [count, increment] = useAtom(readWriteAtom);
  const resetAtom = useResetAtom(countAtom);

  const transition = { type: 'spring', stiffness: 400, damping: 17 };

  const debouncedCount = useMemo(
    () =>
      debounce((clickCount: number) => {
        onCount(clickCount * step);
        resetAtom();
      }, delay),
    [],
  );

  const handleClick = () => {
    if (count + startAt < endAt) {
      increment(step);
      debouncedCount(count + 1);
    } else {
      onComplete?.();
    }
  };

  return (
    <>
      <motion.div
        className="h-full w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.5 },
          },
        }}
      >
        <motion.button
          className="pointer m-auto h-full w-full"
          whileHover={{ scale: 1.15 }}
          whileTap={{
            scale: 0.8,
            rotate: 5 * (Math.random() * 2 - 1),
          }}
          transition={transition}
          variants={{
            visible: {
              y: [-10, 8],
              transition: {
                delay: 0.5,
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'mirror',
              },
            },
          }}
          onClick={handleClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {children}
        </motion.button>

        {helperText && startAt < endAt && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 mx-auto h-max w-max rounded-circular bg-[#171719bd] px-[16px] py-[6px]"
            initial={{
              y: '200%',
            }}
            whileInView={{
              y: -16,
              transition: {
                duration: 0.5,
              },
            }}
          >
            <Text
              component="span"
              variant="label-2"
              weight="medium"
              color="normal"
            >
              {helperText}
            </Text>
          </motion.div>
        )}
      </motion.div>
      <Text
        variant="title-3"
        weight="bold"
        color="normal"
        className={cn(
          'pointer-events-none select-none overflow-hidden',
          'h-[72px] w-[72px] rounded-[20px]',
          'absolute bottom-0 left-0 right-0 top-0 m-auto',
          'border border-[#FFFFFF47] bg-[#FFFFFF6B] backdrop-blur-sm',
          'text-center leading-[72px]',
        )}
        style={{
          visibility:
            count !== 0 && count + startAt < endAt ? 'visible' : 'hidden',
        }}
      >
        {count}
      </Text>
    </>
  );
}
