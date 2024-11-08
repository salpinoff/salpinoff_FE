import { useEffect, useState } from 'react';

const useFixedBottom = (initialBottom?: number) => {
  const [bottom, setBottom] = useState<number>(initialBottom || 0);

  useEffect(() => {
    const initialHeight = window.visualViewport?.height || 0;
    const handleResize = () => {
      const resizeHeight = window.visualViewport?.height || 0;
      const gap = initialHeight - resizeHeight;

      setBottom(() => (gap < 0 ? 0 : gap));
    };

    if (window.visualViewport) {
      window.visualViewport.onresize = handleResize;
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.onresize = null;
      }
    };
  }, []);

  return [bottom, setBottom] as const;
};

export default useFixedBottom;
