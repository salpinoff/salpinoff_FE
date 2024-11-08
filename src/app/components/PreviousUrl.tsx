'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { setSessionItem } from '@utils/session-storage';

function PreviousUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {
      setSessionItem('prevUrl', `${pathname}?${searchParams}`);
    };
  }, [pathname, searchParams]);

  return null;
}

export default PreviousUrl;
