import React, { ComponentPropsWithRef, forwardRef } from 'react';

type TabProps = ComponentPropsWithRef<'button'> & {
  value: string;
  label?: React.ReactNode;
};

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ label, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="label-1-semibold relative w-max rounded-full bg-[#70737C38] px-16 py-8 text-cool-neutral-90A has-[:disabled]:!text-cool-neutral-70A aria-selected:!bg-common-100 aria-selected:!text-cool-neutral-10"
        {...rest}
      >
        {label}
      </button>
    );
  },
);

Tab.displayName = 'Tab';

export default Tab;
