'use client';

import { PropsWithChildren, useEffect } from 'react';

import { sendGAEvent } from '@next/third-parties/google';

type Props = PropsWithChildren<{ name: string }>;

function ScreenView({ name, children }: Props) {
  useEffect(() => {
    sendGAEvent({
      event: 'view_screen',
      screenViewAt: new Date().toISOString(),
      screenName: name,
    });
  }, []);

  return children;
}

export default ScreenView;
