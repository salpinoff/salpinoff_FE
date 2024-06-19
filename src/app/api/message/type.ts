export type MessageListProps = {
  page: number;
  size?: number;
  monsterId: number;
};

export type MessageListResponse = {
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

export type QueryKeysProps = {
  list: {
    monsterId: string;
  };
  confirm: {
    monsterId: string;
    messageId: number;
  };
};
