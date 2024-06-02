import cn from '@utils/cn';

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <main
      style={{ touchAction: 'auto' }}
      className={cn(
        // RootLayout (375*812)
        // 이후 프로젝트 전체에 반영되어야 하는 레이아웃
        'relative m-auto box-border	flex h-dvh w-full max-w-[414px] flex-col items-center overscroll-none',
      )}
    >
      {children}
    </main>
  );
}

export default AuthLayout;
