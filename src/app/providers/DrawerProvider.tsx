'use client';

import { useAtomValue } from 'jotai';

import Drawer from 'rc-drawer';

import useDrawer from '@hooks/useDrawer';

import cn from '@utils/cn';

import { drawerAtom } from '@store/drawerAtom';

function DrawerProvider() {
  const View = useAtomValue(drawerAtom) || (() => null);
  const { isOpen } = useDrawer();

  return (
    <Drawer
      open={isOpen}
      placement="right"
      className={cn('absolute left-0 right-0 top-0 z-10', {
        'translate-x-0 transition-all': isOpen,
        'translate-x-full transition-all': !isOpen,
      })}
    >
      <View />
    </Drawer>
  );
}

export default DrawerProvider;
