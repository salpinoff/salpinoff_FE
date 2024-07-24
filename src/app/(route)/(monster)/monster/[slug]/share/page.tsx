'use client';

import { useRouter } from 'next/navigation';

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
import EncouragementFormProvider from './context/form.context';
import GuestProvider from './context/guest.context';

type SharePages = (typeof funnel)[number];

type ShareFunnelProps = React.PropsWithChildren<{ name: SharePages }>;

type SharePagesProps = {
  params: { slug: string };
};

export default function SharePage({ params: { slug } }: SharePagesProps) {
  const { push } = useRouter();

  const { openModal, closeModal } = useModal();

  const { Funnel, setStep } = useFunnel<SharePages, ShareFunnelProps>(
    funnel[0],
  );

  const { mutate: send } = useMutation<
    unknown,
    AxiosError,
    SendEncouragementRequest
  >({
    mutationFn: (data) => sendEncouragement(slug, data),
    onSuccess: () => setStep('done'),
    onError: ({ response }) => {
      if (response && response.status === 404) {
        openModal(() => <ExpiredModal closeModal={closeModal} />);
      }
    },
  });

  if (!slug) throw new Error(ERROR_MESSAGE.NOT_FOUND);
  if (!validate.monsterId(slug)) throw new Error(ERROR_MESSAGE.INVALID);

  return (
    <GuestProvider>
      <EncouragementFormProvider>
        <Funnel>
          <Funnel.Step name="interactions">
            <InteractionStep
              goNext={() => {
                setStep('encouragement');
              }}
            />
          </Funnel.Step>
          <Funnel.Step name="encouragement">
            <EncouragementStep
              goPrev={() => {
                setStep('interactions');
              }}
              goNext={(data) => {
                send(data);
              }}
            />
          </Funnel.Step>
          <Funnel.Step name="done">
            <DoneStep goNext={() => push('/signup')} />
          </Funnel.Step>
        </Funnel>
      </EncouragementFormProvider>
    </GuestProvider>
  );
}
