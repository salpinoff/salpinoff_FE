import { ComponentProps } from 'react';

type CardBackProps = ComponentProps<'div'>;

export default function CardBack({ children, ...rest }: CardBackProps) {
  return (
    <div
      className="flex h-full w-full select-none flex-col gap-20 rounded-[28px] bg-cool-neutral-17 p-20 shadow-5"
      {...rest}
    >
      {children}
    </div>
  );
}
