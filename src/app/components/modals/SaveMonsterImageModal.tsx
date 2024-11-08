import { useRef } from 'react';

import saveAs from 'file-saver';
import html2canvas from 'html2canvas';

import CharacterCanvas, {
  type CharacterCanvasProps,
} from '@components/CharacterCanvas';
import Modal from '@components/common/Modal';

type SaveMonsterImageModalProps = {
  monster: CharacterCanvasProps;
  onClose: () => void;
  onSave?: () => void;
  onSaveFailed?: (message?: string) => void;
};

export default function SaveMonsterImageModal({
  monster: { type, status, items, background },
  onClose,
  onSave,
  onSaveFailed,
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

      canvas.toBlob(
        async (blob) => {
          if (blob !== null) {
            const file = new File([blob], 'image.png', { type: 'image/png' });
            const files = [file];

            if (!navigator.canShare) {
              saveAs(blob, 'image.png');
              onSave?.();
              return;
            }

            if (navigator.canShare({ files })) {
              try {
                await navigator.share({
                  title: 'Images',
                  files,
                });
                onSave?.();
              } catch (error) {
                if (
                  error instanceof DOMException &&
                  error.name === 'AbortError'
                ) {
                  onSaveFailed?.();
                  return;
                }

                console.error(`The file could not be shared: ${error}`);
                onSaveFailed?.('이미지 저장에 실패했어요.');
              }
            }
          }
        },
        'image/png',
        0.95,
      );
    } catch (error) {
      console.error('Error converting div to image:', error);
      onSaveFailed?.('이미지 변환에 실패했어요.');
    }
  };

  return (
    <Modal open>
      <Modal.Dimmed darken />
      <Modal.Content className="gap-32 py-32">
        <Modal.Title align="center">이미지를 저장할까요?</Modal.Title>
        <div className="aspect-square w-full overflow-hidden rounded-32 shadow-5">
          <div
            ref={targetRef}
            style={{
              background,
            }}
          >
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
