import {
  Children,
  ComponentProps,
  MouseEventHandler,
  cloneElement,
  isValidElement,
  useRef,
} from 'react';

import cn from '@utils/cn';

import Tab from './Tab';

type TabsProps<T> = Omit<ComponentProps<'div'>, 'onChange'> & {
  value: T;
  onChange?: (event: React.SyntheticEvent, value: T) => void;
};

export default function Tabs<T extends string>({
  className,
  children,
  value,
  onChange,
}: TabsProps<T>) {
  const tabsRef = useRef<{ [key in string]?: HTMLElement | null }>({});

  const handleClick: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;

    if (target.role === 'tab') {
      const tabValue = Object.entries(tabsRef.current).find(
        ([, el]) => el === target,
      )?.[0] as T;

      onChange?.(e, tabValue);
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
          const { value: tabValue, ...restProps } = child.props;

          return cloneElement(
            { ...child, props: restProps },
            {
              role: 'tab',
              'aria-selected': value === tabValue,
              tabIndex: value === tabValue ? 0 : -1,
              ref: (el: HTMLElement) => {
                tabsRef.current[tabValue] = el;
              },
            },
          );
        }
        return null;
      })}
    </div>
  );
}

Tabs.Tab = Tab;
