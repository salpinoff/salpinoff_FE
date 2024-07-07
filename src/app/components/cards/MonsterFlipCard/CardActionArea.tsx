import { ComponentProps } from 'react';

import cn from '@utils/cn';

type CardActionAreaProps = ComponentProps<'div'>;

export default function CardActionArea({
  className,
  children,
  ...rest
}: CardActionAreaProps) {
  return (
    <div
      className={cn('relative h-full w-full rounded-t-[28px] p-16', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
