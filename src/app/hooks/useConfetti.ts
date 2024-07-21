import { useRef, useState, type RefObject } from 'react';

type AddConfettiConfig = {
  image: {
    src: string;
    width: number;
    height: number;
  };
  start?: 'bottom' | 'center';
  speed: number;
  particleNumber: number;
};

function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export default function useConfetti(ref: RefObject<HTMLCanvasElement>) {
  const requestRef = useRef<number>(0);
  const particlesRef = useRef<
    (ReturnType<typeof getRandomPosition> & {
      width: number;
      height: number;
    })[]
  >([]);

  const [init, setInit] = useState(false);

  const getRandomPosition = (
    canvas: HTMLCanvasElement,
    start: AddConfettiConfig['start'],
  ) => {
    const { width, height } = canvas;

    const random = (value: number) =>
      value * 0.25 + Math.random() * value * 0.5; // 25% ~ 75%

    const controlX = () => width * 0.1 + Math.random() * width * 0.8;
    const controlY = () => height * 0.1 + Math.random() * height * 0.4;

    const startY = start === 'bottom' ? height : random(height);

    return {
      startX: random(width),
      startY,
      endX: Math.random() * width,
      endY: -Math.random() * height,
      controlX1: controlX(),
      controlX2: controlX(),
      controlY1: controlY(),
      controlY2: controlY(),
      alpha: Math.floor(Math.random() * 11) / 10,
      progress: 0,
    };
  };

  const clearCanvas = () => {
    const canvas = ref.current;

    if (canvas) {
      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const initializeParticles = (
    canvas: HTMLCanvasElement,
    image: AddConfettiConfig['image'],
    start: AddConfettiConfig['start'],
    particleNumber: number,
  ) => {
    particlesRef.current = Array.from({ length: particleNumber }, () => {
      const position = getRandomPosition(canvas, start);
      const ratio = 0.4 + Math.random() * 0.6;

      return {
        ...position,
        width: image.width * ratio,
        height: image.height * ratio,
      };
    });
  };

  const draw = (
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    speed: number,
  ) => {
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    if (!canvas || !ctx) return;

    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    particlesRef.current = particles
      .map((value) => {
        const next = { ...value };

        const t = next.progress / canvas.height;
        const dx = Math.min(next.width, image.width);
        const dy = Math.min(next.height, image.height);
        const currentX =
          (1 - t) ** 3 * next.startX +
          3 * (1 - t) ** 2 * t * next.controlX1 +
          3 * (1 - t) * t ** 2 * next.controlX2 +
          t ** 3 * next.endX;
        const currentY =
          (1 - t) ** 3 * next.startY +
          3 * (1 - t) ** 2 * t * next.controlY1 +
          3 * (1 - t) * t ** 2 * next.controlY2 +
          t ** 3 * next.endY;

        next.alpha += speed * 0.001;
        next.progress +=
          speed * 1 + (speed - 1) * (next.startY / canvas.height) * 0.1;
        next.width += next.width * 0.02;
        next.height += next.height * 0.02;

        ctx.globalAlpha = next.alpha;
        ctx.drawImage(image, currentX - dx / 2, currentY - dy / 2, dx, dy);

        return next.progress > canvas.height + image.height ? null : next;
      })
      .filter(isDefined);

    if (particlesRef.current.length === 0) {
      cancelAnimationFrame(requestRef.current);
    } else {
      requestRef.current = requestAnimationFrame(() =>
        draw(canvas, image, speed),
      );
    }
  };

  const addConfetti = ({
    image,
    start = 'bottom',
    speed,
    particleNumber,
  }: AddConfettiConfig) => {
    if (!ref.current) return;

    const canvas = ref.current;

    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        setInit(true);
        initializeParticles(canvas, image, start, particleNumber);
        requestRef.current = requestAnimationFrame(() =>
          draw(canvas, img, speed),
        );
      };
    }
  };

  const destroyCanvas = () => {
    try {
      if (init) {
        ref.current?.remove();
        cancelAnimationFrame(requestRef.current);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    addConfetti,
    clearCanvas,
    destroyCanvas,
  };
}
