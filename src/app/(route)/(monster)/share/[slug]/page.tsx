'use client';

import { useRouter } from 'next/navigation';

import { useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useSetAtom } from 'jotai';

import useFunnel from '@hooks/useFunnel';
import useModal from '@hooks/useModal';

import { validate } from '@utils/validate';

import { useSendEncouragement } from '@api/monster/queries';

import { idAtom } from '@store/monsterAtom';

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

  const setId = useSetAtom(idAtom);

  const { update } = useContext(GuestDispatchContext);

  const { mutate: send } = useSendEncouragement(monsterId, {
    onSuccess: () => setStep('done'),
    onError: ({ response }) => {
      if (response && response.status === 404) {
        openModal();
        // 이후 주석 해제 후 변경
        // openModal(<ExpiredModal closeModal={closeModal} />);
      }
    },
  });

  useEffect(() => {
    if (monsterId) setId(monsterId);

    return () => setId('');
  }, [monsterId]);

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
