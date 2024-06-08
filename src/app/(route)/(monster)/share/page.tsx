'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import useFunnel from '@hooks/useFunnel';
import useQueryString from '@hooks/useQueryString';

import { idAtom } from '@store/monsterAtom';

import DoneStep from './components/DoneStep';
import EncouragementStep from './components/EncouragementStep';
import InteractionStep from './components/InteractionStep';
import { ERROR_MESSAGE } from './constants/error';
import { funnel } from './constants/funnel';

type SharePages = (typeof funnel)[number];
type ShareFunnelProps = React.PropsWithChildren<{ name: SharePages }>;

export default function SharePage() {
  const [monsterId] = useQueryString('monsterId');

  const { Funnel, setStep } = useFunnel<SharePages, ShareFunnelProps>(
    'interactions',
  );

  const setId = useSetAtom(idAtom);

  const validateId = (id: string) => !Number.isNaN(Number(id));

  useEffect(() => {
    if (monsterId) setId(monsterId);

    return () => setId('');
  }, [monsterId]);

  if (!monsterId) throw new Error(ERROR_MESSAGE.NOT_FOUND);
  if (!validateId(monsterId)) throw new Error(ERROR_MESSAGE.INVALID);

  return (
    <Funnel>
      <Funnel.Step name="interactions">
        <InteractionStep goToEncouragement={() => setStep('encouragement')} />
      </Funnel.Step>
      <Funnel.Step name="encouragement">
        <EncouragementStep
          goBackToInteraction={() => setStep('encouragement')}
          onSendMessage={() => setStep('done')}
        />
      </Funnel.Step>
      <Funnel.Step name="done">
        <DoneStep />
      </Funnel.Step>
    </Funnel>
  );
}
