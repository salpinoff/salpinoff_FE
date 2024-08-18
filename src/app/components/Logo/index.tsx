import { ComponentPropsWithoutRef } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import LogoSVG from '@public/icons/logo.svg';

import cn from '@utils/cn';

const logoVariants = cva('m-auto', {
  variants: {
    size: {
      24: 'w-[60px] h-[18px]',
      32: 'w-[80px] h-[25px]',
    },
  },
});

interface HeaderLogoProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof logoVariants> {}

export default function Logo({ className, size, ...rest }: HeaderLogoProps) {
  return (
    <div className={cn(logoVariants({ size }), className)} {...rest}>
      <LogoSVG />
    </div>
  );
}
