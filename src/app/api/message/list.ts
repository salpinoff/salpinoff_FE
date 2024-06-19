import { apiInstance } from '@api/api.config';

import type { MessageListProps, MessageListResponse } from './type';

const PAGE_SIZE = 10;

const getMessageList = async ({
  page,
  size = PAGE_SIZE,
  monsterId,
}: MessageListProps) => {
  const path = `/monsters/${monsterId}/messages?page=${page}&size=${size}`;

  return apiInstance.get<MessageListResponse>(path);
};

const getNextMessageList = async ({
  monsterId,
  page,
}: {
  monsterId: number;
  page: number;
}) => {
  const {
    data: { content, totalElements },
  } = await getMessageList({ monsterId, page });

  const nextPage =
    content.length > 0 && content.length >= PAGE_SIZE ? page + 1 : undefined;

  return {
    result: { list: content, totalElements },
    nextPage,
    isLast: !nextPage,
  };
};

export { getMessageList, getNextMessageList };
