'use client';

// Error components must be Client Components

import { useEffect } from 'react';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <BaseText variant="heading-2" component="h2" color="strong">
        문제가 발생했어요!
      </BaseText>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
