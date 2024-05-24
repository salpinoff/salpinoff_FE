import { useEffect, useId, useCallback } from 'react';

import { useAtom } from 'jotai';

import modalAtom from 'atoms/modal';

const useModal = (component: React.FC) => {
  const id = useId();
  const [modals, setModals] = useAtom(modalAtom);

  const isOpen = modals.some((modal) => modal.id === id);

  const openModal = useCallback(
    () => setModals((prev) => [...prev, { id, element: component }]),
    [component, id, setModals],
  );

  const closeModal = useCallback(
    () => setModals((prev) => prev.filter((modal) => modal.id !== id)),
    [id, setModals],
  );

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : 'unset';
  }, [modals]);

  return { isOpen, openModal, closeModal };
};

export default useModal;
