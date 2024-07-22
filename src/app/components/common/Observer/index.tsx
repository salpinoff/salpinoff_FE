import useIntersectionObserver from '@hooks/useIntersectionObserver';

import { PropsOfFn } from '@type/util';

interface Props extends PropsOfFn<typeof useIntersectionObserver> {
  className?: string;
}

function Observer({ threshold = 0.5, className, ...restProps }: Props) {
  const { ref } = useIntersectionObserver({
    threshold,
    ...restProps,
  });

  return <div ref={ref} className={className} />;
}

export default Observer;
