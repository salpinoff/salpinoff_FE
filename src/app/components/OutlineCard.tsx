import { forwardRef, PropsWithChildren } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const cardStyles = cva(
  'relative flex items-center justify-center overflow-hidden border-[10px] border-cool-neutral-7 shadow-[0_0_0_5px] bg-current text-transparent',
  {
    variants: {},
  },
);

export type OutlineCardProps = PropsWithChildren<
  VariantProps<typeof cardStyles>
> &
  React.ComponentPropsWithRef<'div'>;

const OutlineCard = forwardRef<HTMLDivElement, OutlineCardProps>(
  function OutlineCard({ className, children, color, style, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(cardStyles(), className)}
        style={{
          color,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export default OutlineCard;
