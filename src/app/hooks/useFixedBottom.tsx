import { useEffect, useState } from 'react';

const useFixedBottom = (initialBottom?: number) => {
  const [bottom, setBottom] = useState<number>(initialBottom || 0);

  const toggleTouchAction = () => {
    const main = document.querySelector('main');

    if (main) {
      const previous = main.style.touchAction;
      main.style.touchAction = previous === 'auto' ? 'none' : 'auto';
    }
  };

  useEffect(() => {
    const initialHeight = window.visualViewport?.height || 0;
    const handleResize = () => {
      const resizeHeight = window.visualViewport?.height || 0;
      const gap = initialHeight - resizeHeight;

      setBottom(gap);
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

  return [bottom, setBottom, toggleTouchAction] as const;
};

export default useFixedBottom;
