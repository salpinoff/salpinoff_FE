'use client';

import Header from '@components/Header';

import useModal from '@hooks/useModal';

import Setting from './Setting';

export default function MainHeader() {
  const { openModal, closeModal } = useModal(() => (
    <Setting close={closeModal} />
  ));

  return (
    <Header className="grid grid-cols-6 gap-4">
      <Header.LinkLogo size={24} href="/" className="col-span-4 col-start-2" />
      <Header.IconButton
        className="col-span-1 ml-auto"
        name="hamburger"
        onClick={() => openModal()}
      />
    </Header>
  );
}
