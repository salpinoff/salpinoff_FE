import LogoSVG from '@public/icons/logo.svg';

import cn from '@utils/cn';

type Props = {
  children: React.ReactNode;
};

function ShareLayout({ children }: Props) {
  return (
    <main
      style={{ touchAction: 'auto' }}
      className={cn(
        'relative m-auto box-border	flex h-dvh w-full max-w-[414px] flex-col items-center overflow-auto overscroll-none',
      )}
    >
      <header className="flex h-[72px] w-full items-center justify-center">
        <LogoSVG />
      </header>
      {children}
    </main>
  );
}

export default ShareLayout;
