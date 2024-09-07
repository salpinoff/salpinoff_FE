import { useRef } from 'react';

import Modal from '@components/common/Modal';

import ShareByLink from '@utils/client/share-by-link';
import ShareViaKakao from '@utils/client/share-via-kakao';
import stringToElement from '@utils/string-to-element';

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
    try {
      const parsedUrl = new URL(url);

      ShareViaKakao(parsedUrl.pathname);
      onShareViaKakao?.();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content ref={modalRef}>
        <Modal.Title>나의 퇴사몬을 공유할까요?</Modal.Title>
        <Modal.Description>
          {stringToElement([
            '친구에게 나의 퇴사몬과 이야기를',
            '공유하고 답장을 받아보세요',
          ])}
        </Modal.Description>
        <div className="flex gap-8">
          <Modal.Button
            id="btn_copy_link"
            variant="secondary"
            onClick={handleShareByLinkButton}
            aria-label="공유 링크 복사 버튼"
          >
            링크 복사
          </Modal.Button>
          <Modal.Button
            id="btn_kakkao_share"
            variant="primary"
            onClick={handleShareViaKakaoButton}
            aria-label="카카오톡 공유 보내기 버튼"
            className="font-semibold"
          >
            카카오톡 공유
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
