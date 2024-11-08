import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';

import { motion, useAnimation, useInView } from 'framer-motion';

import cn from '@utils/cn';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type AnimatedNumberProps = ComponentPropsWithoutRef<'div'> & {
  animateToNumber: number;
};

function AnimatedNumber({ className, animateToNumber }: AnimatedNumberProps) {
  const ref = useRef(null);
  const keyCount = useRef(0);
  const numericRecRef = useRef<HTMLSpanElement>(null);

  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  const [numberWidth, setNumberWidth] = useState(0);
  const [numberHeight, setNumberHeight] = useState(0);

  const animateToNumbersArr = Array.from(
    String(Math.abs(animateToNumber)),
    Number,
  );

  useEffect(() => {
    if (numericRecRef.current) {
      const { width, height } = numericRecRef.current.getBoundingClientRect();

      setNumberHeight(height);
      setNumberWidth(width);
    }

    return () => {
      setNumberHeight(0);
      setNumberWidth(0);
    };
  }, [animateToNumber]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, animateToNumber]);

  return (
    <div ref={ref}>
      {numberHeight !== 0 && (
        <div className={cn('flex overflow-hidden', className)}>
          {animateToNumbersArr.map((n, index) => (
            <div
              key={`${animateToNumber}-${index.toString()}`}
              style={{ height: numberHeight, width: numberWidth }}
            >
              {NUMBERS.map((number) => {
                const destY = -1 * (numberHeight * animateToNumbersArr[index]);

                keyCount.current += 1;

                return (
                  <motion.div
                    className="tabular-nums"
                    key={`${keyCount.current}`}
                    initial="hidden"
                    variants={{
                      hidden: {
                        y: 0,
                      },
                      visible: {
                        y: destY,
                      },
                    }}
                    animate={controls}
                    transition={{
                      type: 'tween',
                      delay: index * 0.2,
                    }}
                  >
                    {number}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      <span
        ref={numericRecRef}
        className="fixed -top-full tabular-nums opacity-0"
      >
        0
      </span>
    </div>
  );
}

export default AnimatedNumber;
