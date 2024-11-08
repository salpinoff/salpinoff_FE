import { ComponentProps, useId } from 'react';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

// import { isIOS } from '@utils/client/agent';
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

  return (
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
                  duration: 0.2,
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
                'absolute right-0 top-0 z-[10] h-full w-full bg-cool-neutral-5',
                // {
                //   'full-height': !isIOS,
                //   'full-height-ios': isIOS,
                // },
                className,
              )}
            >
              {children}
            </m.aside>
          </m.div>
        </AnimatePresence>
      )}
    </LazyMotion>
  );
}
