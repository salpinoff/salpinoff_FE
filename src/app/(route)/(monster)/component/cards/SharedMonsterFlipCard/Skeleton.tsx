import CardActionArea from '@components/cards/MonsterFlipCard/CardActionArea';
import CardContent from '@components/cards/MonsterFlipCard/CardContent';
import OutlineCard from '@components/cards/OutlineCard';

import tokens from 'tokens/color/base.json';

const SUB_FLIP_CARD_WIDTH = 302;
const SUB_FLIP_CARD_HEIGHT = 450;

export default function SharedMonsterFlipCardSkeleton() {
  return (
    <OutlineCard
      width={SUB_FLIP_CARD_WIDTH}
      height={SUB_FLIP_CARD_HEIGHT}
      color={tokens.color.base['cool-neutral'][22].value}
      className="flex h-full w-full flex-col justify-between overflow-visible rounded-[40px]"
    >
      <CardActionArea />
      <CardContent>
        <div className="flex animate-pulse flex-col justify-between text-cool-neutral-17">
          <div className="mb-[12px] flex h-[18px] items-center gap-8">
            <span className="flex h-full w-[64px] rounded-6 bg-current px-8 py-4" />
            <span className="flex h-full w-[42px] rounded-6 bg-current px-8 py-4" />
          </div>
          <div className="flex h-[18px] justify-between">
            <div className="h-full w-10/12 rounded-circular bg-current" />
            <span className="h-full w-[22px] rounded-6 bg-current bg-current" />
          </div>
        </div>
      </CardContent>
    </OutlineCard>
  );
}
