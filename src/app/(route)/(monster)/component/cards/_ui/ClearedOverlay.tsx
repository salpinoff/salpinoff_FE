import Button from '@components/common/Button';
import Text from '@components/common/Text';
import MonsterCreationModal from '@components/modals/MonsterCreationModal';

import useModal from '@hooks/useModal';

import cn from '@utils/cn';

export default function ClearedOverlay() {
  const { openModal, closeModal } = useModal(() => (
    <MonsterCreationModal onClose={closeModal} />
  ));

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0',
        'flex flex-col justify-between',
        'h-full w-full px-[16px] py-[12px]',
      )}
    >
      <div className="mx-auto select-none rounded-circular bg-cool-neutral-15 px-[18px] py-[9px]">
        <Text variant="label-2" weight="medium" className="text-[#E1FF28]">
          CLEAR!
        </Text>
      </div>
      <Button
        className="pointer-event-auto label-1-medium mx-auto w-full bg-[#17171985] text-cool-neutral-99"
        size="small"
        variant="secondary"
        onClick={() => openModal()}
      >
        새로운 퇴사몬 만들기
      </Button>
    </div>
  );
}
