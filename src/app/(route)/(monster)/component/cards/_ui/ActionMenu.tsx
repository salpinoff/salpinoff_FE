'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { offset, useFloating } from '@floating-ui/react-dom';

import DownloadSVG from '@public/icons/download.svg';
import EditSVG from '@public/icons/edit.svg';
import EllipsisSVG from '@public/icons/ellipsis.svg';
import ShareSVG from '@public/icons/share.svg';

import Button from '@components/common/Button';
import { Menu, MenuItem } from '@components/Menu';
import ShareModal from '@components/modals/ShareModal';
import Separator from '@components/Separator';

import useModal from '@hooks/useModal';
import useOutsideClick from '@hooks/useOutsideClick';

import generateShareUrl from '@utils/client/generate-share-url';

type ActionMenuProps = {
  targetId: string;
};
export default function ActionMenu({ targetId }: ActionMenuProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const SHARE_URL = generateShareUrl(targetId) ?? '';
  const MODIFY_URL = `/monster/${targetId}/modify/story`;

  const { openModal, closeModal } = useModal(() => (
    <ShareModal
      url={SHARE_URL}
      onShareByLink={() => {
        closeModal();
      }}
      onShareViaKakao={() => {
        closeModal();
      }}
    />
  ));

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: 'top',
    middleware: [offset(8)],
  });

  useOutsideClick([refs.floating], () => setIsOpen(false), 'mousedown');

  const handleSave = () => {
    // [TODO]: 저장하기 기능 구현
    setIsOpen(false);
  };

  const handleShare = () => {
    openModal();
    setIsOpen(false);
  };

  const handleModify = () => {
    router.push(MODIFY_URL);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[55px] text-right shadow-2">
      <Button
        ref={refs.setReference}
        id="menu-button"
        variant="ghost"
        className="inline-flex h-32 w-32 items-center justify-center rounded-circular p-0 data-[open]:bg-[#5050501f]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <EllipsisSVG className="text-cool-neutral-40" />
      </Button>
      <Menu open={isOpen} ref={refs.setFloating} style={floatingStyles}>
        <MenuItem onClick={handleSave}>
          저장하기
          <DownloadSVG />
        </MenuItem>
        <Separator />
        <MenuItem onClick={handleShare}>
          공유하기
          <ShareSVG />
        </MenuItem>
        <Separator />
        <MenuItem onClick={handleModify}>
          수정하기
          <EditSVG />
        </MenuItem>
      </Menu>
    </div>
  );
}
