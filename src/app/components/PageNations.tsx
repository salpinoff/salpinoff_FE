import { ComponentProps } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { motion } from 'framer-motion';

import cn from '@utils/cn';

const pageNationStyle = cva('flex h-6 space-x-4', {
  variants: {
    position: {
      left: 'justify-start',
      right: 'justify-end',
    },
  },
});

type StyleProps = VariantProps<typeof pageNationStyle>;
type OrderItem = {
  id: string;
};

interface Props extends StyleProps, ComponentProps<'ol'> {
  dir?: 'forward' | 'backward';
  activeId: string;
  orderItems: OrderItem[];
}

function PageNations({
  activeId,
  orderItems,
  className,
  position = 'right',
  dir = 'forward',
}: Props) {
  return (
    <ol className={cn(pageNationStyle({ position }), className)}>
      {orderItems.map(({ id }) => {
        const isSelected = id === activeId;
        const originX = dir === 'forward' ? 1 : 0;
        const width = isSelected ? '24px' : '6px';

        return (
          <li key={id} role="none" className="flex">
            <span id={id} className="a11yHidden">
              {id}
            </span>
            <motion.button
              layout
              disabled
              type="button"
              initial={{ originX, width }}
              animate={{ originX, width }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                delay: isSelected ? 0.02 : 0,
              }}
              aria-labelledby={id}
              aria-current="page"
              className={cn(
                'h-6 rounded-circular',
                { 'bg-[#70737C47]': !isSelected },
                { 'bg-[var(--color-brand-primary-base)]': isSelected },
              )}
            />
          </li>
        );
      })}
    </ol>
  );
}

export default PageNations;
