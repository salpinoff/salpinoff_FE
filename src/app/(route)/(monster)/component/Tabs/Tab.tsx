import { ComponentPropsWithoutRef } from 'react';

type TabProps = ComponentPropsWithoutRef<'button'> & {
  value: string;
  label?: React.ReactNode;
};

export default function Tab({ label, value, ...rest }: TabProps) {
  return (
    <button
      id={value}
      type="button"
      className="label-1-semibold relative w-max rounded-full bg-[#70737C38] px-16 py-8 text-cool-neutral-90A has-[:disabled]:!text-cool-neutral-70A aria-selected:!bg-common-100 aria-selected:!text-cool-neutral-10"
      {...rest}
    >
      {label}
    </button>
  );
}

Tab.displayName = 'Tab';
