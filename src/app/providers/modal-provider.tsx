'use client';

import { useAtomValue } from 'jotai';

import { modalAtom } from '@store/modalAtom';

function ModalProvider() {
  const modals = useAtomValue(modalAtom);

  return (
    <>
      {modals.map(({ uid, element: Element }) => {
        return <Element key={uid} />;
      })}
    </>
  );
}

export default ModalProvider;
