import { ComponentProps, useEffect } from 'react';

import useCanvas from '@hooks/useCanvas';

import cn from '@utils/cn';
import getImagePath from '@utils/customs';

type CharacterCanvasProps = ComponentProps<'div'> & {
  type: 'mad' | 'sad';
  status?: 'before' | 'after';
  background?: string;
  items?: string[];
};

export default function CharacterCanvas({
  className,
  type,
  status = 'before',
  background,
  items = [],
  ...rest
}: CharacterCanvasProps) {
  const canvasRef = useCanvas();

  const fillBackground = (ctx: CanvasRenderingContext2D, fillStyle: string) => {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = () =>
        reject(console.error(`Failed to load image from ${src}`));
    });
  };

  const drawImages = async (
    ctx: CanvasRenderingContext2D,
    sources: string[],
    fillStyle?: string,
  ) => {
    const images = await Promise.all(sources.map((src) => loadImage(src)));

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (fillStyle) fillBackground(ctx, fillStyle);

    images.forEach((image) => {
      ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';

      const imageSources = [
        getImagePath('monsters', `${type}_${status}`),
        ...items.map((item) => getImagePath('items', item)),
      ];

      if (imageSources.length) drawImages(ctx, imageSources, background);
    }
  }, [canvasRef, type, status, items, background]);

  return (
    <div
      className={cn('relative mx-auto overflow-hidden', className)}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
      />
    </div>
  );
}
