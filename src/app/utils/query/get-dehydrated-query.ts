import { dehydrate } from '@tanstack/react-query';

import type { QueryOptions } from '@type/query';

import { getQueryClient } from './get-query-client';

const getDehydratedQuery = async (quries: QueryOptions[], timeout = 1000) => {
  const queryClient = getQueryClient();
  const promises = quries.map(({ queryKey, queryFn }) =>
    queryClient.prefetchQuery({ queryKey, queryFn }),
  );

  await Promise.race([
    Promise.all([...promises]),
    new Promise((resolve) => {
      setTimeout(resolve, timeout);
    }),
  ]);

  return dehydrate(queryClient);
};

export default getDehydratedQuery;
