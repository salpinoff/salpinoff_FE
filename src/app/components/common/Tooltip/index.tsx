import {
  Children,
  type ComponentProps,
  type RefObject,
  isValidElement,
  useMemo,
  useState,
  cloneElement,
} from 'react';

import { useFloating, offset } from '@floating-ui/react-dom';

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
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: 'bottom-start',
    middleware: [offset(10)],
  });

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

      {cloneElement(contentChild, {
        ref: refs.setFloating,
        style: {
          ...floatingStyles,
          visibility: isOpen ? 'visible' : 'hidden',
        },
        ...contentChild.props,
      })}
    </TooltipPropvider>
  );
}

Tooltip.Label = TooltipLabel;
Tooltip.Content = TooltipContent;

export default Tooltip;
