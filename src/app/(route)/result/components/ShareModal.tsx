import { Modal } from '@components/common/Modal';

export default function ShareModal() {
  const handleCopyLink = () => {
    // console.log('handleCopyLink');
  };

  const handleShareKakao = () => {
    // console.log('shareKakao');
  };

  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Title>나의 퇴사몬을 공유할까요?</Modal.Title>
      <Modal.Description>
        친구에게 나의 퇴사몬과 이야기를 공유하고 답장을 받아보세요
      </Modal.Description>
      <Modal.Button variant="secondary" onClick={handleCopyLink}>
        링크 복사
      </Modal.Button>
      <Modal.Button variant="primary" onClick={handleShareKakao}>
        카카오톡 공유
      </Modal.Button>
    </Modal>
  );
}
