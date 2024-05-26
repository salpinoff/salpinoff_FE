import Button from '@components/common/Button';

import cn from '@utils/cn';

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
      className={cn(className, 'font-normal')}
      size="small"
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}
