'use server';

import { headers } from 'next/headers';

const converHeaderToRecord = () => {
  const header = Array.from(headers().entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );

  return header;
};

export { converHeaderToRecord };
