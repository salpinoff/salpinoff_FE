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
  onCount: Dispatch<SetStateAction<number>>;
  onCountEnd: () => void;
};

export default function CounterBox({
  children,
  startAt,
  endAt,
  step = 1,
  delay = 300,
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
      <motion.button
        className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max w-max"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleClick}
      >
        {children}
      </motion.button>
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
