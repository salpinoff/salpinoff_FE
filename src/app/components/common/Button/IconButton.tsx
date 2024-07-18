import { forwardRef } from 'react';

import Icon, { IconProps } from '@components/common/data-display/Icon';

import cn from '@utils/cn';

import { ExtractProps } from '@type/util';

import Button from '.';

export type IconButtonProps = Omit<ExtractProps<typeof Button>, 'size'> &
  Pick<IconProps, 'name' | 'size' | 'stroke'>;

const IconButton = forwardRef(
  (
    { className, name, size, stroke, ...rest }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <Button
        ref={ref}
        className={cn('h-[24px] w-[24px] p-0', className)}
        variant="ghost"
        {...rest}
      >
        <Icon name={name} size={size} stroke={stroke} />
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
