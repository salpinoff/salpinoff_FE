import { ComponentProps } from 'react';

import cn from '@utils/cn';

type Props = Omit<ComponentProps<'div'>, 'children'>;

function Loader({ className, ...restProps }: Props) {
  return (
    <div
      aria-hidden
      className={cn('h-3 w-3 animate-pulse bg-[#212225]', className)}
      {...restProps}
    />
  );
}

export default Loader;
