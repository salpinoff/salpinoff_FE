'use client';

import { useReducer } from 'react';

import ArrowBackSVG from '@public/icons/arrow-back.svg';

import BaseText from '@components/common/Text/BaseText';

import useDrawer from '@hooks/useDrawer';

import signOut from 'src/app/(route)/(auth)/signin/utils/signout';

import Section from './Section';

type LoadginType = 'signout';
type LoadingState = Record<LoadginType, boolean>;
type LoadingReducer = (
  state: LoadingState,
  payload: LoadingState,
) => LoadingState;

function Menu() {
  const { closeDrawer } = useDrawer();

  const [{ signout }, updater] = useReducer<LoadingReducer>(
    (state, payload) => {
      return { ...state, ...payload };
    },
    {
      signout: false,
    },
  );

  const handleSignout = () => {
    updater({ signout: true });
    signOut({ callbackUrl: '/signin' }).finally(() => {
      updater({ signout: false });
    });
  };

  return (
    <aside className="full-height full-height-ios bg-black px-20">
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
        <Section.Item
          type="button"
          component="button"
          loading={signout}
          onClick={handleSignout}
        >
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
