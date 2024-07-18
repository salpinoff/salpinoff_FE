import React, { ComponentPropsWithRef, useContext } from 'react';

import { offset, shift, useFloating } from '@floating-ui/react-dom';

import useOutsideClick from '@hooks/useOutsideClick';

import cn from '@utils/cn';

import { DropdownMenuContext } from './DropdownMenuProvider';

type MenuProps = ComponentPropsWithRef<'div'> & {
  open?: boolean;
};

function DropdownMenuContent({
  children,
  className,
  style,
  ...rest
}: MenuProps) {
  const context = useContext(DropdownMenuContext);

  const { refs, floatingStyles } = useFloating({
    open: context?.open,
    placement: 'top',
    middleware: [shift(), offset(8)],
    elements: {
      reference: context?.triggerRef.current,
    },
  });

  useOutsideClick([refs.floating], () => context?.onOpenToggle(), 'mousedown');

  return (
    context?.open && (
      <div
        ref={refs.setFloating}
        role="menu"
        tabIndex={-1}
        id={context.contentId}
        className={cn('w-max', className)}
        style={{
          ...style,
          ...floatingStyles,
        }}
        {...rest}
      >
        {children}
      </div>
    )
  );
}

DropdownMenuContent.displayName = 'DropdownMenuContent';

export default DropdownMenuContent;
