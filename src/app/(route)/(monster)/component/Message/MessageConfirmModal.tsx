import Image from 'next/image';

import { TouchEventHandler, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import Button from '@components/common/Button';
import Modal from '@components/common/feedback/Modal';
import Text from '@components/common/Text';

import useOutsideClick from '@hooks/useOutsideClick';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import cn from '@utils/cn';
import { getQueryClient } from '@utils/query/get-query-client';

import MessageQueryFactory from '@api/message/query/factory';
import { MessageListResponse } from '@api/message/type';
import MonsterQueryFactory from '@api/monster/query/factory';
import { useMonster } from '@api/monster/query/hooks';

type Props = {
  message: MessageListResponse['content'][number];
  monsterId: string;
  closeModal: () => void;
};

function MessageConfirmModal({
  closeModal,
  monsterId,
  message: { content, sender, checked, messageId },
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = getQueryClient();

  const [messageRead, setMessageRead] = useState(checked);

  const {
    list: { key: listKey },
    confirm: { key, fetcher },
  } = MessageQueryFactory;

  const { mutate: confirm } = useMutation({
    mutationKey: key({ monsterId, messageId }),
    mutationFn: () => fetcher({ monsterId: Number(monsterId), messageId }),
    onSuccess: () => {
      closeModal();
      setMessageRead(true);
      queryClient.invalidateQueries({ queryKey: listKey({ monsterId }) });
      queryClient.invalidateQueries({
        queryKey: MonsterQueryFactory.reference.queryKey,
      });
    },
  });

  const { data } = useMonster(monsterId, {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    select: (data) => Adapter.from(data.data).to(transformMonster),
  });

  const emotion = data?.emotion;
  const energyPerInteraction =
    (data?.interactionCountPerEncouragement || 0) *
    (emotion === 'ANGER' ? -1 : 1);

  const handleClick: TouchEventHandler = async () => {
    const method = messageRead ? closeModal : confirm;

    method();
  };

  useOutsideClick(modalRef, () => closeModal(), 'mousedown');

  return (
    <Modal open>
      <Modal.Dimmed blur />
      <Modal.Content className="max-h-dvh w-[calc(100vw-64px)] max-w-md items-center bg-transparent p-0">
        <section
          ref={modalRef}
          className={cn(
            'flex flex-col items-center justify-between',
            'aspect-[312/430] w-full rounded-32',
            'gap-[10px] bg-[#70737C47] px-24 pb-32 pt-[42px] text-white',
          )}
        >
          <Text component="h2" variant="heading-1" weight="semibold">
            {sender}님의 메시지
          </Text>

          <Text
            variant="body-1"
            weight="regular"
            className={cn(
              'flex-1',
              'flex flex-col items-center justify-start',
              'overflow-y-auto',
              'max-h-[32dvh] max-w-full break-all',
            )}
          >
            <span className="my-auto inline-block whitespace-pre-wrap">
              {content}
            </span>
          </Text>

          <div
            className={cn(
              'rounded-20',
              'h-[88px] w-[80px]',
              'border-2 bg-cool-neutral-17',
              'flex flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-8',
              {
                'border-red-60': !messageRead && emotion === 'DEPRESSION',
                'border-orange-50': !messageRead && emotion === 'ANGER',
                'border-cool-neutral-60': messageRead,
              },
            )}
          >
            <div className={cn('relative block aspect-square w-[32px]')}>
              {emotion && (
                <Image
                  fill
                  alt={emotion}
                  src={`/images/${emotion === 'DEPRESSION' ? 'heart' : 'mad'}_${messageRead ? 'inactive' : 'active'}.webp`}
                />
              )}
            </div>

            <Text
              weight="semibold"
              variant="caption-1"
              className={cn({
                'text-red-60': !messageRead && emotion === 'DEPRESSION',
                'text-orange-50': !messageRead && emotion === 'ANGER',
                'text-cool-neutral-60': messageRead,
              })}
            >
              에너지 {energyPerInteraction}
            </Text>
          </div>
        </section>

        <Button
          size="medium"
          onTouchEnd={handleClick}
          variant={messageRead ? 'secondary' : 'primary'}
        >
          <Text variant="body-2" weight={messageRead ? 'medium' : 'semibold'}>
            {messageRead ? '닫기' : '에너지 적용하기'}
          </Text>
        </Button>
      </Modal.Content>
    </Modal>
  );
}

export default MessageConfirmModal;
