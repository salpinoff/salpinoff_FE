'use client';

import ArrowBackSVG from '@public/icons/arrow-back.svg';

import BaseText from '@components/common/Text/BaseText';

import useDrawer from '@hooks/useDrawer';

import Section from './Section';

function Menu() {
  const { closeDrawer } = useDrawer();

  return (
    <aside className="h-dvh bg-black px-20">
      <header className="flex w-full items-center justify-center py-3 text-white">
        <button className="h-24 w-24" onClick={closeDrawer}>
          <span className="a11yHidden">뒤로가기</span>
          <ArrowBackSVG color="white" />
        </button>

        <BaseText
          component="h2"
          variant="heading-1"
          weight="semibold"
          className="mr-24 flex-1 text-center"
        >
          설정
        </BaseText>
      </header>

      <Section>
        <Section.Item component="a" href="/">
          퇴사몬 보관함
        </Section.Item>
      </Section>

      <Section className="my-16">
        <Section.Item component="a" href="/">
          프로필 수정
        </Section.Item>
        <Section.Item component="button" type="button">
          로그아웃
        </Section.Item>
      </Section>

      <Section>
        <Section.Item component="a" href="/">
          제작정보
        </Section.Item>
      </Section>
    </aside>
  );
}

export default Menu;
