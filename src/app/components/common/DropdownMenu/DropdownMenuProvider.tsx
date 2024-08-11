import { createContext, PropsWithChildren } from 'react';

export type DropdownMenuContextValue = {
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
};

type DropdownMenuProviderProps = PropsWithChildren<DropdownMenuContextValue>;

export const DropdownMenuContext =
  createContext<DropdownMenuContextValue | null>(null);

export function DropdownMenuProvider({
  children,
  ...value
}: DropdownMenuProviderProps) {
  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
}
