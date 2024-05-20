import { cva, cx, VariantProps } from 'class-variance-authority';

const badgeWrapper = cva('', {
  variants: {
    variant: {
      dot: ['relative', 'w-max'],
      standard: [],
      string: [],
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
});

export const badge = cva('truncate', {
  variants: {
    variant: {
      dot: [
        'max-w-8',
        'h-8',
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

export type BadgeProps<T extends React.ElementType> = React.PropsWithChildren<
  VariantProps<typeof badge>
> &
  React.ComponentPropsWithRef<T> & {
    count: number;
    max?: number;
    showZero?: boolean;
  };

export default function Badge<T extends React.ElementType = 'span'>({
  className,
  children,
  variant,
  max = 99,
  color,
  count,
  showZero = false,
}: BadgeProps<T>) {
  if (!showZero && count === 0) {
    return <div className={className}>{children}</div>;
  }

  return (
    <span className={cx(badgeWrapper({ variant }), className)}>
      <span className="shrink-0">{children}</span>
      <span className={badge({ variant, color })}>
        {variant !== 'dot' && (count > max ? `${max}+` : count)}
      </span>
    </span>
  );
}
