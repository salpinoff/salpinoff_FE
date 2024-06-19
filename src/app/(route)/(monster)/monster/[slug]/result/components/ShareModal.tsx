import { useRef } from 'react';
// import toast from 'react-hot-toast';

import { Modal } from '@components/common/Modal';

import useOutsideClick from '@hooks/useOutsideClick';

import copyToClipboard from '../lib/copyToClipboard';
import generateShareUrl from '../lib/generateShareUrl';
import isValidURL from '../lib/isValidURL';
import { shareToKakao } from '../lib/shareToKakao';

type ShareModalProps = {
  monsterId: string;
  closeModal: () => void;
};

export default function ShareModal({ monsterId, closeModal }: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const shareUrl = generateShareUrl('/share', { monsterId });

  useOutsideClick(modalRef, () => closeModal(), 'mousedown');

  const handleCopyLink = async () => {
    if (shareUrl && isValidURL(shareUrl)) {
      // const success = await copyToClipboard(shareUrl);
      // toast(success ? '링크를 복사했어요.' : '링크를 복사할 수 없어요.');

      await copyToClipboard(shareUrl);
      closeModal();
    }
  };

  const handleShareKakao = () => {
    if (shareUrl && isValidURL(shareUrl)) {
      shareToKakao(shareUrl);
      closeModal();
    }
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
