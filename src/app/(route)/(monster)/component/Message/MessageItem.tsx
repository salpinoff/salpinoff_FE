import Image from 'next/image';

import { ComponentPropsWithRef, ElementType } from 'react';

import message from '@public/images/message.webp';

import cn from '@utils/cn';

type ComponentWithCustomProps<
  T extends ElementType,
  P,
> = ComponentPropsWithRef<T> & P;

type Props<T extends ElementType> = ComponentWithCustomProps<
  T,
  { component?: T; checked: boolean }
>;

function MessageItem<T extends ElementType>({
  component: Component = 'button',
  className,
  checked,
  ...restProps
}: Props<T>) {
  return (
    <Component
      className={cn(
        'relative flex items-center justify-center',
        'box-border aspect-[9/8] overflow-hidden rounded-[16px] bg-[#212225]',
        {
          "after:contents-[''] after:absolute after:h-full after:w-full after:bg-[#171719BD]":
            checked,
        },
        className,
      )}
      {...restProps}
    >
      <Image
        src={message}
        alt="메시지"
        width={28}
        height={35}
        className="aspect-[28/35] w-[39%]"
      />
    </Component>
  );
}

export default MessageItem;
