import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import Observer from '@components/common/Observer';

import useModal from '@hooks/useModal';

import { getNextMessageList } from '@api/message/list';
import MessageQueryFactory from '@api/message/query/factory';
import MonsterQueryFactory from '@api/monster/query/factory';

import type { Unpromise } from '@type/util';

import { totalMessageAtom } from '@store/messageAtom';

import MessageConfirmModal from './MessageConfirmModal';
import MessageFallback from './MessageFallback';
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
    data: { messageList, uncheckedMessageCount, isEmpty, isLast },
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    retry: 1,
    staleTime: 0,
    initialPageParam: 1,
    queryKey: key({ monsterId: `${monsterId}` }),
    queryFn: ({ pageParam = 1 }) =>
      fetcher({ monsterId: Number(monsterId), page: pageParam }),
    getNextPageParam: ({ nextPage }: LastPage) => {
      return nextPage;
    },
    select: (pages) => ({
      isEmpty: pages.pages[0].result.totalElements === 0,
      isLast: pages.pages[pages.pages.length - 1].isLast,
      messageList: pages.pages
        .map(({ result }) => result.list)
        .flat()
        .sort((a, b) => Number(a.checked) - Number(b.checked)),
      uncheckedMessageCount: pages.pages[0].result.uncheckedMessageCount,
    }),
  });

  const handleClick = (message: (typeof messageList)[number]) => {
    openModal(() => (
      <MessageConfirmModal
        message={message}
        monsterId={`${monsterId}`}
        closeModal={closeModal}
      />
    ));
  };

  useEffect(() => {
    setTotalElements(uncheckedMessageCount);
  }, [uncheckedMessageCount]);

  return (
    <>
      {isEmpty && <MessageFallback />}
      {messageList.map((message) => {
        return (
          <MessageItem
            id="btn_message"
            key={message.messageId}
            checked={message.checked}
            component="button"
            onClick={() => {
              handleClick(message);
            }}
          />
        );
      })}

      <Observer
        onChange={(isIntersecting: boolean) => {
          if (isIntersecting && !isLast) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
}

export default MessageList;
