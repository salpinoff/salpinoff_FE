'use client';

import IconButton, {
  IconButtonProps,
} from '@components/common/Button/IconButton';

type HeaderIconButtonProps = Omit<IconButtonProps, 'size'>;

export default function HeaderIconButton({ ...props }: HeaderIconButtonProps) {
  return <IconButton size={24} {...props} />;
}
