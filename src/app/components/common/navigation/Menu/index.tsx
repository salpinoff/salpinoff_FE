import type { ComponentProps } from 'react';

import cn from '@utils/cn';

import MenuItem from './MenuItem';

type MenuProps = ComponentProps<'section'>;

function Menu({ children, className, ...restProps }: MenuProps) {
  return (
    <section
      className={cn('-mx-20 flex flex-col text-white', className)}
      {...restProps}
    >
      {children}
    </section>
  );
}

Menu.Item = MenuItem;

export default Menu;
