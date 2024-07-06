'use client';

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import useFunnel from '@hooks/useFunnel';
import useModal from '@hooks/useModal';

import { validate } from '@utils/validate';

import { sendEncouragement } from '@api/encouragement';
import { SendEncouragementRequest } from '@api/encouragement/types';

import DoneStep from './components/DoneStep';
import EncouragementStep from './components/EncouragementStep';
import ExpiredModal from './components/ExpiredModal';
import InteractionStep from './components/InteractionStep';
import { ERROR_MESSAGE } from './constants/error';
import { funnel } from './constants/funnel';
import { GuestDispatchContext } from './context/guest.context';

type SharePages = (typeof funnel)[number];

type ShareFunnelProps = React.PropsWithChildren<{ name: SharePages }>;

export default function SharePage({ params }: { params: { slug: string } }) {
  const { slug: monsterId } = params;

  const { replace } = useRouter();

  const { Funnel, setStep } = useFunnel<SharePages, ShareFunnelProps>(
    'interactions',
  );

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      sender: '',
      content: '',
    },
    delayError: 3000,
  });

  const { openModal, closeModal } = useModal(() => (
    <ExpiredModal closeModal={closeModal} />
  ));

  const { update } = useContext(GuestDispatchContext);

  const { mutate: send } = useMutation<
    unknown,
    AxiosError,
    SendEncouragementRequest
  >({
    mutationFn: (data) => sendEncouragement(monsterId, data),
    onSuccess: () => setStep('done'),
    onError: ({ response }) => {
      if (response && response.status === 404) {
        openModal();
      }
    },
  });

  if (!monsterId) throw new Error(ERROR_MESSAGE.NOT_FOUND);
  if (!validate.monsterId(monsterId)) throw new Error(ERROR_MESSAGE.INVALID);

  return (
    <Funnel>
      <Funnel.Step name="interactions">
        <InteractionStep
          onCompeleteInteraction={() => {
            update({ clear: true });
          }}
          goNext={() => {
            setStep('encouragement');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="encouragement">
        <FormProvider {...methods}>
          <EncouragementStep
            goPrev={() => {
              setStep('interactions');
            }}
            goNext={(data) => {
              send(data);
            }}
          />
        </FormProvider>
      </Funnel.Step>
      <Funnel.Step name="done">
        <DoneStep goNext={() => replace('/signup')} />
      </Funnel.Step>
    </Funnel>
  );
}
