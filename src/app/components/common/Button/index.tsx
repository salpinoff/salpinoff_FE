import { forwardRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import SpinSVG from '@public/icons/spin.svg';

import Icon from '@components/common/Icon';

import cn from '@utils/cn';

const buttonStyles = cva(
  'body-2-semibold h-[55px] disabled:!text-cool-neutral-70A disabled:!bg-cool-neutral-22',
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
        small: [
          'label-1-medium',
          'w-[128px]',
          'h-[44px]',
          'rounded-8',
          'px-12',
          'py-[10px]',
        ],
        medium: ['w-[164px]', 'rounded-12', 'px-16', 'py-[10px]'],
        large: ['w-[335px]', 'rounded-12', 'px-16', 'py-[10px]'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

export type ButtonProps = React.PropsWithChildren<
  VariantProps<typeof buttonStyles> & {
    loading?: boolean;
  }
> &
  React.ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, variant, size, loading, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(buttonStyles({ variant, size }), className)}
      {...rest}
    >
      {!loading && children}
      {loading && (
        <Icon size={24}>
          <SpinSVG />
        </Icon>
      )}
    </button>
  );
});

export default Button;
