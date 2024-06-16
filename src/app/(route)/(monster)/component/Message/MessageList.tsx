import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import useModal from '@hooks/useModal';
import useQueryString from '@hooks/useQueryString';

import { getNextMessageList } from '@api/message/list';

import type { Unpromise } from '@type/util';

import { totalMessageAtom } from '@store/messageAtom';

import MessageConfirmModal from './MessageConfirmModal';
import MessageItem from './MessageItem';

type LastPage = {
  isLast: boolean;
  nextPage: number | undefined;
  result: Unpromise<ReturnType<typeof getNextMessageList>>['result'];
};

function MessageList() {
  const [monsterId] = useQueryString('monsterId');

  const { openModal, closeModal } = useModal(() => null);

  const setTotalElements = useSetAtom(totalMessageAtom);

  const {
    data: { messageList, totalElements },
  } = useSuspenseInfiniteQuery({
    retry: 1,
    initialPageParam: 1,
    queryKey: ['message-list', monsterId],
    select: (pages) => ({
      messageList: pages.pages.map(({ result }) => result.list).flat(),
      totalElements: pages.pages[0].result.totalElements,
    }),
    queryFn: ({ pageParam = 1 }) =>
      getNextMessageList({ monsterId: Number(monsterId), page: pageParam }),
    getNextPageParam: ({ nextPage }: LastPage) => {
      return nextPage;
    },
  });

  useEffect(() => {
    setTotalElements(totalElements);
  }, [totalElements]);

  const handleClick = (message: (typeof messageList)[number]) => {
    openModal(() => (
      <MessageConfirmModal
        message={message}
        monsterId={monsterId}
        closeModal={closeModal}
      />
    ));
  };

  return (
    <>
      {messageList.map((message) => {
        return (
          <MessageItem
            key={message.messageId}
            component="button"
            onClick={() => {
              handleClick(message);
            }}
          />
        );
      })}
    </>
  );
}

export default MessageList;
