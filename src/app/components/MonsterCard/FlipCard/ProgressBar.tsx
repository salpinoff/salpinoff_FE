import { motion } from 'framer-motion';

import BaseText from '@components/common/Text/BaseText';

type ProgressBarProps = {
  percent: number;
};

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-10 last:text-inherit">
      <div className="h-[14px] w-[194px] rounded-circular bg-cool-neutral-17">
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
