import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import useQueryString from '@hooks/useQueryString';

import { getNextMessageList } from '@api/message/list';

import type { Unpromise } from '@type/util';

import MessageItem from './MessageItem';

type LastPage = {
  isLast: boolean;
  nextPage: number | undefined;
  result: Unpromise<ReturnType<typeof getNextMessageList>>['result'];
};

function MessageList() {
  const [monsterId] = useQueryString('monsterId');

  const { data: messageList } = useSuspenseInfiniteQuery({
    retry: 1,
    initialPageParam: 1,
    queryKey: ['message-list', monsterId],
    select: (pages) => pages.pages.map((content) => content.result).flat(),
    queryFn: ({ pageParam = 1 }) =>
      getNextMessageList({ monsterId, page: pageParam }),
    getNextPageParam: ({ nextPage }: LastPage) => {
      return nextPage;
    },
  });

  const handleClick = () => {};

  return (
    <>
      {messageList.map(({ messageId }) => {
        return (
          <MessageItem key={messageId} as="button" onClick={handleClick} />
        );
      })}
    </>
  );
}

export default MessageList;
