import { apiInstance } from '@api/api.config';

type Props = {
  page: number;
  size?: number;
  monsterId: string;
};

type Response = {
  content: {
    messageId: number;
    sender: string;
    content: string;
    checked: boolean;
  }[];
  size: number;
  page: number;
  totalElements: number;
};

const PAGE_SIZE = 10;

const getMessageList = async ({ page, size = PAGE_SIZE, monsterId }: Props) => {
  const path = `/monsters/1/messages?page=${page}&size=${size}&monsterId=${monsterId}`;

  return apiInstance.get<Response>(path);
};

const getNextMessageList = async ({
  monsterId,
  page,
}: {
  monsterId: string;
  page: number;
}) => {
  const {
    data: { content, totalElements },
  } = await getMessageList({ monsterId, page });

  const nextPage =
    content.length > 0 && content.length >= PAGE_SIZE ? page + 1 : undefined;

  return {
    result: { ...content, totalElements },
    nextPage,
    isLast: !nextPage,
  };
};

export { getMessageList, getNextMessageList };
