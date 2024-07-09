import { useState } from 'react';

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
  background,
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

  return (
    <CounterBox
      startAt={startAt}
      endAt={endAt}
      onCount={(count) => {
        onCount(count);
        addConfetti(ConfettiMap[type]);
      }}
      onComplete={onComplete}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="h-inherit w-inherit pb-[32px]">
        <CharacterCanvas
          background={background}
          className="h-full w-full"
          type={type}
          items={items}
          status={clear || isMouseDown ? 'after' : 'before'}
        />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute left-0 top-0 h-full w-full select-none"
        />
      </div>
    </CounterBox>
  );
}
