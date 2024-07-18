import { cx } from 'class-variance-authority';

import ErrorSVG from '@public/icons/error.svg';

import Icon from '@components/common/data-display/Icon';
import BaseText, { type BaseTextProps } from '@components/common/Text/BaseText';

export type FormHelperTextProps<T extends React.ElementType = 'p'> =
  React.PropsWithChildren<Pick<BaseTextProps<T>, 'color' | 'align'>> & {
    error?: boolean;
    component?: T;
  } & React.ComponentPropsWithoutRef<T>;

export default function FormHelperText<T extends React.ElementType = 'p'>({
  children,
  component,
  className,
  align,
  error,
  ...rest
}: FormHelperTextProps<T>) {
  return (
    <BaseText
      component={component || 'p'}
      className={cx('flex items-center gap-4', className)}
      variant="label-2"
      weight="regular"
      align={align}
      {...(error ? { color: 'error' } : { color: 'alternative' })}
      {...rest}
    >
      {error && (
        <Icon size={20}>
          <ErrorSVG width={14} height={14} />
        </Icon>
      )}
      {children}
    </BaseText>
  );
}
