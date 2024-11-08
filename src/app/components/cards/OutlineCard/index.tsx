import { forwardRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const cardStyles = cva(
  'relative flex items-center justify-center overflow-hidden border-[11px] border-cool-neutral-7 shadow-[0_0_0_5px] bg-current text-transparent',
  {
    variants: {},
  },
);

export type OutlineCardProps = VariantProps<typeof cardStyles> &
  React.ComponentPropsWithRef<'div'> & {
    width?: number;
    height?: number;
  };

const OutlineCard = forwardRef<HTMLDivElement, OutlineCardProps>(
  function OutlineCard(
    { className, children, color, width, height, ...rest },
    ref,
  ) {
    const { style, ...otherProps } = rest;

    return (
      <div
        ref={ref}
        className={cn(cardStyles(), className)}
        style={{
          color,
          width,
          height,
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </div>
    );
  },
);

export default OutlineCard;
