import BaseText from '@components/common/Text/BaseText';

type StressLevelWithNameProps = {
  level: string;
  name: string;
};

export default function StressLevelWithName({
  level,
  name,
}: StressLevelWithNameProps) {
  return (
    <div className="flex gap-8">
      <div className="flex rounded-6 bg-[#70737c47] px-8 py-4">
        <BaseText component="span" variant="caption-2" color="neutral">
          스트레스 {level}
        </BaseText>
      </div>
      <BaseText
        overflow="truncate"
        component="span"
        variant="body-1"
        weight="semibold"
        color="neutral"
      >
        {name}
      </BaseText>
    </div>
  );
}
