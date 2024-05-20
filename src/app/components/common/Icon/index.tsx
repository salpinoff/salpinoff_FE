import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

export const iconStyles = cva(
  ['inline-flex', 'items-center', 'justify-center'],
  {
    variants: {
      size: {
        12: ['w-12', 'h-12'],
        16: ['w-16', 'h-16'],
        20: ['w-20', 'h-20'],
        24: ['w-24', 'h-24'],
        32: ['w-32', 'h-32'],
        40: ['w-40', 'h-40'],
        44: ['w-44', 'h-44'],
        48: ['w-48', 'h-48'],
        64: ['w-64', 'h-64'],
      },
      stroke: {
        inherit: 'text-inherit',
        inverse: 'text-[--color-icon-inverse]',
        disabled: 'text-[--color-icon-disabled]',
        primary: 'text-[--color-icon-brand]',
        subtle: 'text-[--color-icon-subtle]',
        success: 'text-[--color-icon-success]',
        info: 'text-[--color-icon-info]',
        warning: 'text-[--color-icon-warning]',
        danger: 'text-[--color-icon-danger]',
        pink: 'text-[--color-icon-accent-pink]',
        violet: 'text-[--color-icon-accent-pink]',
        blue: 'text-[--color-icon-accent-pink]',
        'light-blue': 'text-[--color-icon-accent-light-blue]',
        cyan: 'text-[--color-icon-accent-cyan]',
        green: 'text-[--color-icon-accent-green]',
        lime: 'text-[--color-icon-accent-lime]',
        orange: 'text-[--color-icon-accent-orange]',
        'red-orange': 'text-[--color-icon-accent-red-orange]',
        red: 'text-[--color-icon-accent-red]',
      },
    },
    defaultVariants: {
      size: 20,
      stroke: 'inherit',
    },
  },
);

export type IconProps<T extends React.ElementType> = VariantProps<
  typeof iconStyles
> &
  React.ComponentPropsWithoutRef<T> & {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    component?: T;
  };

export default function Icon<T extends React.ElementType = 'span'>({
  component,
  className,
  children,
  size,
  stroke,
}: IconProps<T>) {
  const Component: React.ElementType = component || 'span';

  return (
    <Component className={cn(iconStyles({ size, stroke }), className)}>
      {children}
    </Component>
  );
}
