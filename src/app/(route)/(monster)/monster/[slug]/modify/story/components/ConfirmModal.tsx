import { Modal } from '@components/common/Modal';

type ConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content className="gap-16">
        <Modal.Title align="left">수정하기를 그만두시겠어요?</Modal.Title>
        <Modal.Description>
          나가기 시 수정된 내용은
          <br />
          저장되지 않습니다.
        </Modal.Description>
        <div className="flex gap-8">
          <Modal.Button
            variant="secondary"
            onClick={onCancel}
            aria-label="계속 수정하기 버튼"
          >
            계속 수정하기
          </Modal.Button>
          <Modal.Button
            variant="primary"
            aria-label="나가기 버튼"
            onClick={onConfirm}
          >
            나가기
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
