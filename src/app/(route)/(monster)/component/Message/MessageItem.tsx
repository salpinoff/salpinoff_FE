import { ComponentPropsWithRef, ElementType } from 'react';

import Icon from '@components/common/Icon';

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
        'box-border aspect-[9/8] overflow-hidden rounded-[16px] bg-[#212225] text-cool-neutral-99',
        {
          "after:contents-[''] after:absolute after:h-full after:w-full after:bg-[#171719BD]":
            checked,
        },
        className,
      )}
      {...restProps}
    >
      <Icon name="message" size={28} />
    </Component>
  );
}

export default MessageItem;
