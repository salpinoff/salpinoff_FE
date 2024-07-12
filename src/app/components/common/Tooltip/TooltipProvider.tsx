import { PropsWithChildren, createContext } from 'react';

import cn from '@utils/cn';

export type Context = {
  label: string;
  content: string;
  toggleOpen: () => void;
};

type Props = PropsWithChildren<{ value: Context; className?: string }>;

const tooltipContext = createContext<Context>({
  label: '',
  content: '',
  toggleOpen: () => {},
});

function TooltipPropvider({ children, value, className }: Props) {
  return (
    <tooltipContext.Provider value={value}>
      <div className={cn('relative w-fit', className)}>{children}</div>
    </tooltipContext.Provider>
  );
}

export { TooltipPropvider, tooltipContext };
