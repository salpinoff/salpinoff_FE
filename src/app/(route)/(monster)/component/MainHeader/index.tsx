'use client';

import Link from 'next/link';

import { useState } from 'react';

import Header from '@components/Header';

import Setting from './Setting';

export default function MainHeader() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <>
      <Header className="grid grid-cols-6 gap-4">
        <Link className="col-span-4 col-start-2" href="/" passHref>
          <Header.Logo size={24} />
        </Link>
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
