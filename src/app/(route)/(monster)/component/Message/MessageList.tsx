import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import useModal from '@hooks/useModal';

import { getNextMessageList } from '@api/message/list';
import MessageQueryFactory from '@api/message/query/factory';
import MonsterQueryFactory from '@api/monster/query/factory';

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
  const { openModal, closeModal } = useModal(() => null);

  const setTotalElements = useSetAtom(totalMessageAtom);

  const {
    data: { monsterId },
  } = useSuspenseQuery({
    retry: 1,
    ...MonsterQueryFactory.reference,
  });

  const {
    list: { key, fetcher },
  } = MessageQueryFactory;

  const {
    data: { messageList, totalElements },
  } = useSuspenseInfiniteQuery({
    retry: 1,
    initialPageParam: 1,
    queryKey: key({ monsterId: `${monsterId}` }),
    staleTime: 0,
    queryFn: ({ pageParam = 1 }) =>
      fetcher({ monsterId: Number(monsterId), page: pageParam }),
    getNextPageParam: ({ nextPage }: LastPage) => {
      return nextPage;
    },
    select: (pages) => ({
      messageList: pages.pages
        .map(({ result }) => result.list)
        .flat()
        .sort((a, b) => Number(a.checked) - Number(b.checked)),
      totalElements: pages.pages[0].result.totalElements,
    }),
  });

  useEffect(() => {
    setTotalElements(totalElements);
  }, [totalElements]);

  const handleClick = (message: (typeof messageList)[number]) => {
    openModal(() => (
      <MessageConfirmModal
        message={message}
        monsterId={`${monsterId}`}
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
            checked={message.checked}
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
