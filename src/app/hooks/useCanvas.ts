import { useEffect, useRef } from 'react';

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // 초기 캔버스 크기 설정
    resizeCanvas();
  }, []);

  return canvasRef;
};

export default useCanvas;
