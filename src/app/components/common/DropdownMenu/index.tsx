import { PropsWithChildren, useCallback, useId, useRef, useState } from 'react';

import DropdownMenuContent from './DropdownMenuContent';
import DropdownMenuItem from './DropdownMenuItem';
import { DropdownMenuProvider } from './DropdownMenuProvider';
import DropdownMenuTrigger from './DropdownMenuTrigger';

function DropdownMenu({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownMenuProvider
      triggerId={useId()}
      triggerRef={triggerRef}
      contentId={useId()}
      open={open}
      onOpenChange={setOpen}
      onOpenToggle={useCallback(
        () => setOpen((prevOpen) => !prevOpen),
        [setOpen],
      )}
    >
      {children}
    </DropdownMenuProvider>
  );
}

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Content = DropdownMenuContent;

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
