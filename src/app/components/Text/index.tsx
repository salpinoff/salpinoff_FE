import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

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

const textBase = cva(null, {
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
    overflow: {
      truncate: 'truncate',
      ellipsis: 'text-ellipsis',
      clip: 'text-clip',
    },
    wrap: {
      true: 'text-wrap',
      false: 'text-nowrap',
    },
  },
  // 스타일 처리 조건
  compoundVariants: generateCompounds<
    (typeof FONT_TYPES)[number],
    (typeof FONT_WEIGHTS)[number]
  >(FONT_TYPES, FONT_WEIGHTS),

  // 기본 스타일
  defaultVariants: {
    variant: 'body-1',
    weight: 'regular',
    wrap: false,
  },
});

export type TextProps<T extends React.ElementType> = VariantProps<
  typeof textBase
> & {
  component?: T;
} & React.ComponentPropsWithoutRef<T>;

export function Text<T extends React.ElementType>({
  component,
  children,
  className,
  variant,
  weight,
  align,
  decoration,
  overflow,
  wrap,
  ...rest
}: React.PropsWithChildren<TextProps<T>>) {
  const Component: React.ElementType = component || 'p';

  return (
    <Component
      className={twMerge(
        className,
        textBase({ variant, weight, align, decoration, overflow, wrap }),
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
