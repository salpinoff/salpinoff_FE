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
      className={cn(
        'relative h-[calc(100%-88px)] w-full select-none overflow-hidden rounded-t-[28px]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
