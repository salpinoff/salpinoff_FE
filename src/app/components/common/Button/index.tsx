import React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import Icon from '@components/common/data-display/Icon';

import cn from '@utils/cn';

export const buttonVariants = cva(
  'body-2-semibold h-[55px] disabled:!text-cool-neutral-70A disabled:bg-cool-neutral-22',
  {
    variants: {
      variant: {
        primary: [
          'bg-[--color-background-button-primary-base]',
          'text-cool-neutral-10',
        ],
        secondary: ['bg-cool-neutral-23', 'text-cool-neutral-90A'],
        ghost: ['bg-transparent', 'text-cool-neutral-99'],
      },
      size: {
        small: 'label-1-medium w-[128px] h-[44px] rounded-8 px-12 py-[10px]',
        medium: 'w-[164px] rounded-12 px-16 py-[10px]',
        large: 'w-[335px] rounded-12 px-16 py-[10px]',
        icon: 'h-[24px] w-[24px] p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant, size, asChild, loading, disabled, ...rest },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...rest}
      >
        {!loading && children}
        {loading && <Icon size={24} name="spin" />}
      </Component>
    );
  },
);

Button.displayName = 'Button';

export default Button;
