import { PropsWithChildren } from 'react';

import BaseText from '@components/common/Text/BaseText';

type HeaderTitleProps = PropsWithChildren<{ className?: string }>;

export default function HeaderTitle({ children, className }: HeaderTitleProps) {
  return (
    <BaseText
      component="h3"
      variant="headline-1"
      weight="semibold"
      color="normal"
      className={className}
    >
      {children}
    </BaseText>
  );
}
