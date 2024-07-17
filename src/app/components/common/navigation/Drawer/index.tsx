import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

import { isIOS } from '@utils/client/agent';
import cn from '@utils/cn';

type DrawerProps = PropsWithChildren & {
  open?: boolean;
};

export default function Drawer({ children, open = false }: DrawerProps) {
  return createPortal(
    <LazyMotion features={domAnimation}>
      {open && (
        <AnimatePresence mode="wait" onExitComplete={() => null}>
          <m.div
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
            <m.aside
              initial={{
                left: '100%',
              }}
              animate={{
                left: 0,
              }}
              className={cn(
                'fixed right-0 top-0 z-[999] w-full overflow-y-scroll bg-black px-20 scrollbar-hide',
                {
                  'full-height': !isIOS,
                  'full-height-ios': isIOS,
                },
              )}
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
