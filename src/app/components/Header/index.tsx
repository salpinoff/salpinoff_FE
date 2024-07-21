import { ComponentProps } from 'react';

import cn from '@utils/cn';

import HeaderIconButton from './HeaderIconButton';
import HeaderLinkLogo from './HeaderLinkLogo';
import HeaderLogo from './HeaderLogo';
import HeaderTitle from './HeaderTitle';

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

Header.Title = HeaderTitle;
Header.Logo = HeaderLogo;
Header.LinkLogo = HeaderLinkLogo;
Header.IconButton = HeaderIconButton;
