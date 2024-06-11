import Image from 'next/image';

import { ComponentPropsWithRef, ElementType } from 'react';

import message from '@public/images/message.webp';

import cn from '@utils/cn';

type ComponentWithCustomProps<
  T extends ElementType,
  P,
> = ComponentPropsWithRef<T> & P;

type Props<T extends ElementType> = ComponentWithCustomProps<T, { as?: T }>;

function MessageItem<T extends ElementType>({
  as: Component = 'button',
  className,
  ...restProps
}: Props<T>) {
  return (
    <Component
      className={cn(
        'flex items-center justify-center',
        'box-border aspect-[9/8] rounded-[16px] bg-[#212225]',
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
