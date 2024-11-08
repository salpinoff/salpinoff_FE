import { forwardRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const badgeBoxStyles = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'aspect-square',
    'rounded-circular',
    'text-center',
  ],
  {
    variants: {
      variant: {
        dot: ['relative', 'w-max'],
        standard: [],
        string: [],
      },
      color: {
        primary: ['bg-[--color-brand-primary-base]', 'text-black'],
        alternative: ['bg-cool-neutral-7'],
        inverse: '',
      },
    },
    compoundVariants: [
      {
        variant: ['standard', 'string'],
        className: ['flex', 'gap-8', 'items-center'],
      },
    ],
    defaultVariants: {
      variant: 'string',
    },
  },
);

export const badgeStyles = cva('truncate', {
  variants: {
    variant: {
      dot: [
        'absolute',
        'right-0',
        'top-0',
        'scale-100',
        'translate-x-full',
        '-translate-y-2/4',
        'aspect-square',
        'rounded-circular',
      ],
      standard: [
        'rounded-full',
        'py-4',
        'px-8',
        'leading-[1.2]',
        'font-semibold',
      ],
      string: ['leading-[inherit]', 'bg-transparent'],
    },
    color: {
      primary: ['bg-[--color-brand-primary-base]', 'text-black'],
      alternative: ['bg-cool-neutral-7'],
      inverse: ['bg-[--color-text-inverse]', 'text-black'],
    },
    size: {
      24: [],
    },
  },
  compoundVariants: [
    {
      variant: ['standard', 'string'],
      size: [24],
      className: ['min-w-24', 'max-h-24', 'label-1-regular'],
    },
    {
      variant: 'string',
      color: 'primary',
      className: '!text-[--color-text-brand]',
    },
    {
      variant: 'string',
      color: 'inverse',
      className: '!text-[--color-text-inverse]',
    },
  ],
  defaultVariants: {
    variant: 'string',
    color: 'primary',
    size: 24,
  },
});

export type BadgeProps<T extends React.ElementType = 'span'> =
  React.ComponentPropsWithRef<T> &
    VariantProps<typeof badgeStyles> & {
      component?: T;
      max?: number;
      count: number;
      showZero?: boolean;
    };

const Badge = forwardRef(
  <T extends React.ElementType = 'span'>(
    {
      component,
      className,
      children,
      variant,
      color,
      count,
      max = 99,
      showZero = false,
      ...rest
    }: BadgeProps<T>,
    ref: React.Ref<Element>,
  ) => {
    const Component: React.ElementType = component || 'span';

    if (!showZero && count === 0) {
      return <Component className={className}>{children}</Component>;
    }

    return (
      <Component
        ref={ref}
        className={cn(badgeBoxStyles({ variant, color }), className)}
        {...rest}
      >
        {children}
        <span className={badgeStyles({ variant, color })}>
          {variant !== 'dot' && (count > max ? `${max}+` : count)}
        </span>
      </Component>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
