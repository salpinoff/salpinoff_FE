import Link from 'next/link';

import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
} from 'react';

import ArrowSVG from '@public/icons/arrow-back.svg';

import Spinner from '@components/Spinner';

import cn from '@utils/cn';

type SectionProps = ComponentProps<'section'>;
type SectionCommonItemProps<T extends ElementType> =
  ComponentPropsWithoutRef<T> & { loading?: boolean };
type SectionItemProps =
  | (SectionCommonItemProps<'a'> & { component: 'a' })
  | (SectionCommonItemProps<'button'> & { component: 'button' });

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
  loading = false,
  ...restProps
}: SectionItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = component === 'a' ? Link : 'button';

  return (
    <Component
      className={cn(
        'bg-[#70737C1F]',
        'w-full px-24 py-20',
        'flex items-center justify-between',
        { 'pointer-events-none': loading },
        className,
      )}
      {...restProps}
    >
      {children}

      {loading && <Spinner />}
      {!loading && (
        <ArrowSVG className="rotate-180 scale-[60%]" color="#C2C4C8E0" />
      )}
    </Component>
  );
}

Section.Item = SecionItem;

export default Section;
