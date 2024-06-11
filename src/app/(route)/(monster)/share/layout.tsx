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
      <section className="flex h-full w-full flex-col items-center justify-between gap-[28px] p-20">
        {children}
      </section>
    </main>
  );
}

export default ShareLayout;
