import { motion } from 'framer-motion';

import BaseText from '@components/common/Text/BaseText';

type ProgressBarProps = {
  value: number;
  max?: number;
};

export default function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  const percent = (Math.min(value / max) * 100).toFixed(1);

  return (
    <div className="flex items-center gap-10 last:text-inherit">
      <div className="h-[14px] w-[194px] overflow-hidden rounded-circular bg-cool-neutral-17">
        {/* Indicator */}
        <motion.div
          className="h-full rounded-circular bg-current"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
        />
      </div>
      <BaseText component="span" variant="label-1" weight="semibold">
        {percent}%
      </BaseText>
    </div>
  );
}
