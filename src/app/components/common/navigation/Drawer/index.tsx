import { ComponentProps, useId } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

import { isIOS } from '@utils/client/agent';
import cn from '@utils/cn';

type DrawerProps = ComponentProps<'aside'> & {
  open?: boolean;
};

export default function Drawer({
  className,
  children,
  open = false,
}: DrawerProps) {
  const uid = useId();

  return createPortal(
    <LazyMotion features={domAnimation}>
      {open && (
        <AnimatePresence mode="wait" onExitComplete={() => null}>
          <m.div
            id={`drawer_${uid}`}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            variants={{
              initial: {
                opacity: 0.5,
              },
              animate: {
                opacity: 1,
                transition: {
                  duration: 0.3,
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
            <m.aside
              initial={{
                left: '100%',
              }}
              animate={{
                left: 0,
              }}
              className={cn('fixed right-0 top-0 w-full bg-cool-neutral-5', {
                'full-height': !isIOS,
                'full-height-ios': isIOS,
                className,
              })}
            >
              {children}
            </m.aside>
          </m.div>
        </AnimatePresence>
      )}
    </LazyMotion>,
    document.body,
  );
}
