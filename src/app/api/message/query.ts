import type { QueryKeysProps } from './type';

import { confirmMessage } from './confirm';
import { getNextMessageList } from './list';

const MessageQueryFactory = {
  list: {
    key: ({ monsterId }: QueryKeysProps['list']) => ['message-list', monsterId],
    fetcher: getNextMessageList,
  },
  confirm: {
    key: ({ monsterId, messageId }: QueryKeysProps['confirm']) => [
      'confirm-message',
      monsterId,
      messageId,
    ],
    fetcher: confirmMessage,
  },
};

export default MessageQueryFactory;
