import Image from 'next/image';

import RoundedTrapezoidSVG from '@public/icons/rounded-trapezoid.svg';

import BaseText from '@components/common/Text/BaseText';

import CardBase, { type CardBaseProps } from './CardBase';

type BasicCardProps = CardBaseProps & {
  name: string;
};

export function BasicCard({ color, name }: BasicCardProps) {
  return (
    <CardBase color={color}>
      {/* 🚧 예시 - 이후 개선 필요 */}
      <Image src="/sample.png" width={200} height={200} alt="Sample Monster" />
      {/* 이름표 */}
      <div className="absolute bottom-0 flex h-[25px] items-center justify-center text-cool-neutral-7">
        <RoundedTrapezoidSVG />
        <BaseText
          className="absolute w-[60%] text-center"
          component="span"
          variant="label-2"
          weight="semibold"
          color="normal"
          overflow="truncate"
          maxRows={1}
        >
          {name}
        </BaseText>
      </div>
    </CardBase>
  );
}
