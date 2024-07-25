import { LazyMotion, domAnimation, m } from 'framer-motion';

import BaseText from '@components/common/Text/BaseText';

type ProgressBarProps = {
  value: number;
  min?: number;
  max?: number;
  label?: 'none' | 'percent' | 'numeric';
  fractionDigits?: 0 | 1 | 2;
  reverse?: boolean;
};

export default function ProgressBar({
  value,
  min = 0,
  max = 100,
  label = 'none',
  fractionDigits = 0,
  reverse = false,
}: ProgressBarProps) {
  const percentage = reverse
    ? ((max - value) / max) * 100
    : (value / max) * 100;

  return (
    <div className="flex items-center gap-8 last:text-inherit">
      <div className="h-[14px] w-10/12 overflow-hidden rounded-circular bg-cool-neutral-17">
        {/* Indicator */}
        <LazyMotion features={domAnimation}>
          <m.div
            role="progressbar"
            aria-describedby="Progression"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={percentage}
            className="h-full rounded-circular bg-current"
            initial={{
              width: 0,
            }}
            animate={{
              width: `${percentage}%`,
            }}
          />
        </LazyMotion>
      </div>
      {label !== 'none' && (
        <BaseText
          component="span"
          variant="label-1"
          weight="semibold"
          className="pointer-event-none w-2/12 select-none text-right"
        >
          {label === 'percent' && `${percentage.toFixed(fractionDigits)}%`}
          {label === 'numeric' &&
            (reverse ? (max - value) / max : value / max).toFixed(
              fractionDigits,
            )}
        </BaseText>
      )}
    </div>
  );
}
