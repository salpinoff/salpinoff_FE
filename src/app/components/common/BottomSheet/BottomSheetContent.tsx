import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  forwardRef,
} from 'react';

type Props = ComponentPropsWithoutRef<ElementType> & {
  id: 'bottom_sheet_content';
  component?: ElementType;
};

function BottomSheetContent(
  {
    children,
    className,
    component: Component = 'div',
    id = 'bottom_sheet_content',
    ...restProps
  }: Props,
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <Component ref={ref} id={id} className={className} {...restProps}>
      {children}
    </Component>
  );
}

export default forwardRef<HTMLElement, Props>(BottomSheetContent);
