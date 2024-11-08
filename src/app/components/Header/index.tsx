import { ComponentProps } from 'react';

import withProps from '@components/common/HOC/withProps';
import IconButton, { IconButtonProps } from '@components/common/IconButton';
import Text, { TextProps } from '@components/common/Text';
import Logo from '@components/Logo';

import cn from '@utils/cn';

import { ExtractRef } from '@type/util';

type HeaderProps = ComponentProps<'header'>;

export default function Header({ className, children, ...rest }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex max-h-[49px] min-h-[49px] w-full select-none items-center justify-between px-20 py-12',
        className,
      )}
      {...rest}
    >
      {children}
    </header>
  );
}

Header.Logo = Logo;

Header.Title = withProps<HTMLHeadingElement, TextProps<'h3'>>(Text, {
  component: 'h3',
  variant: 'headline-1',
  weight: 'semibold',
  color: 'normal',
});

Header.IconButton = withProps<ExtractRef<typeof IconButton>, IconButtonProps>(
  IconButton,
  {
    size: 18,
  },
);
