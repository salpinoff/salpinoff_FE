import { useEffect } from 'react';

import { useBottomSheetCore } from './core';

type Props = ReturnType<typeof useBottomSheetCore>;

const useTouchEvent = ({ refs, event }: Props) => {
  useEffect(() => {
    const {
      content: { current: content },
    } = refs;

    const handleMouseDown = () => {
      event.cotents();
    };

    content?.addEventListener('touchstart', handleMouseDown);
    return () => {
      content?.removeEventListener('touchstart', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const {
      sheet: { current: sheet },
    } = refs;

    const handleTouchStart = (e: TouchEvent) => {
      event.start(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      event.move(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      event.end();
    };

    sheet?.addEventListener('touchstart', handleTouchStart);
    sheet?.addEventListener('touchmove', handleTouchMove);
    sheet?.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheet?.removeEventListener('touchstart', handleTouchStart);
      sheet?.removeEventListener('touchmove', handleTouchMove);
      sheet?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [event]);
};

export { useTouchEvent };
