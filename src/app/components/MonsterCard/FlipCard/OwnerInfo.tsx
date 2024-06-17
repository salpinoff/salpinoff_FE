import BaseText from '@components/common/Text/BaseText';

type OwnerInfoProps = {
  name: string;
};

export default function OwnerInfo({ name }: OwnerInfoProps) {
  return (
    <BaseText
      component="h3"
      variant="label-2"
      weight="semibold"
      className="mx-auto w-max text-cool-neutral-7"
    >
      {name}님의 퇴사몬
    </BaseText>
  );
}
