import { useEffect } from 'react';

import { useBottomSheetCore } from './core';

type Props = ReturnType<typeof useBottomSheetCore>;

const useMouseEvent = ({ refs, event }: Props) => {
  useEffect(() => {
    const {
      content: { current: content },
    } = refs;

    const handleMouseDown = () => {
      event.cotents();
    };

    content?.addEventListener('mousedown', handleMouseDown);

    return () => {
      content?.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const {
      sheet: { current: sheet },
    } = refs;

    const handleMouseMove = (e: MouseEvent) => {
      event.move(e.clientY);
    };

    const handleMouseUp = () => {
      event.end();

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e: MouseEvent) => {
      event.start(e.clientY);

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    sheet?.addEventListener('mousedown', handleMouseDown);

    return () => {
      sheet?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [event]);
};

export { useMouseEvent };
