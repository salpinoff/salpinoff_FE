'use client';

import type { ComponentProps, ReactNode } from 'react';
import { Children, isValidElement, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

export type FlipCardProps = ComponentProps<'div'> & {
  children: [ReactNode, ReactNode, ...(readonly ReactNode[])];
  flipped?: boolean;
  onFlipped?: (arg?: unknown) => void;
};

export default function FlipCard({
  children,
  className,
  flipped = false,
  onFlipped,
  ...rest
}: FlipCardProps) {
  const validChildren = Children.toArray(children).filter(isValidElement);

  if (validChildren.length < 2) {
    throw new Error(
      `FlipCard requires at least 2 children, but only ${validChildren.length} were provided.`,
    );
  }

  useEffect(() => {
    if (flipped) onFlipped?.();
  }, [flipped, onFlipped]);

  return (
    <AnimatePresence>
      <div
        className={className}
        style={{
          perspective: '1000px',
        }}
        {...rest}
      >
        <motion.div
          className="h-full w-full"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.85 }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Flip Card Front */}
          <div
            className="absolute h-full w-full overflow-visible"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            {validChildren[0]}
          </div>
          {/* Flip Card Back */}
          <div
            className="absolute h-full w-full overflow-visible"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            {validChildren[1]}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
