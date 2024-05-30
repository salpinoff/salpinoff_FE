import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const chipStyles = cva('w-max px-16 py-8 label-1-medium rounded-full', {
  variants: {
    variant: {
      filled: [],
    },
    color: {
      inverse: [],
      normal: [],
    },
    disabled: {
      true: '!text-cool-neutral-70A',
    },
  },

  compoundVariants: [
    {
      variant: 'filled',
      color: 'inverse',
      className: ['bg-common-100', 'text-neutral-10'],
    },
    {
      variant: 'filled',
      color: 'normal',
      className: ['bg-[#70737C38]', 'text-cool-neutral-90A'],
    },
  ],
  defaultVariants: {
    variant: 'filled',
    color: 'normal',
  },
});

export type ChipProps<T extends React.ElementType> = React.PropsWithChildren &
  VariantProps<typeof chipStyles> &
  React.ComponentPropsWithRef<T> & {
    label: string;
    clickable: boolean;
  };

export default function Chip<T extends React.ElementType = 'div'>({
  className,
  children,
  label,
  variant,
  clickable,
  disabled,
}: ChipProps<T>) {
  return (
    <div
      className={cn(chipStyles({ variant, disabled }), className)}
      {...(clickable ? { role: 'button' } : {})}
    >
      {label}
      {children && children}
    </div>
  );
}
