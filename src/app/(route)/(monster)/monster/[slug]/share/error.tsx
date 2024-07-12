'use client';

// Error components must be Client Components
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

import OutlineCard from '@components/cards/OutlineCard';
import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  const status = Number(error.response?.status);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  if (status === 404)
    // [TODO] 404 컴포넌트 분리
    return (
      <div>
        <OutlineCard
          width={312}
          height={460}
          className="flex h-full w-full flex-col justify-center overflow-visible rounded-[40px] text-cool-neutral-22"
        >
          <BaseText
            variant="body-1"
            weight="semibold"
            component="h2"
            color="strong"
          >
            {error.response?.data.message}
          </BaseText>
        </OutlineCard>
      </div>
    );

  return (
    <div>
      <BaseText variant="heading-2" component="h2" color="strong">
        문제가 발생했어요!
      </BaseText>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
