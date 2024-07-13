'use client';

import { useRouter } from 'next/navigation';

import Header from '@components/Header';

import cn from '@utils/cn';

type Props = {
  className?: string;
};

function EditHeader({ className }: Props) {
  const { back } = useRouter();

  return (
    <Header className={cn('grid grid-cols-6 gap-4 px-0', className)}>
      <Header.IconButton name="arrow-back" onClick={back} />
      <Header.Title className="col-span-4 col-start-2 text-center">
        프로필 수정
      </Header.Title>
    </Header>
  );
}

export default EditHeader;
