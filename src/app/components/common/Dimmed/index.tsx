import cn from '@utils/cn';

type DimmedProps = {
  blur?: boolean;
  darken?: boolean;
  className?: string;
};

export default function Dimmed({
  blur,
  darken = false,
  className,
}: DimmedProps) {
  return (
    <div
      id="dimmed"
      className={cn(
        'absolute top-0 z-50 h-full w-full',
        blur && 'backdrop-blur-[10px]',
        // bg-88% :  bg-12% :
        darken ? 'bg-[#000000e0]' : 'bg-[#0000001F]',
        className,
      )}
    />
  );
}
