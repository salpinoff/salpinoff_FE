import { useRef } from 'react';
// import toast from 'react-hot-toast';

import { Modal } from '@components/common/Modal';

import ShareByLink from '@utils/client/share-by-link';
import ShareViaKakao from '@utils/client/share-via-kakao';

type ShareModalProps = {
  url: string;
  onShareByLink?: () => void;
  onShareViaKakao?: () => void;
};

export default function ShareModal({
  url,
  onShareByLink,
  onShareViaKakao,
}: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleShareByLinkButton = async () => {
    await ShareByLink(url);
    onShareByLink?.();
  };

  const handleShareViaKakaoButton = () => {
    ShareViaKakao(url);
    onShareViaKakao?.();
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
            onClick={handleShareByLinkButton}
            aria-label="공유 링크 복사 버튼"
          >
            링크 복사
          </Modal.Button>
          <Modal.Button
            variant="primary"
            onClick={handleShareViaKakaoButton}
            aria-label="카카오톡 공유 보내기 버튼"
          >
            카카오톡 공유
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
