import Link from 'next/link';

import type { ComponentProps, ComponentPropsWithoutRef } from 'react';

import ArrowSVG from '@public/icons/arrow-back.svg';

import cn from '@utils/cn';

type SectionProps = ComponentProps<'section'>;
type SectionItemProps =
  | (ComponentPropsWithoutRef<'a'> & { component: 'a' })
  | (ComponentPropsWithoutRef<'button'> & { component: 'button' });

function Section({ children, className, ...restProps }: SectionProps) {
  return (
    <section
      className={cn('-mx-20 flex flex-col text-white', className)}
      {...restProps}
    >
      {children}
    </section>
  );
}

function SecionItem({
  children,
  component,
  className,
  ...restProps
}: SectionItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = component === 'a' ? Link : 'button';

  return (
    <Component
      className={cn(
        'bg-[#70737C1F]',
        'w-full px-24 py-20',
        'flex items-center justify-between ',
        className,
      )}
      {...restProps}
    >
      {children}

      <ArrowSVG className="rotate-180 scale-[60%]" color="#C2C4C8E0" />
    </Component>
  );
}

Section.Item = SecionItem;

export default Section;
