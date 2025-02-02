import { useEffect, useRef } from 'react';

const useCanvas = (width?: number, height?: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.width = width ? width * 2 : window.innerWidth;
        canvas.height = height ? height * 2 : window.innerHeight;
      }
    };

    // 초기 캔버스 크기 설정
    resizeCanvas();
  }, [width, height]);

  return canvasRef;
};

export default useCanvas;
