import { LazyMotion, domAnimation, m } from 'framer-motion';

import BaseText from '@components/common/Text/BaseText';

type ProgressBarProps = {
  value: number;
  min?: number;
  max?: number;
  label?: 'none' | 'percent' | 'numeric';
  fractionDigits?: 0 | 1 | 2;
};

export default function ProgressBar({
  value,
  min = 0,
  max = 100,
  label = 'none',
  fractionDigits = 0,
}: ProgressBarProps) {
  const percent = Math.min(Math.min(value / max) * 100, 100);

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
            aria-valuenow={percent}
            className="h-full rounded-circular bg-current"
            initial={{
              width: 0,
            }}
            animate={{
              width: `${percent}%`,
            }}
          />
        </LazyMotion>
      </div>
      {label !== 'none' && (
        <BaseText
          component="span"
          variant="label-1"
          weight="semibold"
          className="w-2/12 text-right"
        >
          {label === 'percent' && `${percent.toFixed(fractionDigits)}%`}
          {label === 'numeric' && `${value}/${max}`}
        </BaseText>
      )}
    </div>
  );
}
