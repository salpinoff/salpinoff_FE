import cn from '@utils/cn';

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <main
      style={{ touchAction: 'auto' }}
      className={cn(
        'box-sizing full-height relative flex flex-col bg-black p-20',
      )}
    >
      {children}
    </main>
  );
}

export default AuthLayout;
