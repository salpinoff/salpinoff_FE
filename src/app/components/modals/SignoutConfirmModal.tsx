// import toast from 'react-hot-toast';

import { Modal } from '@components/common/Modal';
import BaseText from '@components/common/Text/BaseText';

type SignoutConfirmModalProps = {
  onCancel: () => void;
  onSignout?: () => void;
};

export default function SignoutConfirmModal({
  onCancel,
  onSignout,
}: SignoutConfirmModalProps) {
  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content>
        <Modal.Title align="center" className="py-20" weight="semibold">
          정말 로그아웃 하시겠어요?
        </Modal.Title>
        <div className="flex gap-8">
          <Modal.Button
            variant="secondary"
            onClick={onCancel}
            aria-label="닫기"
          >
            <BaseText variant="label-1" weight="medium">
              취소
            </BaseText>
          </Modal.Button>
          <Modal.Button
            onClick={onSignout}
            aria-label="로그아웃"
            className="bg-red-60"
          >
            <BaseText variant="label-1" weight="semibold">
              로그아웃
            </BaseText>
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
