'use client';

import { useRouter } from 'next/navigation';

import Header from '@components/Header';

import MonsterList from './components/MonsterList';

export default function CollectionPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="h-dvh">
      <Header className="grid grid-cols-6 gap-4">
        <Header.IconButton
          name="arrow-back"
          aria-label="뒤로가기"
          className="col-span-1 col-start-1"
          onClick={handleBack}
        />
        <Header.Title className="col-span-4 col-start-2 mx-auto">
          완료된 퇴사몬
        </Header.Title>
      </Header>
      <div className="flex h-[calc(100vh-48px)] w-screen px-32">
        <MonsterList />
      </div>
    </section>
  );
}
