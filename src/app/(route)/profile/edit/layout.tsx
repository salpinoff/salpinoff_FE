import cn from '@utils/cn';

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <main
      style={{ touchAction: 'auto' }}
      className={cn(
        'relative m-auto box-border	flex h-dvh w-full max-w-[414px] flex-col items-center overscroll-none px-5',
      )}
    >
      {children}
    </main>
  );
}

export default AuthLayout;
