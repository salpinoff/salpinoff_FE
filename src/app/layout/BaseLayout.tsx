import Image from 'next/image';

import { PropsWithChildren } from 'react';

import Text from '@components/common/Text';

import cn from '@utils/cn';

import GradientLogoSVG from 'public/icons/gradient-logo.svg';

type BaseLayoutProps = PropsWithChildren;

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="flex">
      <div className="hidden w-[600px] select-none flex-col bg-gradient-to-b from-[#E6057B] to-[#F450A6] px-[140px] lg:flex">
        <div className="flex grow flex-col items-center justify-center">
          <Image
            className="mb-[32px] rounded-[21px]"
            src="/images/app_icon.png"
            alt="앱 아이콘"
            width={80}
            height={80}
          />
          <Text
            className="mb-20 leading-none"
            component="h3"
            variant="heading-1"
            weight="semibold"
            color="strong"
          >
            회사 스트레스 털어놓는 나만의 캐릭터
          </Text>
          <GradientLogoSVG className="w-[320px]" />
        </div>
        <div className="mb-40">
          <Text component="span" variant="label-1" className="text-[#F7F7F8B2]">
            Copyright 2024. Salpinoff. All rights reserved.
          </Text>
        </div>
      </div>
      <div className="relative flex h-dvh w-full grow touch-auto items-center justify-center overflow-hidden">
        <div
          role="main"
          id="root-container"
          className={cn(
            'relative m-auto box-content h-full w-full',
            'lg:!h-[970px] lg:!w-[448px] lg:overflow-hidden lg:rounded-32 lg:border-[10px] lg:border-cool-neutral-17',
          )}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
