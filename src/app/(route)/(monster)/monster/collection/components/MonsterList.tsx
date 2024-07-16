import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import CharacterCanvas from '@components/CharacterCanvas';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import cn from '@utils/cn';

import { getMonsterList } from '@api/monster';
import MonsterQueryFactory from '@api/monster/query/factory';

import SquareMonsterCard from '../../../component/cards/SquareMonsterCard';

export default function MonsterList() {
  const PER_SIZE = 10;

  const {
    data: { pages },
    hasNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: MonsterQueryFactory.list.queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getMonsterList({
        page: pageParam as number,
        size: PER_SIZE,
      });
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.content.length >= PER_SIZE ? allPages.length + 1 : null;
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    select: ({ pages, pageParams }) => {
      return {
        pages: pages
          .map(({ content }) => content)
          .flat()
          .map((_data) => Adapter.from(_data).to(transformMonster)),
        pageParams,
      };
    },
  });

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: true,
    initialIsIntersecting: true,
    onChange: (isIntersecting) => {
      if (isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div
      className={cn(
        'mx-auto flex max-h-full w-max flex-col gap-32 px-[5px] py-24',
        'overflow-y-auto scrollbar-hide',
      )}
    >
      {pages.map(({ monsterId, monsterName, type, decorations }, idx) => {
        const { BACKGROUND_COLOR, ...REST_DECOS } = decorations;

        return (
          <SquareMonsterCard
            {...(idx === pages.length - 1 ? { ref } : {})}
            key={monsterId + monsterName}
            name={monsterName}
            color={BACKGROUND_COLOR}
            className="relative h-[240px] min-h-[240px] w-[240px]"
          >
            <CharacterCanvas
              width={480}
              height={480}
              type={type}
              items={Object.values(REST_DECOS)}
              className={cn(
                'h-full w-full',
                type === 'mad' && ' -translate-y-[20px]',
                type === 'sad' && ' -translate-y-[10px]',
              )}
            />
          </SquareMonsterCard>
        );
      })}
    </div>
  );
}
