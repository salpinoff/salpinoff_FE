import { ComponentProps } from 'react';

import Text from '@components/common/Text';

import cn from '@utils/cn';

type ToastProps = ComponentProps<'div'>;

export default function Toast({ className, children, ...rest }: ToastProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex h-max w-max items-center justify-center rounded-8 bg-[#141415] px-[24px] py-[12px]',
        className,
      )}
      {...rest}
    >
      <Text component="span" variant="label-2" weight="medium" color="normal">
        {children}
      </Text>
    </div>
  );
}
