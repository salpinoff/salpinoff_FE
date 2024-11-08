import { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { MonsterInfo } from './context.type';

const initialMonsterInfo: MonsterInfo = {
  emotion: '',
  stress: 1,
  story: '',
  monsterName: '',
  decorations: [],
};

type Props = PropsWithChildren;

function MonsterInfoProvider({ children }: Props) {
  const method = useForm<MonsterInfo>({
    mode: 'all',
    defaultValues: initialMonsterInfo,
  });

  return <FormProvider {...method}>{children}</FormProvider>;
}

export default MonsterInfoProvider;
