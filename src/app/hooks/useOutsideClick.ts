import { type RefObject, useEffect } from 'react';

type EventType = keyof Pick<
  GlobalEventHandlersEventMap,
  'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout'
>;

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: GlobalEventHandlersEventMap[EventType]) => void,
  eventType: EventType = 'mousedown',
  options: AddEventListenerOptions = {},
): void {
  useEffect(() => {
    const listener = (event: GlobalEventHandlersEventMap[EventType]) => {
      const target = event.target as Node;
      const isOutside = ref.current && !ref.current.contains(target);

      if (!target || !target.isConnected) {
        return;
      }

      if (isOutside) {
        handler(event);
      }
    };

    window.addEventListener(eventType, listener, options);

    return () => {
      window.removeEventListener(eventType, listener, options);
    };
  }, [ref, eventType, options, handler]);
}