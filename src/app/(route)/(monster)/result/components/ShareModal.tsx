import { useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

import { Modal } from '@components/common/Modal';

import useOutsideClick from '@hooks/useOutsideClick';

import copyToClipboard from '../_lib/copyToClipboard';
import generateShareUrl from '../_lib/generateShareUrl';
import isValidURL from '../_lib/isValidURL';

type ShareModalProps = {
  monsterId: string;
  closeModal: () => void;
};

export default function ShareModal({ monsterId, closeModal }: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => closeModal(), 'mousedown');

  const handleCopyLink = useCallback(async () => {
    const shareUrl = generateShareUrl('/share', { monsterId });

    if (shareUrl && isValidURL(shareUrl)) {
      const success = await copyToClipboard(shareUrl);
      toast(success ? '링크를 복사했어요.' : '링크를 복사할 수 없어요.');
      closeModal();
    }
  }, [monsterId, closeModal]);

  const handleShareKakao = () => {
    // console.log('shareKakao');
  };

  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content ref={modalRef}>
        <Modal.Title>나의 퇴사몬을 공유할까요?</Modal.Title>
        <Modal.Description>
          친구에게 나의 퇴사몬과 이야기를 공유하고 답장을 받아보세요
        </Modal.Description>
        <div className="flex gap-8">
          <Modal.Button
            variant="secondary"
            onClick={handleCopyLink}
            aria-label="공유 링크 복사 버튼"
          >
            링크 복사
          </Modal.Button>
          <Modal.Button
            variant="primary"
            onClick={handleShareKakao}
            aria-label="카카오톡 공유 보내기 버튼"
          >
            카카오톡 공유
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
