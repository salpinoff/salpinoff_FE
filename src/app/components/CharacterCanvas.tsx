import { ComponentPropsWithoutRef, useEffect } from 'react';

import useCanvas from '@hooks/useCanvas';

import cn from '@utils/cn';
import getImagePath from '@utils/get-image-path';

export type CharacterCanvasProps = ComponentPropsWithoutRef<'canvas'> & {
  type?: 'mad' | 'sad';
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
  const canvasRef = useCanvas(480, 720); // X2

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
    const { width, height } = ctx.canvas;

    const images = await Promise.all(sources.map((src) => loadImage(src)));
    ctx.clearRect(0, 0, width, height);

    if (fillStyle) fillBackground(ctx, fillStyle);

    images.forEach((image) => {
      const scale = Math.min(width / image.width, height / image.height);

      const dw = image.width * scale;
      const dh = image.height * scale;

      console.log('dw :: ', dw);
      console.log('dh :: ', dh);

      ctx.drawImage(image, (width - dw) / 2, (height - dh) / 2, dw, dh);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const imageSources = [];

    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';

      if (type && status)
        imageSources.push(getImagePath('monsters', `${type}_${status}`));

      if (items && items.length)
        imageSources.push(...items.map((item) => getImagePath('items', item)));

      if (imageSources.length) drawImages(ctx, imageSources, background);
    }
  }, [canvasRef, type, status, items, background]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'absolute bottom-0 left-0 right-0 top-0 h-full w-full',
        className,
      )}
      {...rest}
    />
  );
}
