import BaseText, { BaseTextProps } from '@components/common/Text/BaseText';

type ModalTitleProps = BaseTextProps<'h3'>;

export default function ModalTitle({
  children,
  className,
  align = 'left',
  ...restProps
}: ModalTitleProps) {
  return (
    <BaseText
      className={className}
      align={align}
      component="h3"
      variant="headline-1"
      color="normal"
      {...restProps}
    >
      {children}
    </BaseText>
  );
}
