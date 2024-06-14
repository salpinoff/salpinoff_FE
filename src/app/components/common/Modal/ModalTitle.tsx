import BaseText, { BaseTextProps } from '@components/common/Text/BaseText';

type ModalTitleProps = Pick<
  BaseTextProps<'h3'>,
  'children' | 'className' | 'align'
>;

export default function ModalTitle({
  children,
  className,
  align = 'left',
}: ModalTitleProps) {
  return (
    <BaseText
      className={className}
      align={align}
      component="h3"
      variant="headline-1"
      color="normal"
    >
      {children}
    </BaseText>
  );
}
