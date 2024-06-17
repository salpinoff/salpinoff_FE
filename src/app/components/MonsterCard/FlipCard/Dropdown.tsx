import { Fragment, useEffect, useId, useMemo, useRef, useState } from 'react';

import { Placement, offset, useFloating } from '@floating-ui/react-dom';
import { animate } from 'framer-motion';

import EllipsisSVG from '@public/icons/ellipsis.svg';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

import useOutsideClick from '@hooks/useOutsideClick';

type DropdownProps = {
  list: {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
  offset?: number;
  placement?: Placement;
};

export default function Dropdown({
  list,
  offset: _offset = 0,
  placement,
}: DropdownProps) {
  const internalId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { floatingStyles } = useFloating({
    open: isOpen,
    placement,
    middleware: [offset(_offset)],
    elements: {
      reference: triggerRef.current,
      floating: menuItemsRef.current,
    },
  });

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const stateProps = useMemo(
    () => ({
      'aria-expanded': isOpen,
      ...(isOpen && { 'data-open': '' }),
    }),
    [isOpen],
  );

  useOutsideClick(
    [triggerRef, menuItemsRef],
    () => setIsOpen(false),
    'mousedown',
  );

  useEffect(() => {
    const animation = animate(
      menuItemsRef.current!,
      isOpen
        ? { opacity: 1, visibility: 'visible' }
        : { opacity: 0, visibility: 'hidden' },
      {
        duration: 0.1,
      },
    );

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isOpen]);

  return (
    <div className="relative w-[55px] text-right shadow-2">
      <Button
        ref={triggerRef}
        id={`menu-button-${internalId}`}
        variant="ghost"
        className="inline-flex h-32 w-32 items-center justify-center rounded-circular p-0 data-[open]:bg-[#5050501f]"
        onClick={toggleDropdown}
        {...stateProps}
      >
        <EllipsisSVG className="text-cool-neutral-40" />
      </Button>

      <div
        role="menu"
        id={`menu-items-${internalId}`}
        className="w-max overflow-hidden rounded-12 bg-[#212225] p-4 shadow-2"
        ref={menuItemsRef}
        style={{
          ...floatingStyles,
          opacity: 0,
        }}
      >
        {list.map(({ text, icon, onClick }, idx) => (
          <Fragment key={text}>
            <button
              className="group flex w-full items-center justify-between gap-8 rounded-8 p-[14px] hover:bg-cool-neutral-20"
              onClick={() => {
                toggleDropdown();
                onClick?.();
              }}
            >
              <BaseText
                className="pointer-events-none w-max select-none"
                component="span"
                color="normal"
                variant="label-2"
                weight="medium"
              >
                {text}
              </BaseText>
              {icon}
            </button>
            {idx !== list.length - 1 && (
              <div className="my-1 h-px bg-white/5" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
