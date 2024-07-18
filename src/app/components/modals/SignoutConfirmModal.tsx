// import toast from 'react-hot-toast';
import { Modal } from '@components/common/Modal';

import signOut from 'src/app/(route)/(auth)/signin/utils/signout';

type SignoutConfirmModalProps = {
  onCancel: () => void;
  onSignout?: () => void;
  onSignoutFailed?: () => void;
};

export default function SignoutConfirmModal({
  onCancel,
  onSignout,
  onSignoutFailed,
}: SignoutConfirmModalProps) {
  const handleSignout = () => {
    signOut({ callbackUrl: '/signin' })
      .then(() => onSignout?.())
      .catch(() => onSignoutFailed?.());
  };

  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content>
        <Modal.Title align="center" className="py-20">
          정말 로그아웃 하시겠어요?
        </Modal.Title>
        <div className="flex gap-8">
          <Modal.Button
            variant="secondary"
            onClick={onCancel}
            aria-label="닫기"
          >
            취소
          </Modal.Button>
          <Modal.Button
            onClick={handleSignout}
            aria-label="로그아웃"
            className="bg-red-60"
          >
            로그아웃
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
