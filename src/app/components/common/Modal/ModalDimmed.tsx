import cn from '@utils/cn';

type ModalDimmedProps = {
  blur?: boolean;
};

export default function ModalDimmed({ blur }: ModalDimmedProps) {
  return (
    <div
      className={cn(
        'fixed top-0 z-50 h-full w-full bg-[#000000e0]',
        blur ? 'backdrop-blur	' : '',
      )}
    />
  );
}
