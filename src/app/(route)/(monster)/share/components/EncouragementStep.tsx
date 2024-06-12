import { useEffect, useRef } from 'react';

import { useAtomValue } from 'jotai';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

import { useSendEncouragement } from '@api/monster/queries';

import { idAtom } from '@store/monsterAtom';

type IncouragementStepProps = {
  goBackToInteraction: () => void;
  onSendMessage: () => void;
};

export default function EncouragementStep({
  goBackToInteraction,
  onSendMessage,
}: IncouragementStepProps) {
  const id = useAtomValue(idAtom);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { mutate: send } = useSendEncouragement(id, {
    onSuccess: () => onSendMessage?.(),
    onError: () => {},
  });

  const handleSend = () => {
    send({
      sender: '빵빵이',
      content: '테스트입니다.',
    });
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  });

  return (
    <>
      <BaseText>타이틀</BaseText>
      <div />
      <nav className="flex gap-8">
        <Button variant="secondary" onClick={goBackToInteraction}>
          뒤로가기
        </Button>
        <Button ref={buttonRef} variant="primary" onClick={handleSend}>
          전송하기
        </Button>
      </nav>
    </>
  );
}
