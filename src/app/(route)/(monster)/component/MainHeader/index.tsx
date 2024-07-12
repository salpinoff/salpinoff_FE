'use client';

import Header from '@components/Header';

import useDrawer from '@hooks/useDrawer';

import Menu from '../MenuDrawer';

export default function MainHeader() {
  const { openDrawer } = useDrawer(() => <Menu />);

  return (
    <Header className="grid grid-cols-6 gap-4">
      <Header.LinkLogo size={24} href="/" className="col-span-4 col-start-2" />
      <Header.IconButton
        className="col-span-1 ml-auto"
        name="hamburger"
        onClick={() => openDrawer()}
      />
    </Header>
  );
}
