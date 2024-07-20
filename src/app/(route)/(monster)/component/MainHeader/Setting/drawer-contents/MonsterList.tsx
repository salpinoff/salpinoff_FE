import Image from 'next/image';

import { useState } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import MonsterFlipCard from '@components/cards/MonsterFlipCard';
import CharacterCanvas from '@components/CharacterCanvas';
import AuthSuspense from '@components/common/Aync/AuthSuspense';
import BottomSheet from '@components/common/BottomSheet';
import BottomSheetContent from '@components/common/BottomSheet/BottomSheetContent';
import BottomSheetHeader from '@components/common/BottomSheet/BottomSheetHeader';
import Badge from '@components/common/data-display/Badge';
import Drawer from '@components/common/navigation/Drawer';
import BaseText from '@components/common/Text/BaseText';
import Header from '@components/Header';
import ProgressBar from '@components/ProgressBar';

import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useModal from '@hooks/useModal';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import cn from '@utils/cn';

import { getNextMessageList } from '@api/message/list';
import MessageQueryFactory from '@api/message/query/factory';
import { getMonsterList } from '@api/monster';
import MonsterQueryFactory from '@api/monster/query/factory';
import { GetMonsterListResponse } from '@api/monster/types';

import { Unpromise } from '@type/util';

import { StressLevelBadge } from 'src/app/(route)/(monster)/component/cards/_ui';

import SquareMonsterCard from '../../../cards/SquareMonsterCard';

const PER_SIZE = 10;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractObjectTypes<T extends any[]> = {
  [K in keyof T]: T[K] extends object ? T[K] : never;
};

type DetailDrawerProps = {
  monster: ReturnType<
    typeof transformMonster<
      ExtractObjectTypes<GetMonsterListResponse['content']>[number]
    >
  >;
  closeDrawer: () => void;
};

type LastPage = {
  isLast: boolean;
  nextPage: number | undefined;
  result: Unpromise<ReturnType<typeof getNextMessageList>>['result'];
};

function DetailDrawer({ monster, closeDrawer }: DetailDrawerProps) {
  const [flipped, setFlipped] = useState(false);

  const {
    list: { key, fetcher },
  } = MessageQueryFactory;

  const {
    data: { messageList },
  } = useSuspenseInfiniteQuery({
    retry: 1,
    staleTime: 0,
    initialPageParam: 1,
    queryKey: key({ monsterId: `${monster.monsterId}` }),
    queryFn: ({ pageParam = 1 }) =>
      fetcher({ monsterId: Number(monster.monsterId), page: pageParam }),
    getNextPageParam: ({ nextPage }: LastPage) => {
      return nextPage;
    },
    select: (pages) => ({
      messageList: pages.pages
        .map(({ result }) => result.list)
        .flat()
        .sort((a, b) => Number(a.checked) - Number(b.checked)),
      totalElements: pages.pages[0].result.totalElements,
    }),
  });

  const { BACKGROUND_COLOR, ...REST_DECOS } = monster.decorations;

  const toggleCard = () => setFlipped((prev) => !prev);

  return (
    <Drawer open>
      <div className="h-full w-full">
        <Header className="grid grid-cols-6 gap-4">
          <Header.IconButton
            name="arrow-back"
            aria-label="뒤로가기"
            className="col-span-1 col-start-1"
            onClick={closeDrawer}
          />
          <Header.Title className="col-span-4 col-start-2 mx-auto">
            상세보기
          </Header.Title>
        </Header>
        <section className="h-[calc(100vh-48px)] w-full">
          <MonsterFlipCard
            className="mx-auto py-[12px]"
            width={312}
            height={400}
            flipped={flipped}
            color={BACKGROUND_COLOR}
            onClick={toggleCard}
            onTouchMove={toggleCard}
          >
            <MonsterFlipCard.ActionArea className="overflow-hidden p-0">
              <CharacterCanvas
                width={560}
                height={560}
                type={monster.type}
                status={monster.status}
                items={Object.values(REST_DECOS)}
                background={BACKGROUND_COLOR}
              />
            </MonsterFlipCard.ActionArea>
            <MonsterFlipCard.Content>
              <div className="flex items-center justify-between">
                <div className="pointer-event-none flex select-none items-center gap-8">
                  <StressLevelBadge level={monster.ratingRange} />
                  <BaseText
                    overflow="truncate"
                    component="span"
                    variant="body-1"
                    weight="semibold"
                    color="neutral"
                  >
                    {monster.monsterName}
                  </BaseText>
                </div>
              </div>
              <ProgressBar
                value={monster.currentInteractionCount}
                max={monster.interactionCount}
                label="percent"
              />
            </MonsterFlipCard.Content>
            <MonsterFlipCard.Back>
              <div
                className="flex h-full w-full items-center justify-center"
                role="none"
                onClick={() => setFlipped(true)}
              >
                <BaseText
                  className="my-auto flex max-h-full overflow-y-auto text-center"
                  component="p"
                  variant="body-2"
                  weight="medium"
                  color="strong"
                  wrap
                >
                  {monster.content}
                </BaseText>
              </div>
            </MonsterFlipCard.Back>
          </MonsterFlipCard>
          <div>
            <BottomSheet className="overflow-auto scrollbar-hide">
              <BottomSheetHeader id="bottom_sheet_header">
                <Badge
                  variant="string"
                  color="inverse"
                  count={messageList.length}
                  max={999}
                  showZero
                  className="mt-12 flex justify-center text-center text-inherit"
                >
                  <BaseText
                    component="h3"
                    variant="headline-2"
                    weight="semibold"
                    color="normal"
                  >
                    받은 메세지
                  </BaseText>
                </Badge>
              </BottomSheetHeader>
              <BottomSheetContent
                component="ul"
                id="bottom_sheet_content"
                className="mx-auto flex w-[312px] flex-col gap-y-[16px] pb-[20px]"
              >
                {messageList.map(({ messageId, sender, content }) => (
                  <li
                    className={cn(
                      'rounded-12 border border-[#70737C52] outline-none',
                      'bg-[#70737C38]',
                      'w-full shrink-0 resize-none px-16 py-12',
                      'whitespace-pre-wrap',
                    )}
                    id={`message_${messageId}`}
                    key={messageId}
                  >
                    <BaseText component="p" variant="label-1" color="normal">
                      {content}
                    </BaseText>
                    <BaseText
                      className="mt-12 block w-full"
                      component="span"
                      variant="label-2"
                      weight="medium"
                      color="alternative"
                      align="right"
                    >
                      From.{sender}
                    </BaseText>
                  </li>
                ))}
              </BottomSheetContent>
            </BottomSheet>
          </div>
        </section>
      </div>
    </Drawer>
  );
}

export default function MonsterList() {
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

  const { openModal, closeModal } = useModal(() => null);

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

  const handleClick = (idx: number) => {
    openModal(() => (
      <DetailDrawer monster={pages[idx]} closeDrawer={closeModal} />
    ));
  };

  return (
    <AuthSuspense fallback={<>...Loading</>}>
      <div
        className={cn(
          'mx-auto flex h-[calc(100vh-48px)] max-h-full w-max flex-col gap-32 px-32 py-24',
          'overflow-y-auto scrollbar-hide',
        )}
      >
        {pages.length &&
          pages.map((data, idx) => {
            const { monsterId, monsterName, type, decorations } = data;
            const { BACKGROUND_COLOR, ...REST_DECOS } = decorations;

            return (
              <SquareMonsterCard
                {...(idx === pages.length - 1 ? { ref } : {})}
                key={monsterId + monsterName}
                name={monsterName}
                color={BACKGROUND_COLOR}
                className="relative h-[240px] min-h-[240px] w-[240px]"
                onClick={() => handleClick(idx)}
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

        {pages.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Image
              width={200}
              height={200}
              src="/images/monsters/sad_before0000.png"
              alt="슬픈 캐릭터"
              className="opacity-30 grayscale"
            />

            <BaseText variant="body-2" color="alternative">
              아직 완료된 퇴사몬이 없어요
            </BaseText>
          </div>
        )}
      </div>
    </AuthSuspense>
  );
}