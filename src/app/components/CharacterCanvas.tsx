import { ComponentPropsWithoutRef, useEffect } from 'react';

import useCanvas from '@hooks/useCanvas';

import cn from '@utils/cn';
import getImagePath from '@utils/get-image-path';

export type CharacterCanvasProps = ComponentPropsWithoutRef<'canvas'> & {
  width?: number;
  height?: number;
  type?: 'mad' | 'sad';
  status?: 'before' | 'after';
  background?: string;
  items?: string[];
};

export default function CharacterCanvas({
  width = 280,
  height = 280,
  className,
  type,
  status = 'before',
  background,
  items = [],
  ...rest
}: CharacterCanvasProps) {
  const canvasRef = useCanvas(width, height);

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
    const { width: canvasWidth, height: canvasHeight } = ctx.canvas;

    try {
      const images = await Promise.all(sources.map((src) => loadImage(src)));
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (fillStyle) fillBackground(ctx, fillStyle);

      images.forEach((image) => {
        const scale = Math.min(
          canvasWidth / image.width,
          canvasHeight / image.height,
        );
        const dw = image.width * scale;
        const dh = image.height * scale;

        ctx.drawImage(
          image,
          (canvasWidth - dw) / 2,
          (canvasHeight - dh) / 2,
          dw,
          dh,
        );
      });
    } catch (error) {
      console.error('Error loading images:', error);
    }
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
