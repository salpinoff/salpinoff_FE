import React, {
  ComponentProps,
  ComponentPropsWithRef,
  forwardRef,
} from 'react';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

import cn from '@utils/cn';

type MenuProps = ComponentPropsWithRef<'div'> & {
  open?: boolean;
};

type MenuItemProps = ComponentProps<'button'>;

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        size="small"
        variant="ghost"
        className="group w-full rounded-8 p-[14px] hover:bg-cool-neutral-20"
        {...rest}
      >
        <BaseText
          className="pointer-events-none flex w-max select-none items-center justify-between gap-8"
          component="span"
          color="normal"
          variant="label-2"
          weight="medium"
        >
          {children}
        </BaseText>
      </Button>
    );
  },
);

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ open, children, className, ...rest }, ref) => {
    return open ? (
      <div
        ref={ref}
        role="menu"
        className={cn(
          'w-max overflow-hidden rounded-12 bg-[#212225] p-4 shadow-2',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    ) : null;
  },
);

Menu.displayName = 'Menu';
MenuItem.displayName = 'MenuItem';

export { Menu, MenuItem };
