import { Modal } from '@components/common/Modal';

type ExpiredModalProps = {
  closeModal: () => void;
};

export default function ExpiredModal({ closeModal }: ExpiredModalProps) {
  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content>
        <Modal.Title className="leading-[64px]" align="center">
          이미 완료된 퇴사몬이에요.
        </Modal.Title>
        <Modal.Button
          className="w-full"
          variant="secondary"
          onClick={closeModal}
        >
          닫기
        </Modal.Button>
      </Modal.Content>
    </Modal>
  );
}
