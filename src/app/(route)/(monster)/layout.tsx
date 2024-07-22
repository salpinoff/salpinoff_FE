import BaseLayout from 'src/app/layout/BaseLayout';

type Props = {
  children: React.ReactNode;
};

function MonsterLayout({ children }: Props) {
  return <BaseLayout>{children}</BaseLayout>;
}

export default MonsterLayout;
