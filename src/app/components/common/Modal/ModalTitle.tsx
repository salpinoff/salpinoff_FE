import { PropsWithChildren } from 'react';

import BaseText from '@components/common/Text/BaseText';

type ModalTitleProps = PropsWithChildren;

export default function ModalTitle({ children }: ModalTitleProps) {
  return (
    <BaseText component="h3" variant="headline-1" color="normal">
      {children}
    </BaseText>
  );
}
