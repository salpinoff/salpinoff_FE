import Link from 'next/link';

import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
} from 'react';

import Icon from '@components/common/Icon';

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
      {loading ? (
        <Icon name="spin" size={16} stroke="subtle" />
      ) : (
        <Icon
          name="arrow-back"
          size={12}
          stroke="subtle"
          className="rotate-180"
        />
      )}
    </Component>
  );
}

Section.Item = SecionItem;

export default Section;
