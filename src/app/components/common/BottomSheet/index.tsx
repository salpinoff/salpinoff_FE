'use client';

import {
  Children,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  cloneElement,
  isValidElement,
} from 'react';

import useBottomSheet from '@hooks/useBottomSheet/index';

import cn from '@utils/cn';

type BottomSheetProps = ComponentPropsWithoutRef<'div'> & {
  initialHeight?: number;
  topY?: number;
};
type BottomSheetChildProps = ComponentPropsWithRef<ElementType> & {
  id?: 'bottom_sheet_header' | 'bottom_sheet_content';
};

function BottomSheet({
  children,
  className,
  initialHeight = 163,
  topY = 60,
  ...restProps
}: BottomSheetProps) {
  const { sheet, content } = useBottomSheet({ initialHeight, topY });

  const validChildren = Children.toArray(children).filter(
    isValidElement<BottomSheetChildProps>,
  );

  const headerChild = validChildren.find(
    ({ props: { id } }) => id === 'bottom_sheet_header',
  );
  const contentChild = validChildren.find(
    ({ props: { id } }) => id === 'bottom_sheet_content',
  );

  return (
    <div
      ref={sheet}
      id="portal"
      style={{
        height: `calc(100% - ${topY}px)`,
        transform: `translateY(calc(100% - ${initialHeight}px))`,
      }}
      className={cn(
        'flex flex-col',
        'transition-transform',
        'rounded-t-24 bg-cool-neutral-7',
        'absolute bottom-0 left-0 right-0 m-auto w-full max-w-md',
        className,
      )}
      {...restProps}
    >
      {headerChild}
      {contentChild &&
        cloneElement(contentChild, { ...contentChild?.props, ref: content })}
    </div>
  );
}

export default BottomSheet;
