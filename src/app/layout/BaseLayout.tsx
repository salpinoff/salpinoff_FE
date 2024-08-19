import Image from 'next/image';

import { PropsWithChildren } from 'react';

import Text from '@components/common/Text';
import Logo from '@components/Logo';

type BaseLayoutProps = PropsWithChildren;

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="m-auto flex max-w-[1076px]">
      <div className="hidden grow select-none flex-col lg:flex">
        <div className="flex grow flex-col justify-center">
          <Image
            className="mb-[48px] rounded-20"
            src="/images/app_icon.png"
            alt="앱 아이콘"
            width={96}
            height={96}
          />
          <Text
            className="mb-[24px] text-[32px] leading-none"
            component="h3"
            variant="title-1"
            weight="semibold"
            color="strong"
          >
            회사 스트레스 털어놓는 나만의 캐릭터
          </Text>
          <Logo className="m-0 w-[400px]" />
        </div>
        <div className="mb-40">
          <div className="mb-20 flex gap-12">
            <div className="h-32 w-32 cursor-pointer rounded-8 bg-white" />
            <div className="h-32 w-32 cursor-pointer rounded-8 bg-white" />
          </div>
          <Text component="span" variant="body-1" color="strong">
            Copyright 2024. Salpinoff. All rights reserved.
          </Text>
        </div>
      </div>
      <div
        role="main"
        id="root-container"
        className="relative mx-auto mx-auto h-dvh w-full max-w-md grow touch-auto overflow-hidden"
      >
        {children}
      </div>
    </main>
  );
}
