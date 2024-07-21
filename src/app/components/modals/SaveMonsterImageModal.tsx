import { useRef } from 'react';

import saveAs from 'file-saver';
import html2canvas from 'html2canvas';

import CharacterCanvas, {
  type CharacterCanvasProps,
} from '@components/CharacterCanvas';
import Modal from '@components/common/feedback/Modal';

type SaveMonsterImageModalProps = {
  monster: CharacterCanvasProps;
  onClose: () => void;
  onSave?: () => void;
};

export default function SaveMonsterImageModal({
  monster: { type, status, items, background },
  onClose,
  onSave,
}: SaveMonsterImageModalProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!targetRef.current) return;

    try {
      const div = targetRef.current;
      const canvas = await html2canvas(div, {
        allowTaint: true,
        useCORS: true,
        scale: 5,
      });

      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'result.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    } finally {
      onSave?.();
    }
  };

  return (
    <Modal open>
      <Modal.Dimmed />
      <Modal.Content className="gap-32 py-32">
        <Modal.Title align="center">이미지를 저장할까요?</Modal.Title>
        <div className="aspect-square w-full overflow-hidden rounded-32 shadow-5">
          <div ref={targetRef}>
            <CharacterCanvas
              className="relative"
              width={1200}
              height={1200}
              type={type}
              status={status}
              items={items}
              background={background}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <Modal.Button variant="secondary" onClick={onClose} aria-label="닫기">
            닫기
          </Modal.Button>
          <Modal.Button
            variant="primary"
            onClick={handleDownload}
            aria-label="저장"
          >
            저장
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
