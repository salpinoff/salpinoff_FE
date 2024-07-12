import { ComponentProps } from 'react';

import cn from '@utils/cn';

type CardContentProps = ComponentProps<'div'>;

export default function CardContent({
  className,
  children,
  ...rest
}: CardContentProps) {
  return (
    <div
      className={cn(
        'flex h-[88px] w-full flex-col gap-12 rounded-b-[28px] bg-cool-neutral-7 px-20 py-12 outline outline-cool-neutral-7',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
