import cn from '@utils/cn';

type ModalDimmedProps = {
  blur?: boolean;
  className?: string;
};

export default function ModalDimmed({ blur, className }: ModalDimmedProps) {
  return (
    <div
      id="dimmed"
      className={cn(
        'fixed top-0 z-50 h-full w-full',
        // blur ? bg-12% : bg-88%
        blur ? 'bg-[#0000001F] backdrop-blur-[10px]' : 'bg-[#000000e0]',
        className,
      )}
    />
  );
}
