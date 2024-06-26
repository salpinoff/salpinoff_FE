import { atom } from 'jotai';

export type Drawer = React.FC;

export const drawerAtom = atom<Drawer | null>(null);
