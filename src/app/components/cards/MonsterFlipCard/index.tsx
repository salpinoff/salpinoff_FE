import { Children, ReactNode, isValidElement } from 'react';

import FlipCard, { type FlipCardProps } from '@components/cards/FlipCard';
import OutlineCard, {
  type OutlineCardProps,
} from '@components/cards/OutlineCard';

import cn from '@utils/cn';

import CardActionArea from './CardActionArea';
import CardBack from './CardBack';
import CardContent from './CardContent';

type MonsterFlipCardProps = FlipCardProps & OutlineCardProps;

const getChild = (children: ReactNode, type: string) => {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter((child) => isValidElement(child) && child.type === type)
    .slice(0, 1);
};

export default function MonsterFlipCard({
  children,
  className,
  width,
  height,
  color,
  flipped,
  onFlipped,
  ...rest
}: MonsterFlipCardProps) {
  const cardActionArea = getChild(children, (<CardActionArea />).type);
  const cardContent = getChild(children, (<CardContent />).type);
  const cardBack = getChild(children, (<CardBack />).type);

  return (
    <FlipCard
      className={cn('m-[5px]', className)}
      flipped={flipped}
      onFlipped={onFlipped}
      style={{
        width,
        height,
      }}
      {...rest}
    >
      <OutlineCard
        color={color}
        className="flex h-full w-full flex-col justify-between overflow-visible rounded-[40px]"
      >
        {cardActionArea && cardActionArea}
        {cardContent && cardContent}
      </OutlineCard>
      <OutlineCard
        color={color}
        className="h-full w-full overflow-visible rounded-[40px]"
      >
        {cardBack && cardBack}
      </OutlineCard>
    </FlipCard>
  );
}

MonsterFlipCard.displayName = 'MonsterFlipCard';

MonsterFlipCard.ActionArea = CardActionArea;
MonsterFlipCard.Content = CardContent;
MonsterFlipCard.Back = CardBack;
