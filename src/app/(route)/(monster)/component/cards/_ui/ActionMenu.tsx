'use client';

import { useRouter } from 'next/navigation';

import DownloadSVG from '@public/icons/download.svg';
import EditSVG from '@public/icons/edit.svg';
import ShareSVG from '@public/icons/share.svg';

import { type CharacterCanvasProps } from '@components/CharacterCanvas';
import IconButton from '@components/common/Button/IconButton';
import Separator from '@components/common/data-display/Separator';
import DropdownMenu from '@components/common/navigation/DropdownMenu';
import SaveMonsterImageModal from '@components/modals/SaveMonsterImageModal';
import ShareModal from '@components/modals/ShareModal';

import useModal from '@hooks/useModal';

import generateShareUrl from '@utils/client/generate-share-url';
import cn from '@utils/cn';

type ActionMenuProps = {
  monster: Pick<
    CharacterCanvasProps,
    'type' | 'status' | 'items' | 'background'
  > & {
    monsterId: string;
  };
};
export default function ActionMenu({ monster }: ActionMenuProps) {
  const { monsterId, ...customInfo } = monster;

  const router = useRouter();

  const { openModal, closeModal } = useModal(() => null);

  const handleSave = async () => {
    openModal(() => (
      <SaveMonsterImageModal
        monster={customInfo}
        onClose={() => {
          closeModal();
        }}
        onSave={() => {
          closeModal();
        }}
      />
    ));
  };

  const handleShare = () => {
    openModal(() => (
      <ShareModal
        url={generateShareUrl(monsterId) ?? ''}
        onShareByLink={() => {
          closeModal();
        }}
        onShareViaKakao={() => {
          closeModal();
        }}
      />
    ));
  };

  const handleModify = () => {
    router.push(`/monster/${monsterId}/modify/story`);
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <IconButton
          id="menu-button"
          className={cn(
            'inline-flex h-32 w-32 items-center justify-center rounded-circular p-0 text-cool-neutral-40',
            'data-[open]:bg-[#5050501f]',
          )}
          name="ellipsis"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-max rounded-12 bg-[#212225] p-4 text-cool-neutral-99 shadow-2">
        <DropdownMenu.Item onSelect={handleSave}>
          저장하기
          <DownloadSVG />
        </DropdownMenu.Item>
        <Separator />
        <DropdownMenu.Item onSelect={handleShare}>
          공유하기
          <ShareSVG />
        </DropdownMenu.Item>
        <Separator />
        <DropdownMenu.Item onSelect={handleModify}>
          수정하기
          <EditSVG />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
