import { useAtom } from 'jotai';

import { drawerAtom } from '@store/drawerAtom';

const useDrawer = (defalutFC?: React.FC) => {
  const [drawer, setDrawer] = useAtom(drawerAtom);

  const isOpen = drawer !== null;

  const closeDrawer = () => setDrawer(() => null);

  const openDrawer = (component?: React.FC) => {
    setDrawer(() => component || defalutFC || null);
  };

  return { isOpen, openDrawer, closeDrawer };
};

export default useDrawer;
