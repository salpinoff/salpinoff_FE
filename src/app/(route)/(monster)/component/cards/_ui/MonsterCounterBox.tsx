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

const ConfettiMap = {
  mad: {
    image: {
      src: '/images/thunder0000.png',
      width: 75,
      height: 75,
    },
    start: 'center',
    speed: 10,
    particleNumber: 10,
  },
  sad: {
    image: {
      src: '/images/heart_active.webp',
      width: 50,
      height: 50,
    },
    start: 'center',
    speed: 6,
    particleNumber: 10,
  },
} as const;

export default function MonsterCounterBox({
  width = 280,
  height = 280,
  type = 'sad',
  background,
  items,
  startAt,
  endAt,
  clear = false,
  onCount,
  onComplete,
}: MonsterCounterBoxPropps) {
  const canvasRef = useCanvas(width, height);
  const { addConfetti, destroyCanvas } = useConfetti(canvasRef);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleCount = (count: number) => {
    onCount(count);
    addConfetti(ConfettiMap[type]);
  };

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
    <>
      <CounterBox
        startAt={startAt}
        endAt={endAt}
        onCount={handleCount}
        onComplete={onComplete}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <CharacterCanvas
          width={width}
          height={height}
          className="h-full w-full"
          type={type}
          status={clear || isMouseDown ? 'after' : 'before'}
          items={items}
          background={background}
        />
      </CounterBox>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-full select-none"
      />
    </>
  );
}
