import { PropsWithChildren } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const cardStyles = cva(
  'relative flex items-center justify-center overflow-hidden border-[10px] border-cool-neutral-7 shadow-3 outline outline-[5px] bg-current',
  {
    variants: {
      type: {
        basic: ['h-[240px]', 'w-[240px]', 'rounded-[36px]'],
        flip: ['w-[312px]', 'h-[460px]', 'rounded-[40px]'],
      },
      color: {
        GREEN: ['text-green-70', 'outline-green-70'],
        RED_ORANGE: ['text-red-orange-70', 'outline-red-orange-70'],
        CYAN: ['text-cyan-70', 'outline-cyan-70'],
        LIGHT_BLUE: ['text-light-blue-70', 'outline-light-blue-70'],
        VIOLET: ['text-violet-70', 'outline-violet-70'],
      },
    },
    defaultVariants: {
      type: 'basic',
    },
  },
);

export type CardBaseProps = PropsWithChildren<VariantProps<typeof cardStyles>> &
  React.ComponentPropsWithRef<'div'>;

export default function CardBase({
  className,
  children,
  type,
  color,
  ...rest
}: CardBaseProps) {
  return (
    <div className={cn(cardStyles({ type, color }), className)} {...rest}>
      {children}
    </div>
  );
}
