import React from 'react';

import Icon, { IconProps } from '@components/common/data-display/Icon';

import Button, { ButtonProps } from '../Button';

export type IconButtonProps = Omit<ButtonProps, 'size'> &
  Pick<IconProps, 'name' | 'size' | 'stroke'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, name, size, stroke, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        className={className}
        {...rest}
      >
        <Icon name={name} size={size} stroke={stroke} />
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
