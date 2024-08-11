import Text from '@components/common/Text';

type StressLevelBadgeProps = {
  level: string | number;
};

export default function StressLevelBadge({ level }: StressLevelBadgeProps) {
  return (
    <Text
      className="flex rounded-6 bg-[#70737c47] px-8 py-4"
      component="span"
      variant="caption-2"
      color="neutral"
    >
      스트레스 {level}
    </Text>
  );
}
