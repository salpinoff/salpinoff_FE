import {
  CSSProperties,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import { debounce } from 'lodash';

import BaseText from '@components/common/Text/BaseText';

type VisibilityType = CSSProperties['visibility'];

type CounterBoxProps = PropsWithChildren & {
  startAt: number;
  endAt: number;
  step?: number;
  delay?: number;
  helperText?: string;
  onCount: Dispatch<SetStateAction<number>>;
  onCountEnd: () => void;
};

export default function CounterBox({
  children,
  startAt,
  endAt,
  step = 1,
  delay = 300,
  helperText,
  onCount,
  onCountEnd,
}: CounterBoxProps) {
  const [count, setCount] = useState(0);
  const [visibility, setVisibility] = useState<VisibilityType>('hidden');

  const debouncedCount = useMemo(
    () =>
      debounce((clickCount) => {
        onCount((prev) => Math.min(prev + clickCount + step, endAt));
        setCount(0);
        setVisibility('hidden');
      }, delay),
    [endAt, step, delay, onCount],
  );

  const handleClick = () => {
    if (count + startAt < endAt) {
      setCount((prev) => prev + step);
      setVisibility('visible');

      debouncedCount(count);
    } else {
      onCountEnd();
    }
  };

  return (
    <>
      <motion.div
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
          className="pointer absolute bottom-0 left-0 right-0 top-0 m-auto h-max w-max"
          whileHover={{ scale: 1.15 }}
          whileTap={{
            scale: 0.8,
            rotate: 5 * (Math.random() * 2 - 1),
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
        >
          {children}
        </motion.button>
        {helperText && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 mx-auto h-max w-max rounded-circular bg-[#171719bd] px-[16px] py-[6px]"
            variants={{
              hidden: {
                y: '200%',
              },
              visible: {
                y: -16,
                transition: {
                  duration: 0.5,
                },
              },
            }}
          >
            <BaseText
              component="span"
              variant="label-2"
              weight="medium"
              color="normal"
            >
              {helperText}
            </BaseText>
          </motion.div>
        )}
      </motion.div>
      <BaseText
        variant="heading-1"
        color="normal"
        className="fixed bottom-0 left-0 right-0 top-0 m-auto h-[50px] w-[50px] select-none overflow-hidden rounded-8 bg-[#ffffff10] text-center leading-[50px] backdrop-blur-sm"
        style={{
          visibility,
        }}
      >
        {count}
      </BaseText>
    </>
  );
}
