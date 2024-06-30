import { forwardRef } from 'react';

import RoundedTrapezoidSVG from '@public/icons/rounded-trapezoid.svg';

import BaseText from '@components/common/Text/BaseText';
import OutlineCard, { type OutlineCardProps } from '@components/OutlineCard';

type SquareMonsterCardProps = OutlineCardProps & {
  name: string;
};

const SquareMonsterCard = forwardRef<HTMLDivElement, SquareMonsterCardProps>(
  function SquareMonsterCard({ children, color, name, ...rest }, ref) {
    return (
      <OutlineCard
        ref={ref}
        color={color}
        className="aspect-square h-[240px] w-[240px] rounded-[36px]"
        {...rest}
      >
        {children}
        <div className="absolute bottom-0 text-cool-neutral-7">
          <RoundedTrapezoidSVG />
          <BaseText
            className="absolute bottom-0 left-0 right-0 top-0 m-auto w-[60%] text-center !leading-[28px]"
            component="span"
            variant="label-2"
            weight="semibold"
            color="normal"
            overflow="truncate"
            maxRows={1}
          >
            {name && name}
          </BaseText>
        </div>
      </OutlineCard>
    );
  },
);

export default SquareMonsterCard;
