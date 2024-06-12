'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { useAtomValue } from 'jotai';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import AuthSuspense from '@components/common/Aync/AuthSuspense';
import BottomSheet from '@components/common/BottomSheet';
import BottomSheetContent from '@components/common/BottomSheet/BottomSheetContent';
import BottomSheetHeader from '@components/common/BottomSheet/BottomSheetHeader';
import BaseText from '@components/common/Text/BaseText';

import cn from '@utils/cn';

import { totalMessageAtom } from '@store/messageAtom';

import MessageList from './MessageList';

function MessageBottomSheet() {
  const totalCount = useAtomValue(totalMessageAtom);

  return (
    <BottomSheet>
      <BottomSheetHeader
        id="bottom_sheet_header"
        className="flex flex-none gap-8 px-24 pt-9"
      >
        <BaseText
          component="h2"
          variant="headline-1"
          weight="semibold"
          color="normal"
        >
          받은 응원 메시지
        </BaseText>
        <BaseText
          component="span"
          variant="label-1"
          weight="semibold"
          className={cn(
            'flex items-center justify-center',
            'aspect-square w-24 rounded-circular text-center',
            'bg-[var(--color-brand-primary-base)] text-black',
          )}
        >
          {totalCount ?? '?'}
        </BaseText>
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
              <ErrorBoundary fallback={<>...error</>}>
                <AuthSuspense fallback={<>loading...</>}>
                  <MessageList />
                </AuthSuspense>
              </ErrorBoundary>
            );
          }}
        </QueryErrorResetBoundary>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export default MessageBottomSheet;
