import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  initialHeight?: number;
  topY?: number;
};

type Constant = Record<
  'TOP_Y' | 'BOTTOM_Y' | 'MAX_BOTTOM_Y',
  number | undefined
>;

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  touchEnd: {
    touchY: number;
  };
  isContentTouched: boolean;
}

const useBottomSheetCore = ({ initialHeight = 163, topY = 60 }: Props) => {
  const [constant, setContant] = useState<Constant>({
    TOP_Y: topY,
    BOTTOM_Y: undefined,
    MAX_BOTTOM_Y: undefined,
  });

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
    touchEnd: {
      touchY: 0,
    },
    isContentTouched: false,
  });

  const event = useMemo(
    () => ({
      cotents: () => {
        metrics.current.isContentTouched = true;
      },
      start: (clientY: number) => {
        const { touchStart } = metrics.current;

        touchStart.sheetY = sheet.current?.getBoundingClientRect().y || 0;
        touchStart.touchY = clientY;
      },
      move: (clientY: number) => {
        const { TOP_Y, BOTTOM_Y, MAX_BOTTOM_Y } = constant;

        if (
          TOP_Y === undefined ||
          BOTTOM_Y === undefined ||
          MAX_BOTTOM_Y === undefined
        )
          return;

        const { touchMove, touchStart, touchEnd } = metrics.current;
        const { isContentTouched } = metrics.current;
        const currentTouch = clientY;

        touchMove.prevTouchY = touchStart.touchY;
        touchMove.movingDirection =
          touchMove.prevTouchY < currentTouch ? 'down' : 'up';

        if (isContentTouched) {
          document.body.style.overflowY = 'hidden';
          return;
        }

        const touchOffset = currentTouch - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= TOP_Y) {
          nextSheetY = TOP_Y;
        }

        if (nextSheetY >= BOTTOM_Y && nextSheetY < MAX_BOTTOM_Y) {
          nextSheetY = BOTTOM_Y;
        }

        if (nextSheetY >= MAX_BOTTOM_Y) {
          nextSheetY = MAX_BOTTOM_Y;
        }

        touchEnd.touchY = nextSheetY;
        sheet.current?.style.setProperty(
          'transform',
          `translateY(${nextSheetY - TOP_Y}px)`,
        );
      },
      end: () => {
        const { TOP_Y, BOTTOM_Y, MAX_BOTTOM_Y } = constant;

        if (
          TOP_Y === undefined ||
          BOTTOM_Y === undefined ||
          MAX_BOTTOM_Y === undefined
        )
          return;

        const { touchMove, touchEnd } = metrics.current;
        const { isContentTouched } = metrics.current;

        const dimmed = document.querySelector('#dimmed');

        if (touchMove.movingDirection === 'down' && !isContentTouched) {
          const targetEnd =
            touchEnd.touchY >= MAX_BOTTOM_Y ? MAX_BOTTOM_Y : BOTTOM_Y;

          dimmed?.classList.add('hidden');
          sheet.current?.style.setProperty(
            'transform',
            `translateY(${targetEnd - TOP_Y}px)`,
          );
        }

        if (touchMove.movingDirection === 'up') {
          const targetEnd = touchEnd.touchY < BOTTOM_Y ? 0 : BOTTOM_Y;

          if (targetEnd === 0) {
            dimmed?.classList.remove('hidden');
          }

          sheet.current?.style.setProperty(
            'transform',
            `translateY(${targetEnd})`,
          );
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
          touchEnd: {
            touchY: 0,
          },
          isContentTouched: false,
        };
      },
    }),
    [constant],
  );

  useEffect(() => {
    setContant((prev) => ({
      ...prev,
      BOTTOM_Y: window.innerHeight - initialHeight,
      MAX_BOTTOM_Y:
        window.innerHeight - (initialHeight - Math.floor(initialHeight / 2)),
    }));
  }, []);

  return {
    event,
    refs: {
      sheet,
      content,
    },
  };
};

export { useBottomSheetCore };
