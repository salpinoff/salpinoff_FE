import Link from 'next/link';

import { ExtractProps } from '@type/util';

import HeaderLogo from './HeaderLogo';

type HeaderLinkLogoProps = ExtractProps<typeof HeaderLogo> &
  ExtractProps<typeof Link>;

export default function HeaderLinkLogo({
  size,
  href,
  ...rest
}: HeaderLinkLogoProps) {
  return (
    <Link href={href} passHref {...rest}>
      <HeaderLogo size={size} />
    </Link>
  );
}
