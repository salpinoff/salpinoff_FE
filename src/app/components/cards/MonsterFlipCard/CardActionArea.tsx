import { PropsWithChildren } from 'react';

type CardActionAreaProps = PropsWithChildren;

export default function CardActionArea({ children }: CardActionAreaProps) {
  return (
    <div className="relative h-full w-full rounded-t-[28px] p-16">
      {children}
    </div>
  );
}
