'use client';

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useAtomValue } from 'jotai';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import AuthSuspense from '@components/common/Aync/AuthSuspense';
import BottomSheet from '@components/common/BottomSheet';
import BottomSheetContent from '@components/common/BottomSheet/BottomSheetContent';
import BottomSheetHeader from '@components/common/BottomSheet/BottomSheetHeader';
import Dimmed from '@components/common/feedback/Dimmed';
import Text from '@components/common/Text';

import cn from '@utils/cn';
import { getQueryClient } from '@utils/query/get-query-client';

import MessageQueryFactory from '@api/message/query/factory';
import { getRefMonster } from '@api/monster';
import MonsterQueryFactory from '@api/monster/query/factory';

import { Unpromise } from '@type/util';

import { totalMessageAtom } from '@store/messageAtom';
import RefreshSVG from 'public/icons/refresh.svg';

import MessageFallback from './MessageFallback';
import MessageList from './MessageList';
import MessageLoader from './MessageLoader';

type RepMonster = Unpromise<ReturnType<typeof getRefMonster>>;

function MessageBottomSheet() {
  const totalCount = useAtomValue(totalMessageAtom);

  const queryClient = getQueryClient();
  const repMonster = queryClient.getQueryData<RepMonster>([
    ...MonsterQueryFactory.reference.queryKey,
  ]);

  const [isFetching, setIsFetching] = useState(false);

  const handleClick = () => {
    setIsFetching(true);

    queryClient
      .invalidateQueries({
        queryKey: MessageQueryFactory.list.key({
          monsterId: String(repMonster?.monsterId),
        }),
      })
      .then(() => {
        setTimeout(() => setIsFetching(false), 200);
      });
  };

  return (
    <>
      <Dimmed className="z-0 hidden" />
      <BottomSheet className="z-0">
        <BottomSheetHeader
          id="bottom_sheet_header"
          className="flex flex-none justify-center px-24 pt-9"
        >
          <div className="flex flex-1 gap-x-8">
            <Text
              component="h2"
              variant="headline-1"
              weight="semibold"
              color="normal"
            >
              받은 응원 메시지
            </Text>
            <Text
              component="span"
              variant="label-1"
              weight="semibold"
              className={cn(
                'flex items-center justify-center',
                'aspect-square h-24 w-24 rounded-circular text-center',
                'bg-[var(--color-brand-primary-base)] text-black',
              )}
            >
              {totalCount ?? '?'}
            </Text>
          </div>

          <button
            type="button"
            onClick={handleClick}
            className={cn('flex aspect-square items-center justify-center', {
              'animate-spin': isFetching,
            })}
          >
            <span className="a11yHidden">새로고침</span>
            <RefreshSVG />
          </button>
        </BottomSheetHeader>

        <BottomSheetContent
          component="ul"
          id="bottom_sheet_content"
          className={cn(
            'w-full px-24 pb-[18px]',
            'mt-12 grid flex-grow-0 grid-cols-4 gap-12 overflow-auto',
          )}
        >
          <QueryErrorResetBoundary>
            {() => {
              return (
                <ErrorBoundary
                  fallback={
                    <MessageFallback label="에러가 발생했어요" color="error" />
                  }
                >
                  <AuthSuspense fallback={<MessageLoader />}>
                    <MessageList />
                  </AuthSuspense>
                </ErrorBoundary>
              );
            }}
          </QueryErrorResetBoundary>
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
}

export default MessageBottomSheet;
