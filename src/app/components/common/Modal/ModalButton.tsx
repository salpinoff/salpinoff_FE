import Button, { type ButtonProps } from '@components/common/Button';

import cn from '@utils/cn';

type ModalDiscriptionProps = React.PropsWithChildren<
  Pick<ButtonProps, 'className' | 'variant' | 'onClick'>
>;

export default function ModalButton({
  className,
  children,
  variant,
  onClick,
}: ModalDiscriptionProps) {
  return (
    <Button
      className={cn(className, 'font-normal')}
      size="small"
      variant={variant}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
