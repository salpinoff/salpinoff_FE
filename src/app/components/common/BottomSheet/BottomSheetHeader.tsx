import { ComponentPropsWithRef } from 'react';

import cn from '@utils/cn';

type Props = ComponentPropsWithRef<'div'> & { id: 'bottom_sheet_header' };

function BottomSheetHeader({
  ref,
  children,
  className,
  id = 'bottom_sheet_header',
}: Props) {
  return (
    <div
      id={id}
      ref={ref}
      className={cn('relative', 'w-full pb-8 pt-12', className)}
    >
      <div
        className={cn(
          'h-1 w-[46px]',
          'rounded-[100px] bg-cool-neutral-25',
          'absolute left-0 right-0 top-12 m-auto',
        )}
      />
      {children}
    </div>
  );
}

export default BottomSheetHeader;
