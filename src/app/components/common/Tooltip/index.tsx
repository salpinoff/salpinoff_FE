import {
  Children,
  type ComponentProps,
  type RefObject,
  isValidElement,
  useMemo,
  useState,
  cloneElement,
  createElement,
} from 'react';

import { useFloating, offset, arrow, shift } from '@floating-ui/react-dom';

import useOutsideClick from '@hooks/useOutsideClick';

import { TooltipLabel } from './TooltipLabel';
import { Context, TooltipPropvider } from './TooltipProvider';
import { TooltipContent } from './TootlpContent';

type LabelProps = ComponentProps<typeof TooltipLabel>;
type ContentProps = ComponentProps<typeof TooltipContent>;
type Props = Omit<Context, 'toggleOpen'> & ComponentProps<'button'>;

function Tooltip({ label, content, children, className }: Props) {
  const [labelChild] = Children.toArray(children)
    .filter(isValidElement<LabelProps>)
    .filter((child) => {
      const type = child.type.valueOf();
      return (
        typeof type === 'object' &&
        'displayName' in type &&
        type.displayName === 'TooltipLabel'
      );
    });

  const [contentChild] = Children.toArray(children)
    .filter(isValidElement<ContentProps>)
    .filter((child) => {
      const type = child.type.valueOf();
      return (
        typeof type === 'object' &&
        'displayName' in type &&
        type.displayName === 'TooltipContent'
      );
    });

  const [isOpen, setIsOpen] = useState(false);

  const [arrowEl, setArrowEl] = useState(null);

  const { refs, placement, floatingStyles, middlewareData } = useFloating({
    open: isOpen,
    placement: 'bottom',
    middleware: [
      shift(),
      offset(10),
      arrow({
        element: arrowEl,
      }),
    ],
  });

  const staticSide =
    {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]] ?? '';

  useOutsideClick(
    [refs.floating, refs.reference as RefObject<HTMLElement>],
    () => setIsOpen(false),
    'touchend',
  );

  const value = useMemo(
    () => ({
      label,
      content,
      toggleOpen: () => setIsOpen((prev) => !prev),
    }),
    [label, content, setIsOpen],
  );

  return (
    <TooltipPropvider value={value} className={className}>
      {cloneElement(labelChild, {
        ref: refs.setReference,
        ...labelChild.props,
      })}

      {cloneElement(
        contentChild,
        {
          ref: refs.setFloating,
          style: {
            ...floatingStyles,
            visibility: isOpen ? 'visible' : 'hidden',
          },
        },
        // Tooltip Arrow
        createElement('div', {
          ref: setArrowEl,
          style: {
            position: 'absolute',
            width: '10px',
            height: '10px',
            top: middlewareData.arrow?.y ?? 0,
            left: middlewareData.arrow?.x ?? 0,
            background: 'inherit',
            transform: 'rotate(45deg)',
            [staticSide]: -5,
          },
        }),
      )}
    </TooltipPropvider>
  );
}

Tooltip.Label = TooltipLabel;
Tooltip.Content = TooltipContent;

export default Tooltip;
