'use client';

// Error components must be Client Components
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

import Button from '@components/common/Button';
import Text from '@components/common/Text';

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
      <Text variant="heading-2" component="h2" color="strong">
        문제가 발생했어요!
      </Text>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
