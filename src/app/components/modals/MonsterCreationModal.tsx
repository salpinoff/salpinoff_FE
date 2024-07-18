import { useRouter } from 'next/navigation';

// import toast from 'react-hot-toast';

import { Modal } from '@components/common/Modal';

type MonsterCreationModalProps = {
  onClose: () => void;
  onCreate?: () => void;
};

export default function MonsterCreationModal({
  onClose,
  onCreate,
}: MonsterCreationModalProps) {
  const router = useRouter();

  const handleCreation = () => {
    router.push('/monster/produce');
    onCreate?.();
  };

  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content>
        <Modal.Title>새로운 퇴사몬을 만들까요?</Modal.Title>
        <Modal.Description>
          완료된 퇴사몬은
          <br />
          설정의 퇴사몬 보관함으로 이동해요
        </Modal.Description>
        <div className="flex gap-8">
          <Modal.Button variant="secondary" onClick={onClose} aria-label="닫기">
            닫기
          </Modal.Button>
          <Modal.Button
            variant="primary"
            onClick={handleCreation}
            aria-label="만들기"
          >
            만들기
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
