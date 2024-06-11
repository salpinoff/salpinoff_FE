import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  forwardRef,
} from 'react';

type Props = ComponentPropsWithoutRef<ElementType> & {
  id: 'bottom_sheet_content';
  as?: ElementType;
};

function BottomSheetContent(
  {
    children,
    className,
    as: As = 'div',
    id = 'bottom_sheet_content',
    ...restProps
  }: Props,
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <As ref={ref} id={id} className={className} {...restProps}>
      {children}
    </As>
  );
}

export default forwardRef<HTMLElement, Props>(BottomSheetContent);
