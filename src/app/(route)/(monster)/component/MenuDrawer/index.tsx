'use client';

import { useReducer } from 'react';

import Header from '@components/Header';

import useDrawer from '@hooks/useDrawer';

import { isIOS } from '@utils/client/agent';
import cn from '@utils/cn';

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
    <aside
      className={cn('bg-black px-20', {
        'full-height': !isIOS,
        'full-height-ios': isIOS,
      })}
    >
      <Header className="grid grid-cols-6 gap-4">
        <Header.IconButton
          name="arrow-back"
          aria-label="뒤로가기"
          className="col-span-1 col-start-1"
          onClick={closeDrawer}
        />
        <Header.Title className="col-span-4 col-start-2 mx-auto">
          설정
        </Header.Title>
      </Header>
      <Section>
        <Section.Item
          component="a"
          onClick={closeDrawer}
          href="/monster/collection"
        >
          퇴사몬 보관함
        </Section.Item>
      </Section>

      <Section className="my-16">
        <Section.Item component="a" onClick={closeDrawer} href="/profile/edit">
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
