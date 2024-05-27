import { useEffect, useId, useCallback } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { modalAtom } from '@store/modalAtom';

const useModal = (component: React.FC) => {
  const uid = useId();
  const modals = useAtomValue(modalAtom);
  const setModals = useSetAtom(modalAtom);

  const isOpen = modals.findIndex((modal) => modal.uid === uid) !== -1;

  const openModal = useCallback(
    () => setModals((prev) => [...prev, { uid, element: component }]),
    [component, uid, setModals],
  );

  const closeModal = useCallback(
    () => setModals((prev) => prev.filter((modal) => modal.uid !== uid)),
    [uid, setModals],
  );

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : 'unset';
  }, [modals]);

  return { isOpen, openModal, closeModal };
};

export default useModal;
