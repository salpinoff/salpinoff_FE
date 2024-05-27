import { atom } from 'jotai';

export type Modal = {
  uid: string;
  element: React.FC;
};

export const modalAtom = atom<Modal[]>([]);
