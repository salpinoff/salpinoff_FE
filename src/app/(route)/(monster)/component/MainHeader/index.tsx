'use client';

import { useState } from 'react';

import Header from '@components/Header';

import Setting from './Setting';

export default function MainHeader() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <>
      <Header className="grid grid-cols-6 gap-4">
        <Header.LinkLogo
          size={24}
          href="/"
          className="col-span-4 col-start-2"
        />
        <Header.IconButton
          className="col-span-1 ml-auto"
          name="hamburger"
          onClick={toggleDrawer(true)}
        />
      </Header>
      <Setting open={open} close={toggleDrawer(false)} />
    </>
  );
}
