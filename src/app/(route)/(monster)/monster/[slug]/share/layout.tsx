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
        'relative m-auto box-border	flex h-dvh w-full max-w-[414px] flex-col items-center overflow-auto overscroll-none p-20',
      )}
    >
      <section className="flex h-full w-full flex-col items-center justify-between gap-[28px]">
        <GuestProvider>{children}</GuestProvider>
      </section>
    </main>
  );
}

export default ShareLayout;
