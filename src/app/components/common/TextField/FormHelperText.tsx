import { cx } from 'class-variance-authority';

import ErrorSVG from '@public/icons/error.svg';

import Icon from '@components/common/Icon';
import Text, { type TextProps } from '@components/common/Text';

export type FormHelperTextProps<T extends React.ElementType = 'p'> =
  React.ComponentPropsWithoutRef<T> &
    Pick<TextProps<T>, 'color' | 'align'> & {
      error?: boolean;
      component?: T;
    };

export default function FormHelperText<T extends React.ElementType = 'p'>({
  children,
  component,
  className,
  align,
  error,
  ...rest
}: FormHelperTextProps<T>) {
  return (
    <Text
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
    </Text>
  );
}
