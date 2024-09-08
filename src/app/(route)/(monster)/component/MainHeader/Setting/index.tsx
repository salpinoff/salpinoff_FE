'use client';

import { MouseEventHandler, ReactElement, useState } from 'react';

import Drawer from '@components/common/Drawer';
import Menu from '@components/common/Menu';
import Header from '@components/Header';
import ScreenView from '@components/logging/ScreenView';
import SignoutConfirmModal from '@components/modals/SignoutConfirmModal';

import useModal from '@hooks/useModal';

import useSignout from 'src/app/(route)/(auth)/signin/hooks/useSignout';
import EditContent from 'src/app/(route)/profile/edit/components/EditForm';

import AboutUs from './drawer-contents/AboutUs';
import MonsterList from './drawer-contents/MonsterList';

type SettingProps = {
  open?: boolean;
  close: () => void;
};

export default function Setting({ open = false, close }: SettingProps) {
  const { mutate: signOut, isPending } = useSignout({ callbackUrl: '/signin' });

  const [subOpen, setSubOpen] = useState(false);
  const [subContent, setSubContent] = useState<ReactElement>();
  const [subContentLabel, setsubContentLabel] = useState('');

  const { openModal, closeModal } = useModal(() => null);

  const openByDrawer = (target: Element, content: ReactElement) => {
    const label = target.getAttribute('data-label');

    setSubOpen(true);
    setSubContent(content);
    setsubContentLabel(label!);
  };

  const handleViewCollection: MouseEventHandler = (e) =>
    openByDrawer(e.currentTarget, <MonsterList />);

  const handleEditProfile: MouseEventHandler = (e) =>
    openByDrawer(e.currentTarget, <EditContent />);

  const handleSignout = () => {
    openModal(() => (
      <SignoutConfirmModal
        onCancel={closeModal}
        onSignout={() => {
          closeModal();
          signOut();
        }}
      />
    ));
  };

  const handleAboutUs: MouseEventHandler = (e) => {
    openByDrawer(e.currentTarget, <AboutUs />);
  };

  return (
    <ScreenView name="hamburger" disabled={!open}>
      <Drawer open={open} className="">
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
        {/* Menu Group */}
        <div className="p-20">
          <Menu>
            <Menu.Item
              id="btn_archive"
              type="button"
              component="button"
              onClick={handleViewCollection}
              aria-label="퇴사몬 보관함"
              data-label="퇴사몬 보관함"
            >
              퇴사몬 보관함
            </Menu.Item>
          </Menu>

          <Menu className="my-16">
            <Menu.Item
              id="btn_profile"
              type="button"
              component="button"
              onClick={handleEditProfile}
              aria-label="프로필 수정"
              data-label="프로필 수정"
            >
              프로필 수정
            </Menu.Item>
            <Menu.Item
              id="btn_logout"
              type="button"
              component="button"
              loading={isPending}
              onClick={handleSignout}
              aria-label="로그아웃"
              data-label="로그아웃"
            >
              로그아웃
            </Menu.Item>
          </Menu>

          <Menu>
            <Menu.Item
              component="a"
              href="https://forms.gle/FvEn1puxba5YgHE16"
              rel="noopener noreferrer"
              target="_blank"
            >
              문의/요청
            </Menu.Item>
            <Menu.Item
              id="btn_teaminfo"
              type="button"
              component="button"
              aria-label="제작정보"
              data-label="제작정보"
              onClick={handleAboutUs}
            >
              제작정보
            </Menu.Item>
          </Menu>
        </div>

        {/* SubDrawer */}
        <Drawer
          open={subOpen}
          className="flex h-full flex-col overflow-y-auto scrollbar-hide"
        >
          <Header className="sticky top-0 z-10 grid grid-cols-6 gap-4 backdrop-blur-xl">
            <Header.IconButton
              name="arrow-back"
              aria-label="뒤로가기"
              className="col-span-1 col-start-1"
              onClick={() => setSubOpen(false)}
            />
            <Header.Title className="col-span-4 col-start-2 mx-auto">
              {subContentLabel}
            </Header.Title>
          </Header>
          <div className="p-20">{subContent}</div>
        </Drawer>
      </Drawer>
    </ScreenView>
  );
}
