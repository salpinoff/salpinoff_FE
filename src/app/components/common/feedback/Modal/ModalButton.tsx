import Button from '@components/common/Button';

import { ExtractProps } from '@type/util';

export default function ModalButton({
  className,
  children,
  variant,
  onClick,
  ...rest
}: ExtractProps<typeof Button>) {
  return (
    <Button
      className={className}
      size="small"
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}
