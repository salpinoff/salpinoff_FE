import Link from 'next/link';

import type { ComponentPropsWithoutRef, ElementType } from 'react';

import Icon from '@components/common/Icon';

import cn from '@utils/cn';

type MenuCommonItemProps<T extends ElementType> =
  ComponentPropsWithoutRef<T> & { loading?: boolean };

type MenuItemProps =
  | (MenuCommonItemProps<'a'> & { component: 'a' })
  | (MenuCommonItemProps<'button'> & { component: 'button' });

export default function MenuItem({
  children,
  component,
  className,
  loading = false,
  ...restProps
}: MenuItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = component === 'a' ? Link : 'button';

  return (
    <Component
      className={cn(
        'bg-[#70737C1F]',
        'w-full px-24 py-20',
        'flex items-center justify-between',
        { 'pointer-events-none': loading },
        className,
      )}
      {...restProps}
    >
      {children}
      {loading ? (
        <Icon name="spin" size={16} stroke="subtle" />
      ) : (
        <Icon
          name="arrow-back"
          size={12}
          stroke="subtle"
          className="rotate-180"
        />
      )}
    </Component>
  );
}
