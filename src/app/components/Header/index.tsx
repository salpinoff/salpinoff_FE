import { ComponentProps } from 'react';

import withProps from '@components/common/HOC/withProps';
import IconButton, { IconButtonProps } from '@components/common/IconButton';
import BaseText, { BaseTextProps } from '@components/common/Text/BaseText';
import Logo from '@components/Logo';

import cn from '@utils/cn';

import { ExtractRef } from '@type/util';

type HeaderProps = ComponentProps<'header'>;

export default function Header({ className, children, ...rest }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex min-h-[48px] w-full items-center justify-between px-20 py-[12px]',
        className,
      )}
      {...rest}
    >
      {children}
    </header>
  );
}

Header.Logo = Logo;

Header.Title = withProps<HTMLHeadingElement, BaseTextProps<'h3'>>(BaseText, {
  component: 'h3',
  variant: 'heading-1',
  weight: 'semibold',
  color: 'normal',
});

Header.IconButton = withProps<ExtractRef<typeof IconButton>, IconButtonProps>(
  IconButton,
  {
    size: 24,
  },
);
