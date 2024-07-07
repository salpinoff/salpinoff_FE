import { PropsWithChildren } from 'react';

type CardContentProps = PropsWithChildren;

export default function CardContent({ children }: CardContentProps) {
  return (
    <div className="flex h-[88px] w-full flex-col gap-12 rounded-b-[28px] bg-cool-neutral-7 px-20 py-12">
      {children}
    </div>
  );
}
