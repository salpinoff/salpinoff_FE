import { useState } from 'react';

import { debounce } from 'lodash';

import CharacterCanvas, {
  type CharacterCanvasProps,
} from '@components/CharacterCanvas';
import CounterBox, { type CounterBoxProps } from '@components/CounterBox';

type MonsterCounterBoxPropps = CharacterCanvasProps &
  CounterBoxProps & {
    clear?: boolean;
  };

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
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = debounce(() => !clear && setIsMouseDown(true), 5000, {
    leading: true,
    trailing: false,
  });

  const handleMouseUp = debounce(() => !clear && setIsMouseDown(false), 1000, {
    leading: false,
    trailing: true,
  });

  return (
    <CounterBox
      startAt={startAt}
      endAt={endAt}
      onCount={onCount}
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
  );
}
