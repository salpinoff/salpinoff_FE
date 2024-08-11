import { VariantProps, cva } from 'class-variance-authority';

import LogoSVG from '@public/icons/logo.svg';

const logoVariants = cva('m-auto', {
  variants: {
    size: {
      24: 'w-[60px] h-[24px]',
      32: 'w-[80px] h-[32px]',
    },
  },
});

type HeaderLogoProps = VariantProps<typeof logoVariants>;

export default function Logo({ size }: HeaderLogoProps) {
  return (
    <div className={logoVariants({ size })}>
      <LogoSVG />
    </div>
  );
}
