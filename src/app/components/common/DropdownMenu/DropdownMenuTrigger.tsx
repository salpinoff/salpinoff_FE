import {
  Children,
  cloneElement,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react';

import mergeRefs from '@utils/client/merge-ref';

import { DropdownMenuContext } from './DropdownMenuProvider';

export type DropdownMenuTriggerProps = PropsWithChildren;

const DropdownMenuTrigger = forwardRef(
  (
    { children }: DropdownMenuTriggerProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const child = Children.only(children) as ReactElement;

    const context = useContext(DropdownMenuContext);

    return (
      context &&
      cloneElement(child, {
        ref: mergeRefs([ref, context.triggerRef]),
        'aria-expanded': context.open,
        'data-state': context.open ? 'open' : 'closed',
        onPointerDown: (e: MouseEvent) => {
          context.onOpenToggle();

          if (!context.open) {
            e.stopPropagation();
            e.preventDefault();
          }
        },
      })
    );
  },
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export default DropdownMenuTrigger;
