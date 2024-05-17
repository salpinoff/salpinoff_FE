import { ComponentPropsWithRef } from 'react';

import Spinner from '@components/Spinner';

import cn from '@utils/cn';

interface Props extends ComponentPropsWithRef<'button'> {
  loading?: boolean;
  primary?: boolean;
}

function BaseButton({
  loading,
  disabled,
  children,
  className,
  primary = false,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-12 py-16',
        {
          'body-2-semibold bg-[var(--color-background-button-primary-base)] text-cool-neutral-10':
            primary,
        },
        {
          'body-2-normal bg-[var(--color-background-button-secondary-base)] text-cool-neutral-90':
            !primary,
        },
        {
          'disabled:bg-cool-neutral-22 disabled:text-cool-neutral-70A':
            !loading,
        },
        className,
      )}
    >
      {!loading && children}
      {loading && <Spinner />}
    </button>
  );
}

export default BaseButton;
