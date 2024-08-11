import { PropsWithChildren } from 'react';

import Text from '@components/common/Text';

export default function ModalDescription({ children }: PropsWithChildren) {
  return (
    <Text variant="label-1" color="neutral">
      {children}
    </Text>
  );
}
