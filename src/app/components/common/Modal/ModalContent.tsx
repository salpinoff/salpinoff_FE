import { forwardRef } from 'react';

const ModalContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function ModalContent({ children }: React.PropsWithChildren, ref) {
  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 top-0 z-50 m-auto grid h-max w-[312px] gap-24 rounded-20 bg-[#141415] p-24"
    >
      {children}
    </div>
  );
});

export default ModalContent;