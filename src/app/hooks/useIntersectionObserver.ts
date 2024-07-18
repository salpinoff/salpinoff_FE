import { useEffect, useRef, useState } from 'react';

type State = {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry | null;
};

type UseIntersectionObserverOptions = IntersectionObserverInit & {
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
  onChange?: (
    isIntersecting: boolean,
    entry: IntersectionObserverEntry,
  ) => void;
};

const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  freezeOnceVisible = false,
  initialIsIntersecting = false,
  onChange,
}: UseIntersectionObserverOptions) => {
  const [ref, setRef] = useState<Element | null>(null);

  const [state, setState] = useState<State>(() => ({
    isIntersecting: false,
    entry: null,
  }));

  const prevRef = useRef<Element | null>(null);

  const callbackRef = useRef<UseIntersectionObserverOptions['onChange']>();
  callbackRef.current = onChange;

  const frozen = state.entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    if (!ref) return;

    if (!('IntersectionObserver' in window)) return;

    let unobserve: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds];

        entries.forEach((entry) => {
          const isIntersecting =
            entry.isIntersecting &&
            thresholds.some(
              (_threshold) => entry.intersectionRatio >= _threshold,
            );

          setState({ isIntersecting, entry });

          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry);
          }

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = undefined;
          }
        });
      },
      { threshold, root, rootMargin },
    );

    observer.observe(ref);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, frozen, freezeOnceVisible]);

  useEffect(() => {
    if (
      !ref &&
      state.entry?.target &&
      !freezeOnceVisible &&
      !frozen &&
      prevRef.current !== state.entry.target
    ) {
      prevRef.current = state.entry.target;
      setState({ isIntersecting: initialIsIntersecting, entry: undefined });
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);

  return {
    ref: setRef,
    ...state,
  };
};

export default useIntersectionObserver;
