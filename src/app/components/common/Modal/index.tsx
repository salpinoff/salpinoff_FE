import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import Button from '@components/common/Button';
import Dimmed from '@components/common/Dimmed';
import withProps from '@components/common/HOC/withProps';
import Text from '@components/common/Text';

import ModalContent from './ModalContent';

type ModalProps = PropsWithChildren<{
  open?: boolean;
  container?: Parameters<typeof createPortal>[1];
}>;

export default function Modal({ open, container, children }: ModalProps) {
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
    container ?? document.getElementById('root-container') ?? document.body,
  );
}

Modal.Dimmed = Dimmed;
Modal.Content = ModalContent;

// HOC
Modal.Description = withProps(Text, {
  variant: 'label-1',
  color: 'neutral',
});

Modal.Title = withProps(Text, {
  component: 'h3',
  variant: 'headline-1',
  color: 'normal',
  align: 'left',
});

Modal.Button = withProps(Button, {
  size: 'small',
});
