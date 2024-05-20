import Spin from '@public/icons/spin.svg';

import cn from '@utils/cn';

type Props = {
  className?: string;
  stroke?: string;
};

function Spinner({ className, stroke }: Props) {
  return (
    <div className={cn('h-24 w-24', className)}>
      <Spin className={cn('text-cool-neutral-90', stroke)} />
    </div>
  );
}

export default Spinner;
