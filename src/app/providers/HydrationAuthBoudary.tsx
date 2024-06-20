import { headers } from 'next/headers';

import { setAuthHeader } from '@api/api.config';
import { getServerSession } from '@api/auth/session';

import { ExtractProps } from '@type/util';

import Hydrate from './HydrateBoundary';

type Props = ExtractProps<typeof Hydrate>;

async function HydrateWithAuth(props: Props) {
  const header = Array.from(headers().entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );

  const {
    data: { accessToken },
  } = await getServerSession(header);

  setAuthHeader(accessToken);

  return <Hydrate {...props} />;
}

export default HydrateWithAuth;
