import { forwardRef } from 'react';

import cn from '@utils/cn';

const ModalContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      role="dialog"
      className={cn(
        'absolute bottom-0 left-0 right-0 top-0 z-50 m-auto flex h-max max-h-fit w-[312px] flex-col gap-24 rounded-20 bg-[#141415] p-24',
        className,
      )}
    >
      {children}
    </div>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
