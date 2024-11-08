import { PropsWithChildren } from 'react';

import { HydrationBoundary } from '@tanstack/react-query';

import getDehydratedQuery from '@utils/query/get-dehydrated-query';

import { QueryOptions } from '@type/query';

type Props = PropsWithChildren<{
  queries: QueryOptions[];
}>;

async function Hydrate({ queries, children }: Props) {
  const dehydrated = await getDehydratedQuery(queries);

  return <HydrationBoundary state={dehydrated}>{children}</HydrationBoundary>;
}

export default Hydrate;
