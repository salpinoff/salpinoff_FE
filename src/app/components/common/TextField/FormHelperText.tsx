import React from 'react';

import ErrorSVG from '@public/icons/error.svg';

import BaseText, { type BaseTextProps } from '@components/common/Text/BaseText';

export type FormHelperTextProps<T extends React.ElementType = 'p'> =
  React.PropsWithChildren<Pick<BaseTextProps<T>, 'color' | 'align'>> & {
    error?: boolean;
  } & React.ComponentPropsWithoutRef<T>;

export default function FormHelperText<T extends React.ElementType = 'p'>({
  children,
  className,
  align,
  error,
  ...rest
}: FormHelperTextProps<T>) {
  return (
    <BaseText
      className={className}
      variant="label-2"
      weight="regular"
      align={align}
      {...(error ? { color: 'error' } : {})}
      {...rest}
    >
      {error && <ErrorSVG />}
      {children}
    </BaseText>
  );
}
