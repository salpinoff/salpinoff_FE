import {
  Children,
  ComponentProps,
  MouseEventHandler,
  cloneElement,
  isValidElement,
} from 'react';

import cn from '@utils/cn';

import Tab from './Tab';

type TabsProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  value: string;
  onChange?: (event: React.SyntheticEvent, value: string) => void;
};

export default function Tabs({
  className,
  children,
  value,
  onChange,
}: TabsProps) {
  const handleClick: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;

    if (target.role === 'tab') {
      onChange?.(e, target.id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="tablist"
      tabIndex={-1}
      className={cn('overflow-x-auto scrollbar-hide', className)}
      onClick={handleClick}
      onKeyDown={() => {}}
    >
      {Children.toArray(children).map((child) => {
        if (isValidElement(child) && child.type === Tab) {
          const selected = value === child.props.value;

          return cloneElement(child, {
            ...child.props,
            role: 'tab',
            'aria-selected': selected,
            tabIndex: selected ? 0 : -1,
          });
        }
        return child;
      })}
    </div>
  );
}

Tabs.Tab = Tab;
