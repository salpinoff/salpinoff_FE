import { apiInstance } from '@api/api.config';

const confirmMessage = async ({
  monsterId,
  messageId,
}: {
  monsterId: number;
  messageId: number;
}) => {
  const path = `/monsters/${monsterId}/messages/${messageId}`;

  return apiInstance.post<never>(path);
};

export { confirmMessage };
