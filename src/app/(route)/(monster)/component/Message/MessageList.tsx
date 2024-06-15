import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import useQueryString from '@hooks/useQueryString';

import { getNextMessageList } from '@api/message/list';

import type { Unpromise } from '@type/util';

import { totalMessageAtom } from '@store/messageAtom';

import MessageItem from './MessageItem';

type LastPage = {
  isLast: boolean;
  nextPage: number | undefined;
  result: Unpromise<ReturnType<typeof getNextMessageList>>['result'];
};

function MessageList() {
  const [monsterId] = useQueryString('monsterId');
  const setTotalElements = useSetAtom(totalMessageAtom);

  const {
    data: { messageList, totalElements },
  } = useSuspenseInfiniteQuery({
    retry: 1,
    initialPageParam: 1,
    queryKey: ['message-list', monsterId],
    select: (pages) => ({
      totalElements: pages.pages[0].result.totalElements,
      messageList: pages.pages.map((content) => content.result).flat(),
    }),
    queryFn: ({ pageParam = 1 }) =>
      getNextMessageList({ monsterId, page: pageParam }),
    getNextPageParam: ({ nextPage }: LastPage) => {
      return nextPage;
    },
  });

  const handleClick = () => {};

  useEffect(() => {
    setTotalElements(totalElements);
  }, [totalElements]);

  return (
    <>
      {messageList.map((message) => {
        return (
          <MessageItem
            key={message.messageId}
            component="button"
            onClick={handleClick}
          />
        );
      })}
    </>
  );
}

export default MessageList;
