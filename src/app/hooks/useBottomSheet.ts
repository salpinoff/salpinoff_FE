import { useEffect, useRef } from 'react';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentTouched: boolean;
}

type Props = {
  initialHeight?: number;
  topY?: number;
};

const useBottomSheet = ({ initialHeight = 163, topY = 60 }: Props) => {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentTouched: false,
  });

  useEffect(() => {
    const contentArea = content.current;
    const handleTouchStart = () => {
      metrics.current.isContentTouched = true;
    };

    contentArea?.addEventListener('touchstart', handleTouchStart);

    return () => {
      contentArea?.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    const TOP_Y = topY;
    const BOTTOM_Y = window.innerHeight - initialHeight;
    const bottomSheet = sheet.current;

    const checkTouchContent = () => {
      const { isContentTouched } = metrics.current;

      return isContentTouched;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = bottomSheet?.getBoundingClientRect().y || 0;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchMove, touchStart } = metrics.current;
      const currentTouch = e.touches[0];

      touchMove.prevTouchY = touchStart.touchY;
      touchMove.movingDirection =
        touchMove.prevTouchY < currentTouch.clientY ? 'down' : 'up';

      if (checkTouchContent()) {
        document.body.style.overflowY = 'hidden';
        return;
      }

      e.preventDefault();
      const touchOffset = currentTouch.clientY - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      if (nextSheetY <= TOP_Y) {
        nextSheetY = TOP_Y;
      }

      if (nextSheetY > BOTTOM_Y) {
        nextSheetY = BOTTOM_Y;
      }

      bottomSheet?.style.setProperty(
        'transform',
        `translateY(${nextSheetY - TOP_Y}px)`,
      );
    };

    const handleTouchEnd = () => {
      const { touchMove } = metrics.current;

      if (touchMove.movingDirection === 'down' && !checkTouchContent()) {
        bottomSheet?.style.setProperty(
          'transform',
          `translateY(${BOTTOM_Y - TOP_Y}px)`,
        );
      }

      if (touchMove.movingDirection === 'up') {
        bottomSheet?.style.setProperty('transform', `translateY(0)`);
      }

      document.body.style.overflowY = 'auto';
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentTouched: false,
      };
    };

    bottomSheet?.addEventListener('touchstart', handleTouchStart);
    bottomSheet?.addEventListener('touchmove', handleTouchMove);
    bottomSheet?.addEventListener('touchend', handleTouchEnd);

    return () => {
      bottomSheet?.removeEventListener('touchstart', handleTouchStart);
      bottomSheet?.removeEventListener('touchmove', handleTouchMove);
      bottomSheet?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return { sheet, content };
};

export default useBottomSheet;
