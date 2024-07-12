'use client';

import cn from '@utils/cn';

import { GuestProvider } from './context/guest.context';

type Props = {
  children: React.ReactNode;
};

function ShareLayout({ children }: Props) {
  return (
    <main
      style={{ touchAction: 'auto' }}
      className={cn(
        'relative m-auto box-border	flex h-dvh w-full flex-col items-center overflow-hidden overscroll-none',
      )}
    >
      <GuestProvider>{children}</GuestProvider>
    </main>
  );
}

export default ShareLayout;
