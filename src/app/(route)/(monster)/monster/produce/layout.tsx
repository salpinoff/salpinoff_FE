import cn from '@utils/cn';

type Props = {
  children: React.ReactNode;
};

function MonsterLayout({ children }: Props) {
  return (
    <main
      style={{ touchAction: 'auto' }}
      className={cn(
        'relative m-auto box-border	flex h-dvh w-full max-w-[414px] flex-col items-center overscroll-none',
      )}
    >
      {children}
    </main>
  );
}

export default MonsterLayout;
