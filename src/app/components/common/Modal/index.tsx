import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import Dimmed from '@components/common/feedback/Dimmed';

import ModalButton from './ModalButton';
import ModalContent from './ModalContent';
import ModalDescription from './ModalDescription';
import ModalTitle from './ModalTitle';

export function Modal({
  open,
  children,
}: PropsWithChildren<{
  open?: boolean;
}>) {
  return createPortal(
    <AnimatePresence mode="wait" onExitComplete={() => null}>
      {open && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
              transition: {
                duration: 0.1,
              },
            },
            exit: {
              opacity: 0,
            },
          }}
          initial="initial"
          animate="animate"
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
Modal.Dimmed = Dimmed;
Modal.Title = ModalTitle;
