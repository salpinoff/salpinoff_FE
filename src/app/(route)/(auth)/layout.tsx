import cn from '@utils/cn';

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <main
      style={{ touchAction: 'auto' }}
      className={cn('full-height', 'relative box-border flex flex-col')}
    >
      {children}
    </main>
  );
}

export default AuthLayout;
