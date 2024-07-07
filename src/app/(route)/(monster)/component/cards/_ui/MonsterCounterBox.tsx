import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

import CharacterCanvas, {
  type CharacterCanvasProps,
} from '@components/CharacterCanvas';
import CounterBox, { type CounterBoxProps } from '@components/CounterBox';

import useCanvas from '@hooks/useCanvas';
import useConfetti from '@hooks/useConfetti';

type MonsterCounterBoxPropps = CharacterCanvasProps &
  CounterBoxProps & {
    clear?: boolean;
  };

const HEART_IMAGE_URL = '/images/heart0000.png';
const THUNDER_IMAGE_URL = '/images/thunder0000.png';

const ConfettiMap = {
  mad: {
    image: {
      src: THUNDER_IMAGE_URL,
      width: 75,
      height: 75,
    },
    start: 'center',
    speed: 10,
    particleNumber: 10,
  },
  sad: {
    image: {
      src: HEART_IMAGE_URL,
      width: 50,
      height: 50,
    },
    start: 'center',
    speed: 6,
    particleNumber: 10,
  },
} as const;

export default function MonsterCounterBox({
  type = 'sad',
  items,
  startAt,
  endAt,
  clear = false,
  onCount,
  onComplete,
}: MonsterCounterBoxPropps) {
  const canvasRef = useCanvas(580, 720); // X2
  const { addConfetti, destroyCanvas } = useConfetti(canvasRef);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = debounce(() => !clear && setIsMouseDown(true), 5000, {
    leading: true,
    trailing: false,
  });

  const handleMouseUp = debounce(() => !clear && setIsMouseDown(false), 1000, {
    leading: false,
    trailing: true,
  });

  if (clear) {
    destroyCanvas();
  }

  useEffect(() => {
    if (isMouseDown) {
      addConfetti(ConfettiMap[type]);
    }
  }, [isMouseDown]);

  return (
    <>
      <CounterBox
        startAt={startAt}
        endAt={endAt}
        onCount={onCount}
        onComplete={onComplete}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="h-[240px] w-[240px] pb-[32px]">
          {/* Layer0: 기본 캐릭터 */}
          <CharacterCanvas
            className="h-full w-full"
            type={type}
            status={clear || isMouseDown ? 'after' : 'before'}
          />
          {/* Layer1: 캐릭터 아이템 */}
          <CharacterCanvas
            className="absolute left-0 top-0 h-full w-full"
            items={items}
          />
          {/* Layer2: 이펙트 */}
        </div>
      </CounterBox>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute h-full w-full select-none"
      />
    </>
  );
}
