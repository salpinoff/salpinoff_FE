'use client';

import { PropsWithChildren, useEffect } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';

type Props = PropsWithChildren<{ name: string; disabled?: boolean }>;

function ScreenView({ name, children, disabled = false }: Props) {
  useEffect(() => {
    if (disabled) return;

    sendGTMEvent({
      event: 'view_screen',
      screenViewAt: new Date().toISOString(),
      screenName: name,
    });
  }, [disabled, name]);

  return children;
}

export default ScreenView;
