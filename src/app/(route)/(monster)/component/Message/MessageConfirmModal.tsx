import { MouseEventHandler, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Heart from '@public/icons/heart.svg';

import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import { Modal } from '@components/common/Modal';
import BaseText from '@components/common/Text/BaseText';

import useOutsideClick from '@hooks/useOutsideClick';

import cn from '@utils/cn';

import MessageQueryFactory from '@api/message/query/factory';
import { MessageListResponse } from '@api/message/type';

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
  const queryClient = useQueryClient();

  const {
    confirm: { key, fetcher },
  } = MessageQueryFactory;

  const { mutate: confirm } = useMutation({
    mutationKey: key({ monsterId, messageId }),
    mutationFn: () => fetcher({ monsterId: Number(monsterId), messageId }),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['message-list', monsterId] });
    },
  });

  const handleClick: MouseEventHandler = async () => {
    confirm();
  };

  useOutsideClick(modalRef, () => closeModal(), 'mousedown');

  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content className="w-[calc(100vw-64px)] items-center bg-transparent p-0">
        <section
          ref={modalRef}
          className={cn(
            'flex flex-col items-center justify-between',
            'aspect-[312/430] w-full rounded-32',
            'gap-[10px] bg-[#70737C47] px-24 pb-32 pt-[42px] text-white',
          )}
        >
          <BaseText component="h2" variant="heading-1" weight="semibold">
            {sender}님의 메시지
          </BaseText>

          <BaseText
            variant="body-1"
            weight="regular"
            className={cn(
              'flex-1',
              'flex flex-col items-center justify-start',
              'overflow-y-auto',
              'max-h-[32dvh] max-w-full break-all',
            )}
          >
            <span className="my-auto inline-block">{content}</span>
          </BaseText>

          <div
            className={cn(
              'aspect-square h-80',
              'rounded-20',
              'flex flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-[12.5%]',
              {
                'bg-[var(--color-base-red-90)]': !checked,
                'bg-[var(--color-base-cool-neutral-80)]': checked,
              },
            )}
          >
            <Icon
              className={cn('block h-[32.5%] w-[80%]', {
                'text-[var(--color-base-red-50)]': !checked,
                'text-[var(--color-base-cool-neutral-50)]': checked,
              })}
            >
              <Heart />
            </Icon>

            <BaseText
              weight="semibold"
              variant="caption-1"
              className={cn({
                'text-[var(--color-base-red-40)]': !checked,
                'text-[var(--color-base-cool-neutral-30)]': checked,
              })}
            >
              에너지 40
            </BaseText>
          </div>
        </section>

        <Button
          onClick={handleClick}
          className="w-[52.5%]"
          variant={checked ? 'secondary' : 'primary'}
        >
          <BaseText variant="body-2" weight={checked ? 'medium' : 'semibold'}>
            {checked ? '닫기' : '에너지 적용하기'}
          </BaseText>
        </Button>
      </Modal.Content>
    </Modal>
  );
}

export default MessageConfirmModal;
