import React from 'react';

import Icon, { IconProps } from '@components/common/data-display/Icon';

import Button, { ButtonProps } from '../Button';

export type IconButtonProps = Omit<ButtonProps, 'size'> &
  Pick<IconProps, 'name' | 'size' | 'stroke'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, name, size = 24, stroke, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        className={className}
        {...rest}
      >
        <Icon name={name} size={size} stroke={stroke} asChild />
        {children}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
