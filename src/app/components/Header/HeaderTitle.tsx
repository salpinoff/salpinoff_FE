import { PropsWithChildren } from 'react';

import BaseText from '@components/common/Text/BaseText';

type HeaderTitleProps = PropsWithChildren;

export default function HeaderTitle({ children }: HeaderTitleProps) {
  return (
    <BaseText
      component="h3"
      variant="headline-1"
      weight="semibold"
      color="normal"
    >
      {children}
    </BaseText>
  );
}
