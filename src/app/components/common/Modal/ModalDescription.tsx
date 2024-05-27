import { PropsWithChildren } from 'react';

import BaseText from '@components/common/Text/BaseText';

export default function ModalDescription({ children }: PropsWithChildren) {
  return (
    <BaseText variant="label-1" color="neutral">
      {children}
    </BaseText>
  );
}
