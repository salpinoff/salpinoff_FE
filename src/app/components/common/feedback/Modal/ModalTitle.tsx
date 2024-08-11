import Text, { TextProps } from '@components/common/Text';

type ModalTitleProps = TextProps<'h3'>;

export default function ModalTitle({
  children,
  className,
  align = 'left',
  ...restProps
}: ModalTitleProps) {
  return (
    <Text
      className={className}
      align={align}
      component="h3"
      variant="headline-1"
      color="normal"
      {...restProps}
    >
      {children}
    </Text>
  );
}
