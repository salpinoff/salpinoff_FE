import { forwardRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import ArrowBackSVG from '@public/icons/arrow-back.svg';
import CloseSVG from '@public/icons/close.svg';
import DownloadSVG from '@public/icons/download.svg';
import EditSVG from '@public/icons/edit.svg';
import EllipsisSVG from '@public/icons/ellipsis.svg';
import HamburgerSVG from '@public/icons/hamburger.svg';
import InfoSVG from '@public/icons/info.svg';
import MessageSVG from '@public/icons/message.svg';
import RefreshSVG from '@public/icons/refresh.svg';
import ShareSVG from '@public/icons/share.svg';
import SpinSVG from '@public/icons/spin.svg';

import cn from '@utils/cn';

export const IconMap = {
  'arrow-back': ArrowBackSVG,
  download: DownloadSVG,
  edit: EditSVG,
  ellipsis: EllipsisSVG,
  hamburger: HamburgerSVG,
  information: InfoSVG,
  refresh: RefreshSVG,
  share: ShareSVG,
  spin: SpinSVG,
  message: MessageSVG,
  close: CloseSVG,
} as const;

export const iconStyles = cva(
  ['inline-flex', 'items-center', 'justify-center'],
  {
    variants: {
      size: {
        12: ['w-12', 'h-12', '[&>svg]:w-12'],
        16: ['w-16', 'h-16', '[&>svg]:w-16'],
        20: ['w-20', 'h-20', '[&>svg]:w-20'],
        24: ['w-24', 'h-24', '[&>svg]:w-24'],
        28: ['w-[28px]', 'h-[28px]', '[&>svg]:w-[28px]'],
        32: ['w-32', 'h-32', '[&>svg]:w-32'],
        40: ['w-40', 'h-40', '[&>svg]:w-40'],
        44: ['w-44', 'h-44', '[&>svg]:w-44'],
        48: ['w-48', 'h-48', '[&>svg]:w-48'],
        64: ['w-64', 'h-64', '[&>svg]:w-64'],
      },
      stroke: {
        inherit: 'text-inherit',
        inverse: 'text-[--color-icon-inverse]',
        disabled: 'text-[--color-icon-disabled]',
        primary: 'text-[--color-icon-brand]',
        subtle: 'text-[--color-icon-subtle]',
        success: 'text-[--color-icon-success]',
        info: 'text-[--color-icon-info]',
        warning: 'text-[--color-icon-warning]',
        danger: 'text-[--color-icon-danger]',
        pink: 'text-[--color-icon-accent-pink]',
        violet: 'text-[--color-icon-accent-pink]',
        blue: 'text-[--color-icon-accent-pink]',
        'light-blue': 'text-[--color-icon-accent-light-blue]',
        cyan: 'text-[--color-icon-accent-cyan]',
        green: 'text-[--color-icon-accent-green]',
        lime: 'text-[--color-icon-accent-lime]',
        orange: 'text-[--color-icon-accent-orange]',
        'red-orange': 'text-[--color-icon-accent-red-orange]',
        red: 'text-[--color-icon-accent-red]',
      },
    },
    defaultVariants: {
      size: 20,
      stroke: 'inherit',
    },
  },
);

export type IconProps<T extends React.ElementType = 'span'> =
  React.ComponentPropsWithoutRef<T> &
    VariantProps<typeof iconStyles> & {
      component?: T;
      children?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
      name?: keyof typeof IconMap;
    };

const Icon = forwardRef(
  <T extends React.ElementType = 'span'>(
    { component, className, children, size, stroke, name }: IconProps<T>,
    ref: React.Ref<Element>,
  ) => {
    const Component: React.ElementType = component || 'span';

    return (
      <Component
        ref={ref}
        className={cn(iconStyles({ size, stroke }), className)}
      >
        {name && IconMap[name]()}
        {!name && children}
      </Component>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
