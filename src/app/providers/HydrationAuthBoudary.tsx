import { converHeaderToRecord } from '@utils/server/convert-header-to-record';

import { setAuthHeader } from '@api/api.config';
import { getServerSession } from '@api/auth/base/session';

import { ExtractProps } from '@type/util';

import Hydrate from './HydrateBoundary';

type Props = ExtractProps<typeof Hydrate>;

async function HydrateWithAuth(props: Props) {
  const header = converHeaderToRecord();

  const {
    data: { accessToken },
  } = await getServerSession(header);

  setAuthHeader(accessToken);

  return <Hydrate {...props} />;
}

export default HydrateWithAuth;
