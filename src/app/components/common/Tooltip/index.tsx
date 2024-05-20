import { cva, cx, VariantProps } from 'class-variance-authority';

import { RequiredByKeys } from '@type/util';

const tooltipStyles = cva(
  ['rounded-8', 'px-16', 'py-12', 'label-1-regular', 'shadow-3'],
  {
    variants: {
      text: {
        white: 'text-white',
        primary: 'text-[--color-text-brand]',
      },
      background: {
        muted: 'bg-[--color-base-cool-neutral-17]',
        info: 'bg-[--color-background-info]',
        dark: 'bg-[--color-base-cool-neutral-5]',
      },
      arrow: {
        true: '',
      },
      border: {
        true: ['border', 'border-current'],
      },
    },
    defaultVariants: {
      text: 'white',
      background: 'muted',
    },
  },
);

export type TooltipType<T extends React.ElementType> = RequiredByKeys<
  React.PropsWithChildren<VariantProps<typeof tooltipStyles>> &
    React.ComponentPropsWithoutRef<T> & {
      open?: boolean;
      closeButton?: boolean;
    },
  ''
>;

export default function Tooltip<T extends React.ElementType = 'span'>({
  className,
  children,
  text,
  background,
  border,
  arrow,
  closeButton,
  ...rest
}: TooltipType<T>) {
  return (
    <div
      role="tooltip"
      className={cx(
        tooltipStyles({ text, background, border, arrow }),
        className,
      )}
      {...rest}
    >
      {children}
      {/* 🚧 */}
      {closeButton && <button type="button">Close</button>}
    </div>
  );
}
