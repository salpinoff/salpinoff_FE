import { ComponentPropsWithoutRef, ReactNode } from 'react';

import cn from '@utils/cn';

interface Props extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
  bound?: number;
}

function FixedBottom({ children, className, bound, ...rest }: Props) {
  return (
    <div style={{ paddingBottom: `${bound || 0}px` }}>
      <div className={cn('fixed bottom-0 left-0 w-full', className)} {...rest}>
        {children}
      </div>
    </div>
  );
}

export default FixedBottom;
