import { forwardRef } from 'react';

import RoundedTrapezoidSVG from '@public/icons/rounded-trapezoid.svg';

import OutlineCard, {
  type OutlineCardProps,
} from '@components/cards/OutlineCard';
import BaseText from '@components/common/Text/BaseText';

import cn from '@utils/cn';

type SquareMonsterCardProps = OutlineCardProps & {
  name: string;
};

const SquareMonsterCard = forwardRef<HTMLDivElement, SquareMonsterCardProps>(
  function SquareMonsterCard(
    { className, children, color, name, ...rest },
    ref,
  ) {
    return (
      <OutlineCard
        ref={ref}
        color={color}
        className={cn(
          'aspect-square h-[240px] w-[240px] rounded-[36px]',
          className,
        )}
        {...rest}
      >
        {children}
        <div className="absolute bottom-0 text-cool-neutral-7">
          <RoundedTrapezoidSVG />
          <BaseText
            className="absolute bottom-0 left-0 right-0 top-0 m-auto w-[60%] pb-4 pt-6 text-center"
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
