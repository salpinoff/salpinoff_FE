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

interface Props extends StyleProps {
  dir?: 'forward' | 'backward';
  className?: string;
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

        return (
          <li key={id} className="flex">
            <span id={id} className="a11yHidden">
              {id}
            </span>
            <motion.button
              layout
              disabled
              type="button"
              initial={{ width: '6px', originX }}
              animate={{ originX, width: isSelected ? '24px' : '6px' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              aria-labelledby={id}
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
