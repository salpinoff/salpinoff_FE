import { PropsWithChildren } from 'react';

type BaseLayoutProps = PropsWithChildren;

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="mx-auto h-dvh max-w-md grow touch-auto">{children}</main>
  );
}
