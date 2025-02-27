import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

import { FONT_TYPES, FONT_WEIGHTS } from './Text.constants';

const generateBoolVariants = <T extends string>(
  variants: readonly T[],
): { [K in T]: true } =>
  variants.reduce((a, v) => ({ ...a, [v]: true }), {} as { [K in T]: true });

const generateCompounds = <T extends string, U extends string>(
  variants: readonly T[],
  weights: readonly U[],
) =>
  variants.flatMap((variant) =>
    weights.map((weight) => ({
      variant,
      weight,
      className: [variant, weight].join('-'),
    })),
  );

const textStyles = cva('', {
  variants: {
    // 타입 추론용 (스타일 적용 x)
    variant: generateBoolVariants<(typeof FONT_TYPES)[number]>(FONT_TYPES),
    // 타입 추론용 (스타일 적용 x)
    weight: generateBoolVariants<(typeof FONT_WEIGHTS)[number]>(FONT_WEIGHTS),
    align: {
      center: 'text-center',
      justify: 'text-justify',
      left: 'text-left',
      right: 'text-right',
    },
    decoration: {
      none: 'no-underline',
      underline: 'underline',
      overline: 'overline',
      lineTrough: 'line-through',
    },
    maxRows: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
    },
    overflow: {
      truncate: 'truncate',
      ellipsis: 'text-ellipsis',
      clip: 'text-clip',
    },
    wrap: {
      true: 'text-wrap',
      false: 'text-nowrap',
    },
    color: {
      // Semantic
      info: 'text-[--color-text-info]',
      success: 'text-[--color-text-success]',
      warning: 'text-[--color-text-warning]',
      error: 'text-[--color-text-danger]',
      // Brand
      primary: 'text-[--color-text-brand]',
      // Label
      normal: 'text-cool-neutral-99',
      strong: 'text-common-100',
      neutral: 'text-cool-neutral-90A',
      alternative: 'text-cool-neutral-80A',
      assistive: 'text-[#AEB0B647]',
      disabled: 'text-cool-neutral-70A',
    },
  },
  // 스타일 처리 조건
  compoundVariants: [
    ...generateCompounds<
      (typeof FONT_TYPES)[number],
      (typeof FONT_WEIGHTS)[number]
    >(FONT_TYPES, FONT_WEIGHTS),
    {
      maxRows: [1, 2, 3, 4, 5, 6],
      className: 'text-wrap',
    },
  ],
  // 기본 스타일
  defaultVariants: {
    variant: 'body-1',
    weight: 'regular',
  },
});

export type TextProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> &
    VariantProps<typeof textStyles> & {
      component?: T;
    };

export default function Text<T extends React.ElementType = 'p'>({
  component,
  children,
  className,
  variant,
  weight,
  align,
  color,
  decoration,
  maxRows,
  overflow,
  wrap,
  ...rest
}: TextProps<T>) {
  const Component: React.ElementType = component || 'p';

  return (
    <Component
      className={cn(
        textStyles({
          variant,
          weight,
          align,
          decoration,
          maxRows,
          overflow,
          wrap,
          color,
        }),
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
