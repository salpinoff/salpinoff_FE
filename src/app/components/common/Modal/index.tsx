import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import ModalButton from './ModalButton';
import ModalContent from './ModalContent';
import ModalDescription from './ModalDescription';
import ModalDimmed from './ModalDimmed';
import ModalTitle from './ModalTitle';

export function Modal({
  open,
  children,
}: PropsWithChildren<{
  open?: boolean;
}>) {
  return createPortal(
    <AnimatePresence initial={false} onExitComplete={() => null}>
      {open && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 0.1,
              },
            },
            exit: {
              opacity: 0,
            },
          }}
          initial={{ opacity: 0 }}
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

Modal.Button = ModalButton;
Modal.Content = ModalContent;
Modal.Description = ModalDescription;
Modal.Dimmed = ModalDimmed;
Modal.Title = ModalTitle;
