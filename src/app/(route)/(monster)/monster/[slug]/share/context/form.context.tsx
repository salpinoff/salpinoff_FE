import { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SendEncouragementRequest } from '@api/encouragement/types';

const defaultValues = {
  sender: '',
  content: '',
};

export type FormData = Omit<SendEncouragementRequest, 'never'>;

export default function EncouragementFormProvider({
  children,
}: PropsWithChildren) {
  const method = useForm<FormData>({
    mode: 'onChange',
    defaultValues,
  });

  return <FormProvider {...method}>{children}</FormProvider>;
}
