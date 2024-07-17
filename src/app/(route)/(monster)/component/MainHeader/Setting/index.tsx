'use client';

import { MouseEventHandler, ReactElement, useReducer } from 'react';

import Drawer from '@components/common/navigation/Drawer';
import Menu from '@components/common/navigation/Menu';
import Header from '@components/Header';

import useModal from '@hooks/useModal';

import signOut from 'src/app/(route)/(auth)/signin/utils/signout';
import EditContent from 'src/app/(route)/profile/edit/components/EditForm';

import MonsterList from './drawer-contents/MonsterList';

type LoadingType = 'signout';
type LoadingState = Record<LoadingType, boolean>;
type LoadingReducer = (
  state: LoadingState,
  payload: LoadingState,
) => LoadingState;

type SettingProps = {
  close: () => void;
};

export default function Setting({ close }: SettingProps) {
  const [{ signout }, updater] = useReducer<LoadingReducer>(
    (state, payload) => {
      return { ...state, ...payload };
    },
    {
      signout: false,
    },
  );

  const { openModal, closeModal } = useModal(() => null);

  const openByDrawer = (target: Element, content: ReactElement) => {
    const ariaLabel = target.getAttribute('aria-label');

    return openModal(() => (
      <Drawer open>
        <Header className="grid grid-cols-6 gap-4">
          <Header.IconButton
            name="arrow-back"
            aria-label="뒤로가기"
            className="col-span-1 col-start-1"
            onClick={closeModal}
          />
          <Header.Title className="col-span-4 col-start-2 mx-auto">
            {ariaLabel}
          </Header.Title>
        </Header>
        {content}
      </Drawer>
    ));
  };

  const handleViewCollection: MouseEventHandler = (e) =>
    openByDrawer(e.currentTarget, <MonsterList />);

  const handleEditProfile: MouseEventHandler = (e) =>
    openByDrawer(e.currentTarget, <EditContent />);

  const handleSignout = () => {
    updater({ signout: true });
    signOut({ callbackUrl: '/signin' }).finally(() => {
      updater({ signout: false });
    });
  };

  return (
    <Drawer open>
      <Header className="grid grid-cols-6 gap-4">
        <Header.IconButton
          name="arrow-back"
          aria-label="뒤로가기"
          className="col-span-1 col-start-1"
          onClick={close}
        />
        <Header.Title className="col-span-4 col-start-2 mx-auto">
          설정
        </Header.Title>
      </Header>
      <Menu>
        <Menu.Item
          type="button"
          component="button"
          onClick={handleViewCollection}
          aria-label="퇴사몬 보관함"
        >
          퇴사몬 보관함
        </Menu.Item>
      </Menu>

      <Menu className="my-16">
        <Menu.Item
          type="button"
          component="button"
          onClick={handleEditProfile}
          aria-label="프로필 수정"
        >
          프로필 수정
        </Menu.Item>
        <Menu.Item
          type="button"
          component="button"
          loading={signout}
          onClick={handleSignout}
          aria-label="로그아웃"
        >
          로그아웃
        </Menu.Item>
      </Menu>

      <Menu>
        <Menu.Item component="a" href="/">
          제작정보
        </Menu.Item>
      </Menu>
    </Drawer>
  );
}
