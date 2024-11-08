import { headers } from 'next/headers';

import { setAuthHeader } from '@api/api.config';
import { getServerSession } from '@api/auth/base/session';

import { ExtractProps } from '@type/util';

import Hydrate from './HydrateBoundary';

type Props = ExtractProps<typeof Hydrate>;

async function HydrateWithAuth(props: Props) {
  const header = Array.from(headers().entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );

  await Promise.race([
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    }),
    getServerSession(header).then(({ data: { accessToken } }) => {
      setAuthHeader(accessToken);
    }),
  ]);

  return <Hydrate {...props} />;
}

export default HydrateWithAuth;
