import React, { ComponentProps, forwardRef, useContext } from 'react';

import Button from '@components/common/Button';
import Text from '@components/common/Text';

import { DropdownMenuContext } from './DropdownMenuProvider';

type MenuItemProps = ComponentProps<'button'> & {
  onSelect?: (event: Event) => void;
};

const DropdownMenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, onSelect, ...rest }, ref) => {
    const context = useContext(DropdownMenuContext);

    return (
      <Button
        ref={ref}
        role="menuitem"
        size="small"
        variant="ghost"
        className="group w-full rounded-8 p-[14px] hover:bg-cool-neutral-20"
        onPointerDown={(e) => {
          onSelect?.(e);
          context?.onOpenToggle();
        }}
        {...rest}
      >
        <Text
          className="pointer-events-none flex w-max select-none items-center justify-between gap-8"
          component="span"
          color="normal"
          variant="label-2"
          weight="medium"
        >
          {children}
        </Text>
      </Button>
    );
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

export default DropdownMenuItem;
