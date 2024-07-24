'use client';

// Error components must be Client Components
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

import ExpiredModal from './components/ExpiredModal';

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  const status = Number(error.response?.status);

  useEffect(() => {
    // Log the error to an error reporting service
    if (status !== 404) console.error(error);
  }, [error]);

  if (status === 404) {
    return <ExpiredModal />;
  }

  return (
    <div>
      <BaseText variant="heading-2" component="h2" color="strong">
        문제가 발생했어요!
      </BaseText>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
